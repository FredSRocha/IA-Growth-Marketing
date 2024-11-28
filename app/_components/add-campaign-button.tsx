"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertCampaignDialog from "./upsert-campaign-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddCampaignButtonProps {
  userCanAddCampaign?: boolean;
}

const AddCampaignButton = ({
  userCanAddCampaign,
}: AddCampaignButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold text-black"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddCampaign}
            >
              Adicionar Campanha
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddCampaign &&
              "Você atingiu o limite de postagens. Atualize seu plano para criar postagens ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertCampaignDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddCampaignButton;
