import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",

  // Get this from tina.io dashboard after connecting your repo
  clientId: "YOUR_TINA_CLIENT_ID",
  token: "YOUR_TINA_TOKEN",

  build: {
    outputFolder: "admin",
    publicFolder: "./",
  },

  media: {
    tina: {
      mediaRoot: "assets/uploads",
      publicFolder: "./",
    },
  },

  schema: {
    collections: [

      // ── SITE SETTINGS ──
      {
        name: "settings",
        label: "⚙️ Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: "general" },
        fields: [
          { type: "string", name: "site_title", label: "Site Title" },
          { type: "string", name: "tagline", label: "Tagline" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "email", label: "Email" },
          { type: "string", name: "instagram", label: "Instagram Handle" },
          { type: "string", name: "twitter", label: "Twitter Handle" },
          { type: "string", name: "linkedin", label: "LinkedIn URL" },
          { type: "string", name: "whatsapp", label: "WhatsApp Number" },
        ],
      },

      // ── HERO ──
      {
        name: "hero",
        label: "🏠 Hero Section",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: "hero" },
        fields: [
          { type: "string", name: "tag", label: "Tag Line" },
          { type: "string", name: "heading1", label: "Heading Line 1" },
          { type: "string", name: "heading2", label: "Heading Line 2 (Outline Text)" },
          { type: "string", name: "heading3", label: "Heading Line 3" },
          { type: "string", name: "sub", label: "Subheading" },
          { type: "string", name: "cta_primary", label: "Primary Button Text" },
          { type: "string", name: "cta_secondary", label: "Secondary Button Text" },
        ],
      },

      // ── ABOUT ──
      {
        name: "about",
        label: "👤 About Section",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: "about" },
        fields: [
          { type: "string", name: "heading1", label: "Heading Line 1" },
          { type: "string", name: "heading2", label: "Heading Line 2" },
          { type: "string", name: "heading3", label: "Heading Line 3 (Outline)" },
          { type: "string", name: "lead", label: "Lead Paragraph", ui: { component: "textarea" } },
          { type: "string", name: "body", label: "Body Paragraph", ui: { component: "textarea" } },
          {
            type: "object", name: "values", label: "Value Pills", list: true,
            fields: [{ type: "string", name: "value", label: "Value" }],
          },
        ],
      },

      // ── STATS ──
      {
        name: "stats",
        label: "📊 Stats",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: "stats" },
        fields: [
          {
            type: "object", name: "stats", label: "Stats", list: true,
            fields: [
              { type: "number", name: "number", label: "Number" },
              { type: "string", name: "label", label: "Label" },
            ],
          },
        ],
      },

      // ── SEO ──
      {
        name: "seo",
        label: "🔍 SEO Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: "seo" },
        fields: [
          { type: "string", name: "meta_title", label: "Meta Title" },
          { type: "string", name: "meta_description", label: "Meta Description", ui: { component: "textarea" } },
          { type: "string", name: "keywords", label: "Keywords" },
          { type: "image", name: "og_image", label: "OG Image" },
          { type: "string", name: "ga_id", label: "Google Analytics ID" },
        ],
      },

      // ── BLOG ──
      {
        name: "blog",
        label: "📝 Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              const date = new Date().toISOString().split("T")[0];
              return `${date}-${(values?.title || "post").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
            },
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Publish Date" },
          { type: "string", name: "author", label: "Author" },
          {
            type: "string", name: "category", label: "Category",
            options: ["Digital Marketing", "Social Media", "Branding", "Web Design", "SEO", "Agency Tips"],
          },
          { type: "image", name: "cover_image", label: "Cover Image" },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
          { type: "boolean", name: "published", label: "Published" },
          {
            type: "object", name: "seo", label: "SEO",
            fields: [
              { type: "string", name: "title", label: "SEO Title" },
              { type: "string", name: "description", label: "SEO Description", ui: { component: "textarea" } },
              { type: "string", name: "keyword", label: "Focus Keyword" },
            ],
          },
        ],
      },

      // ── PORTFOLIO ──
      {
        name: "work",
        label: "💼 Portfolio",
        path: "content/work",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Project Title", isTitle: true, required: true },
          {
            type: "string", name: "category", label: "Category",
            options: ["Branding", "Social Media", "Website", "Creatives", "Digital Marketing", "Full Package"],
          },
          { type: "string", name: "client", label: "Client Name" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Cover Image" },
          { type: "string", name: "url", label: "Project URL" },
          { type: "number", name: "order", label: "Display Order" },
          { type: "boolean", name: "published", label: "Published" },
        ],
      },

    ],
  },
});
