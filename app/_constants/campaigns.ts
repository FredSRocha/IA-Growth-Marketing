import {
  CampaignSocial,
  CampaignStatus,
  CampaignContent,
} from "@prisma/client";

export const CAMPAIGN_STATUS_ICONS = {
  [CampaignStatus.LOW_IMPACT]: "arrow-big-down-dash.svg",
  [CampaignStatus.MEETS_EXPECTATIONS]: "list-checks.svg",
  [CampaignStatus.HIGH_IMPACT]: "star.svg",
  [CampaignStatus.CONNECTION]: "heart.svg",
  [CampaignStatus.VIRAL]: "trophy.svg",
  [CampaignStatus.BANNED]: "ban.svg",
};

export const CAMPAIGN_SOCIAL_LABELS = {
  LINKEDIN: "LindedIn",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  X: "X (Twitter)",
  YOUTUBE: "YouTube",
  JUSBRASIL: "JusBrasil",
  TIKTOK: "TikTok",
  OTHER: "Outra",
};

export const CAMPAIGN_STATUS_LABELS = {
  LOW_IMPACT: "Baixo impacto",
  MEETS_EXPECTATIONS: "Atingiu as metas",
  HIGH_IMPACT: "Alta visibilidade",
  CONNECTION: "Conexão emocional",
  VIRAL: "Engajamento viral",
  BANNED: "Denunciada ou Banida",
};

export const CAMPAIGN_CONTENT_OPTIONS = [
  {
    value: CampaignContent.INFORMATIVE,
    label: "Informativo",
  },
  {
    value: CampaignContent.EDUCATIONAL,
    label: "Educacional",
  },
  {
    value: CampaignContent.PROMOTIONAL,
    label: "Promocional",
  },
  {
    value: CampaignContent.TESTIMONIAL,
    label: "Caso de Sucesso",
  },
  {
    value: CampaignContent.INTERACTIVE,
    label: "Interativo",
  },
];

export const CAMPAIGN_STATUS_OPTIONS = [
  {
    value: CampaignStatus.LOW_IMPACT,
    label:
      CAMPAIGN_STATUS_LABELS[CampaignStatus.LOW_IMPACT],
  },
  {
    value: CampaignStatus.MEETS_EXPECTATIONS,
    label:
      CAMPAIGN_STATUS_LABELS[CampaignStatus.MEETS_EXPECTATIONS],
  },
  {
    value: CampaignStatus.HIGH_IMPACT,
    label: CAMPAIGN_STATUS_LABELS[CampaignStatus.HIGH_IMPACT],
  },
  {
    value: CampaignStatus.CONNECTION,
    label:
      CAMPAIGN_STATUS_LABELS[CampaignStatus.CONNECTION],
  },
  {
    value: CampaignStatus.VIRAL,
    label:
      CAMPAIGN_STATUS_LABELS[CampaignStatus.VIRAL],
  },
  {
    value: CampaignStatus.BANNED,
    label: CAMPAIGN_STATUS_LABELS[CampaignStatus.BANNED],
  },
];

export const CAMPAIGN_SOCIAL_OPTIONS = [
  {
    value: CampaignSocial.LINKEDIN,
    label: CAMPAIGN_SOCIAL_LABELS[CampaignSocial.LINKEDIN],
  },
  {
    value: CampaignSocial.INSTAGRAM,
    label: CAMPAIGN_SOCIAL_LABELS[CampaignSocial.INSTAGRAM],
  },
  {
    value: CampaignSocial.FACEBOOK,
    label: CAMPAIGN_SOCIAL_LABELS[CampaignSocial.FACEBOOK],
  },
  {
    value: CampaignSocial.X,
    label: CAMPAIGN_SOCIAL_LABELS[CampaignSocial.X],
  },
  {
    value: CampaignSocial.YOUTUBE,
    label: CAMPAIGN_SOCIAL_LABELS[CampaignSocial.YOUTUBE],
  },
  {
    value: CampaignSocial.JUSBRASIL,
    label: CAMPAIGN_SOCIAL_LABELS[CampaignSocial.JUSBRASIL],
  },
  {
    value: CampaignSocial.TIKTOK,
    label: CAMPAIGN_SOCIAL_LABELS[CampaignSocial.TIKTOK],
  },
  {
    value: CampaignSocial.OTHER,
    label: CAMPAIGN_SOCIAL_LABELS[CampaignSocial.OTHER],
  },
];
