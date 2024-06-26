"use server";

import { db } from "@/components/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { Resend } from "resend";
import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: Request) => {
  try {
    const body = await req.text();
    
    // Grab signature from stripe
    // We need this to validate that the webhook is coming from stripe
    const signature = headers().get('stripe-signature');

    if (!signature) return new Response("Invalid Signature", { status: 400 });

    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === 'checkout.session.completed') {
      
      // Check if the user has an email. If not, throw error
      if (!event.data.object.customer_details?.email) throw new Error("Missing user email.");

      const session = event.data.object as Stripe.Checkout.Session;
      
      // Grab userId/orderId from metadata
      const { userId, orderId } = session.metadata || {
        userId: null, 
        orderId: null,
      };

      // If no user meta data, throw error
      if (!userId || !orderId) throw new Error("Invalid request metadata.");

      const billingAddress = session.customer_details!.address;

      const updatedOrder = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            }
          },
          billingAddress: {
            create: {
              name: session.customer_details!.name!,
              city: billingAddress!.city!,
              country: billingAddress!.country!,
              postalCode: billingAddress!.postal_code!,
              street: billingAddress!.line1!,
              state: billingAddress!.state,
            }
          },
        }
      });

      await resend.emails.send({
        from: 'SnapShell <hello@bozinovskidaniel@hotmail.com>',
        to: event.data.object.customer_details.email,
        subject: 'Thanks for your order!',
        react: OrderReceivedEmail({ 
          orderId: orderId, 
          orderDate: updatedOrder.createdAt.toLocaleDateString(), 
          // @ts-ignore
          shippingAddress: {
            name: session.customer_details!.name!,
            city: billingAddress!.city!,
            country: billingAddress!.country!,
            postalCode: billingAddress!.postal_code!,
            street: billingAddress!.line1!,
            state: billingAddress!.state,
          }
        })
      });
    }

    return NextResponse.json({ result: event, ok: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong", ok: false }, { status: 500 });
  }
}