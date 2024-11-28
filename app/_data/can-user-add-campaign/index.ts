import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthCampaigns } from "../get-current-month-campaigns";

export const canUserAddCampaign = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }
  const currentMonthCampaigns = await getCurrentMonthCampaigns();
  if (currentMonthCampaigns >= 10) {
    return false;
  }
  return true;
};
