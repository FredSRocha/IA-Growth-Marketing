import { CampaignSocial, CampaignContent } from "@prisma/client";

export type CampaignPercentagePerContent = {
  [key in CampaignContent]: number;
};

export interface TotalExpensePerCategory {
  social: CampaignSocial;
  totalAmount: number;
  percentageOfTotal: number;
}
