"use server";

import { db } from "@/components/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user?.id || !user.email) throw new Error("Invalid user data");

  // Check if the logged in user exists in the db
  const existingUser = await db.user.findFirst({
    where: {
      id: user.id,
    }
  });

  // If no user, we need to create an entry in our db
  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email,
      }
    });
  }

  return { success: true };
}