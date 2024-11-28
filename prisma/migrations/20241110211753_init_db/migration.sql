-- CreateEnum
CREATE TYPE "CampaignContent" AS ENUM ('INFORMATIVE', 'EDUCATIONAL', 'PROMOTIONAL', 'TESTIMONIAL', 'INTERACTIVE');

-- CreateEnum
CREATE TYPE "CampaignSocial" AS ENUM ('LINKEDIN', 'INSTAGRAM', 'FACEBOOK', 'X', 'YOUTUBE', 'JUSBRASIL', 'TIKTOK', 'OTHER');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('LOW_IMPACT', 'MEETS_EXPECTATIONS', 'HIGH_IMPACT', 'CONNECTION', 'VIRAL', 'BANNED');

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "segment" TEXT NOT NULL,
    "content" "CampaignContent" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "social" "CampaignSocial" NOT NULL,
    "status" "CampaignStatus" NOT NULL,
    "maxReach" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);
