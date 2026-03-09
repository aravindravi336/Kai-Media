// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: "8afef8f6-3a40-4dc9-bf3e-7950cfe015ba",
  token: "9b3830715db60c5c231e025c77d326da755e1ac2",
  build: {
    outputFolder: "admin",
    publicFolder: "."
  },
  media: {
    tina: {
      mediaRoot: "assets/uploads",
      publicFolder: "."
    }
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
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
