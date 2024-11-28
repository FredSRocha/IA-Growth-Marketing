"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "Direitos do consumidor em compras online", label: "Direitos do consumidor em compras online" },
  { value: "Imposto de Renda: quem está obrigado a declarar", label: "Imposto de Renda: quem está obrigado a declarar" },
  { value: "Diferença entre crimes dolosos e culposos", label: "Diferença entre crimes dolosos e culposos" },
  /*
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },

  */
];

const ContentSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  // Pega o valor atual do parâmetro "month" e "monthx" da URL
  //const month = searchParams.get("month");
  const monthx = searchParams.get("monthx");

  // Função para atualizar a URL com o parâmetro "monthx" quando o mês é alterado
  const handleMonthChange = (monthx: string) => {
    // Cria a nova URL com o parâmetro monthx, mantendo o parâmetro month
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("monthx", monthx);

    // Se o parâmetro "month" já estiver na URL, ele será mantido; caso contrário, ele será adicionado
    if (monthx) {
      newUrl.searchParams.set("monthx", monthx);
    }

    // Atualiza a URL sem recarregar a página
    push(newUrl.toString());
  };

  return (
    <div className="pt-5">
    <Select
      onValueChange={(value) => handleMonthChange(value)}
      defaultValue={monthx ?? ""}
    >
      <SelectTrigger className="rounded-full font-bold">
        <SelectValue placeholder="Tema Jurídico" />
      </SelectTrigger>
      <SelectContent>
        {MONTH_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    </div>
  );
};

export default ContentSelect;
