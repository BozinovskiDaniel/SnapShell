"use server"

import { db } from "@/components/db"
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client"

export interface SaveConfigArgs {
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configId: string
}

// RPC -> Remote procedure call
export async function saveConfig({ color, finish, material, model, configId} : SaveConfigArgs) {
  await db.configuration.update({
    where: {
      id: configId
    },
    data: {
      color,
      finish,
      material,
      model
    }
  });
}