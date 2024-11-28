"use server";
import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { isMatch } from "date-fns";
import OpenAI from "openai";

export const generateAiReport = async (month: string, monthx: string) => {
  if (!isMatch(month, "MM")) {
    throw new Error("Invalid month");
  }
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const userHasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";
  if (!userHasPremiumPlan) {
    throw new Error("User has no premium plan");
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const campaigns = await db.campaign.findMany({
    where: {
      maxReach: {
        gte: new Date(`2000-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  });
  
  const content = `Gere um relatório com insights conclusivos da análise de todas as campanhas de tráfego pago que realizei, incluindo sugestões para otimizar futuras campanhas e aumentar a visibilidade do escritório analisando os indicativos de sucesso nas campanhas anteriores. As campanhas estão formatadas com os seguintes dados: {DATA-ALCANCE-MÁXIMO}-{INVESTIMENTO}-{ÁREA DO DIREITO}-{CONTEÚDO}-{REDESOCIAL}-{SITUAÇÃO}. Detalhes:
        ${campaigns
          .map(
            (campaign) =>
              `${campaign.maxReach.toLocaleDateString("pt-BR")}-R$${campaign.amount}-${campaign.segment}-${campaign.content}-${campaign.social}-${campaign.status}.
              Faça as seguintes substituições quando encontrar essas variáveis no texto:
    LINKEDIN: 'LinkedIn', INSTAGRAM: 'Instagram', X: 'X (Twitter)', YOUTUBE: 'YouTube', JUSBRASIL: 'JusBrasil', TIKTOK: 'TikTok', OTHER: 'Outra', INFORMATIVE: 'Informativo', EDUCATIONAL: 'Educacional', PROMOTIONAL: 'Promocional', TESTIMONIAL: 'Caso de Sucesso', INTERACTIVE: 'Interativo'.
    No final, crie uma postagem específica para [${monthx}] abaixo de um título em destaque com o nome "Postagem do Dia:".

    **IMPORTANTE**:
    - Para **Twitter** (X), a postagem deve ter no máximo **280 caracteres**.
    - Para **Instagram**, a postagem deve ser mais longa, com o **máximo de 2200 caracteres**. Use múltiplas hashtags relacionadas ao tema.
    - Para **LinkedIn**, a postagem deve ser **profissional e educativa**, com até **3000 caracteres**.

    **Postagem para Redes Sociais**: 
    - A postagem deve ser adaptada ao estilo da plataforma.
    - Use **hashtags** relacionadas ao tema.
    - Seja **direto e objetivo** ou forneça **contexto e informações detalhadas** dependendo da rede social.

    **Plataformas**
    - No caso do **Twitter (X)**, a postagem deve ser curta e concisa, com emojis moderados e uma chamada para ação.
    - No caso do **Instagram**, use emojis com moderação e forneça mais contexto sobre o tema.
    - No caso do **LinkedIn**, a postagem deve ser formal, educativa e profissional.

    **Exemplo de postagem para cada plataforma**: 
    Postagem para X (Twitter):
🎯 Entender a diferença entre crimes dolosos e culposos é essencial para melhor compreensão do direito penal. Os crimes dolosos são intencionais, enquanto os culposos ocorrem sem intenção. #DireitoPenal #CrimesDolosos #CrimesCulposos #Advocacia

Postagem para Instagram:
🧐🔍 Você sabe a diferença entre crimes dolosos e culposos? Ser claro sobre essa distinção é crucial dentro do Direito Penal!

🔸 Crimes Dolosos: Ocorrem quando o autor tem a intenção de causar o dano, seja ele físico, moral ou material. Exemplos incluem homicídio doloso e furto com intenção.

🔸 Crimes Culposos: Ocorrem quando há negligência, imprudência ou imperícia, ou seja, o autor não tinha a intenção de causar o resultado, mas o fez de maneira descuidada. Um exemplo clássico é o acidente de trânsito causado por imprudência.

Conhecimento é poder! Para mais detalhes, consulte um especialista em direito. ⚖️

#DireitoPenal #Crimes #Advocacia #Justiça #CrimesDolosos #CrimesCulposos #EducaçãoJurídica

Postagem para LinkedIn:
⚖️ Diferenciação entre Crimes Dolosos e Culposos no Direito Penal 📖

No âmbito do Direito Penal, compreender a diferença entre crimes dolosos e culposos é fundamental tanto para o profissional da área quanto para o público leigo.

Crimes Dolosos: A intenção é um componente-chave. O indivíduo age com a consciência e a vontade de realizar o ato criminoso, sabendo que suas ações poderão causar consequências prejudiciais. Um exemplo clássico é o homicídio doloso, onde a intenção de matar está claramente evidente.

Crimes Culposos: A configuração deste tipo de crime se dá quando o resultado danoso ocorre sem a intenção do agente, geralmente por descuido. Isso inclui situações cotidianas, como acidentes de trânsito causados por imprudência.

Educar o público sobre essas definições é uma forma eficaz de promover a conscientização jurídica.

#DireitoPenal #Criminal #Advocacia #Justiça #EducaçãoJurídica

`,
          )
          .join(";")}`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em marketing digital jurídico com foco em campanhas de tráfego pago para advogados e escritórios de advocacia. Você ajuda a analisar o desempenho das campanhas e a oferecer estratégias de crescimento e conformidade ética segundo as normas da OAB: a) Estatuto da Ordem dos Advogados do Brasil (Lei nº 8.906/1994) - Capítulo IV, Seção III (Publicidade dos atos profissionais); b) Código de Ética e Disciplina da OAB (Resolução nº 02/2015) - Artigos 27 a 38; c) Resolução nº 14/2016 da OAB - Regulamenta a publicidade dos serviços de advocacia; d) Resolução nº 18/2012 da OAB - Dispõe sobre as normas de conduta ética na utilização de meios de comunicação; e) Lei nº 12.965/2014 - Marco Civil da Internet - Estabelece princípios, garantias, direitos e deveres para o uso da internet no Brasil e f) Lei nº 13.709/2018 - Lei Geral de Proteção de Dados (LGPD) - Regula o tratamento de dados pessoais, afetando o uso de dados no marketing jurídico digital.",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  return completion.choices[0].message.content;
};