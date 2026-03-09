import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "8afef8f6-3a40-4dc9-bf3e-7950cfe015ba",
  token: "47503e3644aefa890b624edb5f92b0dd0e780a5a",

  build: {
    outputFolder: "admin",
    publicFolder: ".",
  },

  media: {
    tina: {
      mediaRoot: "assets/uploads",
      publicFolder: ".",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});