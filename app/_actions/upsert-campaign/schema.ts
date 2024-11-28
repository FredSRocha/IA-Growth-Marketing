import {
  CampaignSocial,
  CampaignStatus,
  CampaignContent,
} from "@prisma/client";
import { z } from "zod";

export const upsertCampaignSchema = z.object({
  segment: z.string().trim().min(1),
  amount: z.number().positive(),
  content: z.nativeEnum(CampaignContent),
  social: z.nativeEnum(CampaignSocial),
  status: z.nativeEnum(CampaignStatus),
  maxReach: z.date(),
});
