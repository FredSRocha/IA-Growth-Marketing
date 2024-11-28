import { Badge } from "@/app/_components/ui/badge";
import { Campaign, CampaignContent } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface CampaignContentBadgeProps {
  campaign: Campaign;
}

const CampaignContentBadge = ({ campaign }: CampaignContentBadgeProps) => {
  if (campaign.content === CampaignContent.INFORMATIVE) {
    return (
      <Badge className="bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Informativa
      </Badge>
    );
  }
  if (campaign.content === CampaignContent.EDUCATIONAL) {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Educacional
      </Badge>
    );
  }
  if (campaign.content === CampaignContent.PROMOTIONAL) {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Promocional
      </Badge>
    );
  }
  if (campaign.content === CampaignContent.TESTIMONIAL) {
    return (
      <Badge className="font bold bg-danger bg-opacity-10 text-danger">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Caso de Sucesso
      </Badge>
    );
  }
  return (
    <Badge className="font bold bg-white bg-opacity-10 text-white">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Interativa
    </Badge>
  );
};

export default CampaignContentBadge;
