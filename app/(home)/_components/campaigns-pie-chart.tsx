"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { CampaignContent } from "@prisma/client";
import { CampaignPercentagePerContent } from "@/app/_data/get-dashboard/types";
import { GiftIcon, GraduationCapIcon, InfoIcon, MessageSquareTextIcon, StarIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [CampaignContent.INFORMATIVE]: {
    label: "Informativo",
    color: "#FFFFFF",
  },
  [CampaignContent.EDUCATIONAL]: {
    label: "Educacional",
    color: "#55B02E",
  },
  [CampaignContent.PROMOTIONAL]: {
    label: "Promocional",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface CampaignsPieChartProps {
  contentPercentage: CampaignPercentagePerContent;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const CampaignsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  contentPercentage,
}: CampaignsPieChartProps) => {
  const chartData = [
    {
      type: CampaignContent.INFORMATIVE,
      amount: depositsTotal,
      fill: "#0EA5E9",
    },
    {
      type: CampaignContent.EDUCATIONAL,
      amount: expensesTotal,
      fill: "#14B8A6",
    },
    {
      type: CampaignContent.PROMOTIONAL,
      amount: investmentsTotal,
      fill: "#EF4444",
    },
    {
      type: CampaignContent.TESTIMONIAL,
      amount: depositsTotal,
      fill: "#CCA667",
    },
    {
      type: CampaignContent.INTERACTIVE,
      amount: expensesTotal,
      fill: "#D6D3D1",
    },
  ];

  return (
    <Card>
      <ScrollArea>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="type"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>

          <div className="space-y-3">
            <PercentageItem
              icon={<InfoIcon size={16} />}
              title="Informativo"
              value={contentPercentage[CampaignContent.INFORMATIVE]}
            />
            <PercentageItem
              icon={<GraduationCapIcon size={16} />}
              title="Educacional"
              value={contentPercentage[CampaignContent.EDUCATIONAL]}
            />
            <PercentageItem
              icon={<GiftIcon size={16} />}
              title="Promocional"
              value={contentPercentage[CampaignContent.PROMOTIONAL]}
            />
          <PercentageItem
            icon={<StarIcon size={16} />}
            title="Casos de Sucesso"
            value={contentPercentage[CampaignContent.TESTIMONIAL]}
          />
          <PercentageItem
            icon={<MessageSquareTextIcon size={16} />}
            title="Interativo"
            value={contentPercentage[CampaignContent.INTERACTIVE]}
          />
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default CampaignsPieChart;
