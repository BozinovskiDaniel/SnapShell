import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrimsa: PrismaClient
}

// leverage singleton here by making sure there is only 
// 1 single PrismaClient
let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrimsa) {
    global.cachedPrimsa = new PrismaClient();
  }

  prisma = global.cachedPrimsa;
}

export const db = prisma;