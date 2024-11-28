import { db } from "@/app/_lib/prisma";
import { CampaignContent } from "@prisma/client";
import { TotalExpensePerCategory, CampaignPercentagePerContent } from "./types";
import { auth } from "@clerk/nextjs/server";

export const getDashboard = async (month: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const where = {
    userId,
    maxReach: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };
  const depositsTotal = Number(
    (
      await db.campaign.aggregate({
        where: { ...where, content: "INFORMATIVE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.campaign.aggregate({
        where: { ...where, content: "EDUCATIONAL" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.campaign.aggregate({
        where: { ...where, content: "PROMOTIONAL" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const testimonialTotal = Number(
    (
      await db.campaign.aggregate({
        where: { ...where, content: "TESTIMONIAL" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const interactiveTotal = Number(
    (
      await db.campaign.aggregate({
        where: { ...where, content: "INTERACTIVE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const campaignsTotal = Number(
    (
      await db.campaign.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );
  const contentPercentage: CampaignPercentagePerContent = {
    [CampaignContent.INFORMATIVE]: Math.round(
      (Number(depositsTotal || 0) / Number(campaignsTotal)) * 100,
    ),
    [CampaignContent.EDUCATIONAL]: Math.round(
      (Number(expensesTotal || 0) / Number(campaignsTotal)) * 100,
    ),
    [CampaignContent.PROMOTIONAL]: Math.round(
      (Number(investmentsTotal || 0) / Number(campaignsTotal)) * 100,
    ),
    [CampaignContent.TESTIMONIAL]: Math.round(
      (Number(testimonialTotal || 0) / Number(campaignsTotal)) * 100,
    ),
    [CampaignContent.INTERACTIVE]: Math.round(
      (Number(interactiveTotal || 0) / Number(campaignsTotal)) * 100,
    ),
  };
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.campaign.groupBy({
      by: ["social"],
      where: {
        ...where,
        content: CampaignContent.PROMOTIONAL,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    social: category.social,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));
  const lastCampaigns = await db.campaign.findMany({
    where,
    orderBy: { maxReach: "desc" },
    take: 15,
  });
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    contentPercentage,
    totalExpensePerCategory,
    lastCampaigns: JSON.parse(JSON.stringify(lastCampaigns)),
  };
};
