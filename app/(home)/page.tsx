import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import CampaignsPieChart from "./_components/campaigns-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastCampaigns from "./_components/last-campaigns";
import { canUserAddCampaign } from "../_data/can-user-add-campaign";
import AiReportButton from "./_components/ai-report-button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

interface HomeProps {
  searchParams: {
    month: string;
    monthx: string;
  };
}

const Home = async ({ searchParams: { month, monthx } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  const userCanAddCampaign = await canUserAddCampaign();
  const user = await clerkClient().users.getUser(userId);
  
  return (
    <>
      <Navbar />
      <ScrollArea className="h-full rounded-md border pb-6">
        <div className="flex flex-col space-y-6 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h1 className="text-2xl font-bold text-slate-400 mb-4 sm:mb-0">
              Visão & Impacto
            </h1>
            <div className="flex gap-3">
              <AiReportButton
                month={month}
                hasPremiumPlan={user.publicMetadata.subscriptionPlan === "premium"}
                monthx={monthx}
              />
              <TimeSelect />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6 overflow-hidden">
            <div className="flex flex-col gap-6">
              <SummaryCards
                month={month}
                {...dashboard}
                userCanAddCampaign={userCanAddCampaign}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CampaignsPieChart {...dashboard} />
                <ExpensesPerCategory
                  expensesPerCategory={dashboard.totalExpensePerCategory}
                />
              </div>
            </div>
            <LastCampaigns lastCampaigns={dashboard.lastCampaigns} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default Home;
