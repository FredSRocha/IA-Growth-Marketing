# Plataforma de Marketing Jurídico com Inteligência Artificial

Este projeto é uma solução prática para advogados que querem melhorar suas campanhas de marketing digital utilizando Inteligência Artificial (IA). A ideia principal é facilitar o planejamento e a execução de estratégias, garantindo que estejam alinhadas com as normas éticas da profissão.

## Demonstração em Vídeo

[![Demonstração da Plataforma](https://img.youtube.com/vi/r21kB0eSkuQ/0.jpg)](https://youtu.be/r21kB0eSkuQ)

Clique na imagem acima para assistir ao vídeo de demonstração no YouTube.

## Funcionalidades Principais

1. **Análise Automática de Campanhas**:
   - Analisa campanhas de tráfego pago realizadas em redes sociais.
   - Identifica padrões de sucesso e pontos de melhoria.

2. **Conformidade Ética**:
   - Totalmente em conformidade com as regras da OAB (Ordem dos Advogados do Brasil).
   - Garante que o marketing respeite as diretrizes da profissão.

3. **Criação de Conteúdo Personalizado**:
   - Gera postagens otimizadas para redes sociais como Twitter (X), Instagram e LinkedIn.
   - Adapta o tom e o estilo para cada plataforma.

4. **Relatórios com Insights**:
   - Fornece um resumo claro sobre o desempenho das campanhas.
   - Inclui sugestões práticas para melhorar resultados futuros.

## Como Funciona

1. **Autenticação do Usuário**:
   - O advogado faz login na plataforma.
   - O sistema verifica se o usuário possui um plano premium ativo.

2. **Coleta de Dados**:
   - A plataforma busca informações sobre campanhas anteriores, incluindo:
     - Datas.
     - Valor investido.
     - Área jurídica abordada.
     - Rede social utilizada.
     - Resultados obtidos.

3. **Análise com Inteligência Artificial**:
   - O sistema envia os dados para a IA, que analisa e gera:
     - Um relatório com insights detalhados.
     - Sugestões para melhorar as próximas campanhas.
     - Postagens prontas para redes sociais.

4. **Entrega de Resultados**:
   - O advogado recebe um relatório completo e postagens prontas para publicação.
   - Pode revisar as sugestões, ajustar estratégias e postar nas redes.

## Tecnologias Utilizadas

- **Node.js**: Backend para gerenciar a lógica do sistema.
- **Prisma**: ORM para interação com o banco de dados.
- **OpenAI**: Para processamento e geração de conteúdo com IA.
- **Clerk**: Gerenciamento de autenticação de usuários.

## Como Começar

### Pré-requisitos

- Ter **Node.js** instalado.
- Uma chave de API da **OpenAI**.
- Configurar um banco de dados com **Prisma**.
- Criar uma conta no **Clerk** para autenticação.

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/FredSRocha/IA-Growth-Marketing.git
   cd IA-Growth-Marketing
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   - Adicione suas chaves e configurações no formato abaixo:
     ```plaintext
      DATABASE_URL=<NEON_POSTGRESQL>
      CLERK_SECRET_KEY=
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
      NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL=
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
      OPENAI_API_KEY=
      STRIPE_PREMIUM_PLAN_PRICE_ID=
      STRIPE_SECRET_KEY=
      STRIPE_WEBHOOK_SECRET=
     ```

4. Execute as migrações do banco de dados:

   ```bash
   npx prisma migrate deploy
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

## Exemplo de Uso

### Geração de Relatórios

- Analisa campanhas anteriores e aponta:
  - Resultados obtidos.
  - Áreas de maior impacto.
  - O que pode ser ajustado.

- Gera postagens específicas para redes sociais:
  - Twitter (X)
  - Instagram
  - LinkedIn 

## Licença

Este projeto está licenciado sob a **Licença MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

*Prompt desenvolvido por Frederico Stefano Rocha seguindo todas as orientações abordadas pelos ilustres professores Felipe Pacheco e Isaac D’Césares no curso de Pós-Graduação em Inteligência Artificial Aplicada a Growth Marketing do Centro Universitário União das Américas Descomplica - UNIAMÉRICA.*

*Projeto totalmente adaptado do evento "Full Stack Week" do professor Felipe Rocha, onde um SaaS financeiro foi totalmente desenvolvido. O código-fonte do projeto original encontra-se em: https://github.com/felipemotarocha/fullstackweek-financeai (vale a pena conferir 😉) Como participei do evento gratuito adaptando o que foi ensinado em tempo real, muita coisa aqui pode melhorar.*

**⚠️ Projeto que desenvolvi e apresentei como requisito avaliativo do Módulo 3 no curso de pós-graduação da Descomplica Faculdade Digital como requisito para obtenção do título de Pós-Graduacao em Inteligência Artificial Aplicada a Growth Marketing.**
