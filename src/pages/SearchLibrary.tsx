import {
  Autocomplete,
  Container,
  Grid,
  Text,
  SegmentedControl,
} from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { sanityClient } from "../client";
import type { Post } from "../types";
import classes from "./SearchLibrary.module.css";
import { useNavigate } from "react-router";
import { removeStopwords } from "stopword";

type SearchMode = "keywords" | "sentence";

function SearchLibrary() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [matchedPosts, setMatchedPosts] = useState<
    { post: Post; sentences: string[] }[]
  >([]);
  const [mode, setMode] = useState<SearchMode>("keywords");
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const normalize = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .trim();

    const fetchPosts = async () => {
      const searchTerm = normalize(debouncedSearch);
      const rawWords = searchTerm.split(/\s+/).filter(Boolean);
      const keywords =
        mode === "keywords" ? removeStopwords(rawWords) : rawWords;

      if (!searchTerm || keywords.length === 0) {
        setMatchedPosts([]);
        return;
      }

      const query = `*[_type == "post"] | order(publishedAt desc)[0...50] {
        _id, title, slug, image, body, tags, publishedAt
      }`;

      try {
        const results: Post[] = await sanityClient.fetch(query);

        const matches = results
          .map((post) => {
            const plainText =
              post.body
                ?.map((block: any) =>
                  block.children?.map((child: any) => child.text).join(" ")
                )
                .join(" ") || "";

            const sentences = plainText.match(/[^\.!\?]+[\.!\?]+/g) || [];

            const matchingSentences = sentences
              .map((sentence) => {
                const normalized = normalize(sentence);
                const fullMatch =
                  mode === "sentence" && normalized.includes(searchTerm);
                const keywordMatches =
                  mode === "keywords"
                    ? keywords.filter((word) => normalized.includes(word))
                    : [];

                const score = fullMatch ? 10 : keywordMatches.length;

                return score > 0 ? { sentence, score } : null;
              })
              .filter(Boolean)
              .sort((a, b) => b!.score - a!.score)
              .map((match) => match!.sentence);

            if (matchingSentences.length > 0) {
              return {
                post,
                sentences: matchingSentences.slice(0, 5),
              };
            }

            return null;
          })
          .filter(Boolean) as { post: Post; sentences: string[] }[];

        setMatchedPosts(matches);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [debouncedSearch, mode]);

  const highlightMatches = (text: string, keywords: string[]) => {
    const pattern = keywords.join("|");
    const regex = new RegExp(`(${pattern})`, "gi");
    return text.replace(
      regex,
      `<span style="color: var(--highlight-color); font-weight: 500;">$1</span>`
    );
  };

  const onClick = (slug: string) => {
    navigate(`/post/${slug}`);
  };

  // Extract words for highlighting
  const searchWords = (() => {
    const normalized = debouncedSearch
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .split(/\s+/)
      .filter(Boolean);

    return mode === "keywords" ? removeStopwords(normalized) : normalized;
  })();

  return (
    <Container>
      <h1>Search</h1>

      <SegmentedControl
        fullWidth
        mt="md"
        mb="md"
        data={[
          { label: "Keywords", value: "keywords" },
          { label: "Full Sentence", value: "sentence" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as SearchMode)}
      />

      <Autocomplete
        onChange={setSearch}
        placeholder="Search articles..."
        leftSection={<IconSearch size={16} stroke={1.5} />}
        value={search}
      />

      <Grid py={24}>
        {debouncedSearch.trim() && matchedPosts.length === 0 ? (
          <Grid.Col span={12}>
            <Text c="dimmed" size="sm" ta="center">
              No results found. Try different keywords.
            </Text>
          </Grid.Col>
        ) : (
          matchedPosts.map(({ post, sentences }) => (
            <Grid.Col
              span={12}
              key={post._id}
              className={classes.search__result}
              onClick={() => onClick(post.slug.current)}
            >
              <Text fw={800}>{post.title}</Text>
              {sentences.map((sentence, idx) => (
                <Text
                  key={idx}
                  c="dimmed"
                  size="sm"
                  mt={4}
                  dangerouslySetInnerHTML={{
                    __html: highlightMatches(sentence, searchWords),
                  }}
                />
              ))}
            </Grid.Col>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default PageTransition(SearchLibrary);
