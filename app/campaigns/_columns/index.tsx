"use client";

import { Campaign } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CampaignContentBadge from "../_components/type-badge";
import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  CAMPAIGN_SOCIAL_LABELS,
  CAMPAIGN_STATUS_LABELS,
} from "@/app/_constants/campaigns";
import EditCampaignButton from "../_components/edit-campaign-button";

export const campaignColumns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "segment",
    header: "Área Jurídica",
  },
  {
    accessorKey: "content",
    header: "Conteúdo",
    cell: ({ row: { original: campaign } }) => (
      <CampaignContentBadge campaign={campaign} />
    ),
  },
  {
    accessorKey: "social",
    header: "Rede Social",
    cell: ({ row: { original: campaign } }) =>
      CAMPAIGN_SOCIAL_LABELS[campaign.social],
  },
  {
    accessorKey: "status",
    header: "Situação",
    cell: ({ row: { original: campaign } }) =>
      CAMPAIGN_STATUS_LABELS[campaign.status],
  },
  {
    accessorKey: "maxReach",
    header: "Alcance máximo",
    cell: ({ row: { original: campaign } }) =>
      new Date(campaign.maxReach).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Investimento",
    cell: ({ row: { original: campaign } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(campaign.amount)),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: campaign } }) => {
      return (
        <div className="space-x-1">
          <EditCampaignButton campaign={campaign} />
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon />
          </Button>
        </div>
      );
    },
  },
];
