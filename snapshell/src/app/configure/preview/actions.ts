"use server";

import { db } from "@/components/db";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({ configId }: { configId: string }) => {
  const config = await db.configuration.findUnique({
    where: { id: configId },
  })

  if (!config) return new Error("No such configuration found");

  // We need to know the logged in user
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("You need to be logged in");

  // Now we know there will be a logged in user
  const { finish, material } = config;

  // Calculate the price
  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  console.log(user.id)

  // Try to grab an existing order
  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: config.id,
    }
  });

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
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${config.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["AU", "NZ"]
    },
    metadata: {
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