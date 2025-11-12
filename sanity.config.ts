import schemas from "@/sanity/schemas";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from '@sanity/vision'
const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE!,
  apiVersion: "2025-11-12",
  basePath: "/admin",
  plugins: [structureTool(), visionTool(),],
  schema: { types: schemas },
});

export default config;
