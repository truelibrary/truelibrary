import { defineField, defineType, defineArrayMember } from "sanity";

import { PlayIcon } from "@sanity/icons";
import { YouTubePreview } from "./components/youtubePreview";

export const tiktok = defineType({
  name: "tiktok",
  type: "object",
  title: "TikTok Embed",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "TikTok Video URL",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"], allowRelative: false }).required(),
    }),
  ],
  preview: {
    select: { title: "url" },
  },
});

export const youtube = defineType({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube video URL",
    }),
  ],
  preview: {
    select: { title: "url" },
  },
  components: {
    preview: YouTubePreview,
  },
});

export const imageSlide = defineType({
  name: "carousel",
  type: "object",
  title: "Carousel",
  fields: [
    {
      name: "slides",
      type: "array",
      title: "Slides",
      of: [{ type: "image" }],
    },
  ],
  preview: {
    select: {
      slides: "slides",
    },
    prepare({ slides }) {
      const firstImage = slides?.[0];
      return {
        title: `Carousel with ${slides?.length || 0} slides`,
        media: firstImage,
      };
    },
  },
});

export const fileAttachment = defineType({
  name: "fileAttachment",
  type: "object",
  title: "File Attachment",
  fields: [
    {
      name: "file",
      type: "file",
      title: "File",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      type: "string",
      title: "Description",
    },
  ],
  preview: {
    select: {
      title: "description",
      media: "file",
    },
  },
});

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          { title: "8thmane", value: "8thmane" },
          { title: "Adab", value: "adab" },
          { title: "Aisha RA", value: "aishara" },
          { title: "Aqeeda", value: "aqeeda" },
          { title: "Atheism", value: "atheism" },
          { title: "Christianity", value: "christianity" },
          { title: "Debate", value: "debate" },
          { title: "Defense", value: "defense" },
          { title: "Islam", value: "islam" },
          { title: "Islambackup", value: "islambackup" },
          { title: "Library", value: "library" },
          { title: "Marriage", value: "marriage" },
          { title: "Narrations", value: "narrations" },
          { title: "New to Islam", value: "new to islam" },
          { title: "Proofs", value: "proofs" },
          { title: "Prophet Muhammad ﷺ", value: "rasulallah" },
          { title: "Quran", value: "quran" },
          { title: "Salafi", value: "salafi" },
          { title: "Scholars", value: "scholars" },
          { title: "Slavery", value: "slavery" },
          { title: "Refutation", value: "refutation" },
          { title: "Takfir", value: "takfir" },
          { title: "Tafwid al-Ma'na", value: "tafwidalmana" },
          { title: "Taymiyya", value: "taymiyya" },
          { title: "Tawassul", value: "tawassul" },
          { title: "Taweel", value: "taweel" },
          { title: "Tazkia", value: "tazkia" },
        ],
      },
    }),
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      title: "Category",
      description:
        "Posts to go to front page of table of contents (assign this so that it appears on the table of contents)",
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Islam", value: "islam" },
          { title: "Aqeedah", value: "aqeedah" },
          { title: "Atheist", value: "atheist" },
          { title: "Christians", value: "christian" },
          { title: "Wahabi", value: "wahabi" },
          { title: "Quranist", value: "quranist" },
          { title: "Shias", value: "shia" },
        ],
      },
    }),
    defineField({
      title: "Category Weight",
      description:
        "Assign weight to the post. So if you press 1, it is more likely to be at the top of the category in the table of contents",
      name: "categoryWeight",
      type: "number",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
        defineArrayMember({
          type: "youtube",
        }),
        defineArrayMember({ type: "tiktok" }),
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
          ],
        },
        defineArrayMember({
          type: "object",
          name: "authorBlock",
          title: "Author",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Author Name",
            },
          ],
        }),
        defineArrayMember({ type: "fileAttachment" }),
        defineArrayMember({ type: "carousel" }),
      ],
    }),
  ],
});
