import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, ScaleIcon, StarIcon, XIcon } from "lucide-react";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { Badge } from "../_components/ui/badge";
import { getCurrentMonthCampaigns } from "../_data/get-current-month-campaigns";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const user = await clerkClient().users.getUser(userId);
  const currentMonthCampaigns = await getCurrentMonthCampaigns();
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan == "premium";
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-6 p-6">
          <h1 className="text-2xl font-bold text-slate-400">Assinatura</h1>

          <div className="flex gap-6">
            <Card className="w-[450px]">
              <CardHeader className="relative border-b border-solid py-8">
                {!hasPremiumPlan && (
                    <Badge className="absolute left-4 top-12 bg-green-500/10 text-green-500  hover:bg-green-500/10 cc">
                      <ScaleIcon className="mr-2 h-4 w-4 text-green-500" /> 
                      Ativo
                    </Badge>
                  )}
                <h2 className="text-center text-2xl font-semibold">
                  Plano Básico
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="text-6xl font-semibold">0</span>
                  <div className="text-2xl text-muted-foreground">/mês</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 py-8">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>
                    10 posts/mês ({currentMonthCampaigns}/10)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>Suporte por email (72 horas)</p>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon />
                  <p>Criação de posts virais com IA</p>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon />
                  <p>Conformidade com as normas da OAB</p>
                </div>
                <div className="flex items-center gap-2">
                  <XIcon />
                  <p>Personalização de postagens</p>
                </div>
              </CardContent>
            </Card>

            <Card className="w-[450px]">
              <CardHeader className="relative border-b border-solid py-8">
                {hasPremiumPlan && (
                  <Badge className="absolute left-4 top-12 bg-primary/10 text-primary flex items-center">
                    <StarIcon className="mr-2 h-4 w-4 text-primary" /> 
                    Ativo
                  </Badge>
                )}
                <h2 className="text-center text-2xl font-semibold">
                  Plano <span className="text-primary">Premium</span>
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="text-6xl font-semibold">19,90</span>
                  <div className="text-2xl text-muted-foreground">/mês</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 py-8">
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>Posts ilimitadas</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>Criação de posts virais com IA</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>Conformidade com as normas da OAB</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="text-primary" />
                  <p>Suporte pelo WhatsApp (IMEDIATO)</p>
                </div>
                <AcquirePlanButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
