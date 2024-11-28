import AddCampaignButton from "@/app/_components/add-campaign-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddCampaign?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  userCanAddCampaign,
}: SummaryCardProps) => {
  return (
    <Card className="p-4">
      <CardHeader className="flex items-center md:items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          {icon}
          <p className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}>
            {title}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <p className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl text-center md:text-left"}`}>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>
        </div>

        {size === "large" && userCanAddCampaign && (
          <div className="flex justify-center md:justify-end">
            <AddCampaignButton userCanAddCampaign={userCanAddCampaign} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
