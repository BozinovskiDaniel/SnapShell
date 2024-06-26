"use server"

import { db } from "@/components/db"
import { OrderStatus } from "@prisma/client"

export const changeOrderStatus = async ({ id, newStatus }: { id: string, newStatus: OrderStatus}) => {
  // Update the order status
  await db.order.update({
    where: {
      id: id
    },
    data: {
      status: newStatus
    }
  })
}