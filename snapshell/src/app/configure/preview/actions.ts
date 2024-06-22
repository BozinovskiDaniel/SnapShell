"use server";

import { db } from "@/components/db";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

/**
 * This is our server-side function for creating a stripe checkout session for
 * a given configuration id.
 * 
 * @param param0 
 * @returns 
 */
export const createCheckoutSession = async ({ configId }: { configId: string }) => {
  // We first begin by fetching the config from the database
  const config = await db.configuration.findUnique({
    where: { id: configId },
  })

  // If not found, throw an error
  if (!config) return new Error("No such configuration found");

  // We need to check that the user is logged in
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // If not, throw an error
  if (!user) throw new Error("You need to be logged in");

  // Now we know there will be a logged in user
  const { finish, material } = config;

  // Calculate the price
  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  // Try to grab an existing order
  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: config.id,
    }
  });

  // If there is an existing order, set it to the order variable
  // Else, create it
  if (existingOrder) order = existingOrder;
  else {
    // Create new order
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: config.id,
      }
    });
  }

  // Create the product in Stripe
  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [config.imgUrl],
    default_price_data: {
      currency: "aud",
      unit_amount: price
    }
  });

  // Create stripe checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`, // Redirection on success
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${config.id}`, // Redirection on cancel
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["AU", "NZ"]
    },
    metadata: { // This is meta data that we attach that stripe will send back to us via webhook
      userId: user.id,
      orderId: order.id
    },
    line_items: [{
      price: product.default_price as string,
      quantity: 1,
    }]
  });

  return { url: stripeSession.url };
}