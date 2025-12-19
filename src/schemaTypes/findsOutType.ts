import { defineField, defineType } from "sanity";

export const findsOutType = defineType({
  name: "findsOut",
  title: "Finds Out",
  type: "document",
  fields: [
    {
      name: "body",
      type: "array",
      title: "Body",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
        {
          type: "file",
          name: "videoFile",
          title: "Video File",
          options: {
            accept: "video/*",
          },
        },
      ],
    },
    defineField({
      name: "postId",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
