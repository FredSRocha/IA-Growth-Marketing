import {
  GiftIcon,
  GraduationCapIcon,
  InfoIcon,
  MessageSquareTextIcon,
  StarIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCardsProps {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddCampaign?: boolean;
}

const SummaryCards = ({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  userCanAddCampaign,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD - SALDO */}
      <SummaryCard
        icon={<WalletIcon size={16} className="text-green-500" />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddCampaign={userCanAddCampaign}
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <SummaryCard
          icon={<InfoIcon size={16} className="text-primary" />}
          title="Informativo"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<GraduationCapIcon size={16} className="text-primary" />}
          title="Educacional"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<GiftIcon size={16} className="text-primary" />}
          title="Promocional"
          amount={expensesTotal}
        />
        <SummaryCard
          icon={<StarIcon size={16} className="text-primary" />}
          title="Casos de Sucesso"
          amount={expensesTotal}
        />
        <SummaryCard
          icon={<MessageSquareTextIcon size={16} className="text-primary" />}
          title="Interativo"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
