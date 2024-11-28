import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { campaignColumns } from "./_columns";
import AddCampaignButton from "../_components/add-campaign-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddCampaign } from "../_data/can-user-add-campaign";

const CampaignsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const campaigns = await db.campaign.findMany({
    where: {
      userId,
    },
  });
  const userCanAddCampaign = await canUserAddCampaign();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-400">Resultados Estratégicos</h1>
          <AddCampaignButton userCanAddCampaign={userCanAddCampaign} />
        </div>
        <ScrollArea className="h-full">
          <DataTable
            columns={campaignColumns}
            data={JSON.parse(JSON.stringify(campaigns))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default CampaignsPage;
