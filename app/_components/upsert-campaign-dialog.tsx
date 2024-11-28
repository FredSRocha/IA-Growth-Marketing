import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  CAMPAIGN_SOCIAL_OPTIONS,
  CAMPAIGN_STATUS_OPTIONS,
  CAMPAIGN_CONTENT_OPTIONS,
} from "../_constants/campaigns";
import { DatePicker } from "./ui/date-picker";
import { z } from "zod";
import {
  CampaignSocial,
  CampaignStatus,
  CampaignContent,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertCampaign } from "../_actions/upsert-campaign";

interface UpsertCampaignDialogProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  campaignId?: string;
  setIsOpen: (isOpen: boolean) => void;
}

const formSchema = z.object({
  segment: z.string().trim().min(1, {
    message: "A área do Direito é obrigatória.",
  }),
  amount: z
    .number({
      required_error: "O valor é obrigatório.",
    })
    .positive({
      message: "O valor deve ser positivo.",
    }),
  content: z.nativeEnum(CampaignContent, {
    required_error: "O contéudo (informação estratégica) é obrigatório.",
  }),
  social: z.nativeEnum(CampaignSocial, {
    required_error: "A rede social é obrigatória.",
  }),
  status: z.nativeEnum(CampaignStatus, {
    required_error: "A situação é obrigatório.",
  }),
  maxReach: z.date({
    required_error: "A data é obrigatória.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

const UpsertCampaignDialog = ({
  isOpen,
  defaultValues,
  campaignId,
  setIsOpen,
}: UpsertCampaignDialogProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 50,
      social: CampaignSocial.LINKEDIN,
      maxReach: new Date(),
      segment: "",
      status: CampaignStatus.LOW_IMPACT,
      content: CampaignContent.EDUCATIONAL,
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertCampaign({ ...data, id: campaignId });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const isUpdate = Boolean(campaignId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate ? "Atualizar" : "Criar"} Campanha
          </DialogTitle>
          <DialogDescription>Insira todas as informações abaixo:</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="segment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área do Direito</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: Direito Trabalhista..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Tráfego</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Valor total da campanha..."
                      value={field.value}
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tom do Post</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um e-mail verificado para exibir" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CAMPAIGN_CONTENT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="social"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redes Sociais</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CAMPAIGN_SOCIAL_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resultado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CAMPAIGN_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxReach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia do máximo alcance</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">
                <span className="text-black">
                  {isUpdate ? "Atualizar" : "Adicionar"}
                </span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertCampaignDialog;
