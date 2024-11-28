"use client";

import { Button } from "@/app/_components/ui/button";
import UpsertCampaignDialog from "@/app/_components/upsert-campaign-dialog";
import { Campaign } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface EditCampaignButtonProps {
  campaign: Campaign;
}

const EditCampaignButton = ({ campaign }: EditCampaignButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertCampaignDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...campaign,
          amount: Number(campaign.amount),
        }}
        campaignId={campaign.id}
      />
    </>
  );
};

export default EditCampaignButton;
