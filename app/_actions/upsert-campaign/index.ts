"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  CampaignSocial,
  CampaignStatus,
  CampaignContent,
} from "@prisma/client";
import { upsertCampaignSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertCampaignParams {
  id?: string;
  segment: string;
  amount: number;
  content: CampaignContent;
  social: CampaignSocial;
  status: CampaignStatus;
  maxReach: Date;
}

export const upsertCampaign = async (params: UpsertCampaignParams) => {
  upsertCampaignSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.campaign.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/campaigns");
};
