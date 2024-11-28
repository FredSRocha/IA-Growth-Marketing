import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { CAMPAIGN_STATUS_ICONS } from "@/app/_constants/campaigns";
import { formatCurrency } from "@/app/_utils/currency";
import { Campaign, CampaignContent } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LastCampaignsProps {
  lastCampaigns: Campaign[];
}

const LastCampaigns = ({ lastCampaigns }: LastCampaignsProps) => {
  const getAmountColor = (campaign: Campaign) => {
    if (campaign.content === CampaignContent.INFORMATIVE) {
      return "text-sky-500";
    }
    if (campaign.content === CampaignContent.EDUCATIONAL) {
      return "text-teal-500";
    }
    if (campaign.content === CampaignContent.PROMOTIONAL) {
      return "text-red-500";
    }
    if (campaign.content === CampaignContent.TESTIMONIAL) {
      return "text-primary";
    }
    if (campaign.content === CampaignContent.INTERACTIVE) {
      return "text-stone-300";
    }
    return "text-white";
  };
  const getAmountPrefix = (campaign: Campaign) => {
    if (campaign.content === CampaignContent.INFORMATIVE) {
      return "+";
    }
    return "-";
  };
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold text-amber-100">Campanhas Recentes</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/campaigns" className="flex items-center">
          Ver mais <ArrowRightIcon className="ml-2" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/${CAMPAIGN_STATUS_ICONS[campaign.status]}`}
                  height={20}
                  width={20}
                  alt="PIX"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{campaign.segment}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(campaign.maxReach).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(campaign)}`}>
              {getAmountPrefix(campaign)}
              {formatCurrency(Number(campaign.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastCampaigns;
