import {
  Blockquote,
  Card,
  Flex,
  Group,
  Popover,
  Skeleton,
  Text,
} from "@mantine/core";
import classes from "./Card.module.css";
import { useEffect, useRef, useState } from "react";
import type { PortableTextDocument } from "../types";
import { badges } from "../utils";
import { toPlainText } from "@portabletext/toolkit";
import Pill from "./Pill";
import { PortableText } from "@portabletext/react";
import Fuse from "fuse.js";

type CardProps = {
  title: string;
  body: PortableTextDocument;
  tags?: string[];
  search?: string;
  onClick?: () => void;
};

export function ArticleCard({ title, body, tags, search, onClick }: CardProps) {
  const plainText = toPlainText(body);
  const keywords = search ? search.split(" ").map((v) => v.toLowerCase()) : [];
  const displaySentences = searchSentencesFuzzy(plainText, search || "");

  return (
    <Card
      withBorder
      padding="lg"
      radius="md"
      className={classes.card}
      onClick={onClick}
    >
      <Text className={classes.title}>{title}</Text>

      <Text component="div" fz="sm" mb="lg" c="dimmed" lineClamp={6}>
        {search ? (
          <div style={{ marginTop: 16 }}>
            {displaySentences.map((sentence, sentenceIdx) => (
              <p key={sentenceIdx}>
                {sentence.split(/\b/).map((part, partIdx) =>
                  keywords.includes(part.toLocaleLowerCase()) ? (
                    <span className={classes.highlight} key={partIdx}>
                      {part}
                    </span>
                  ) : (
                    part
                  )
                )}
              </p>
            ))}
          </div>
        ) : (
          <PortableText
            value={body}
            components={{
              block: {
                normal: ({ children }) => <div>{children}</div>, // or <div>
                h1: ({ children }: any) => (
                  <h1 style={{ fontSize: 16 }}>{children}</h1>
                ),
                h2: ({ children }: any) => (
                  <h2 style={{ fontSize: 14 }}>{children}</h2>
                ),
                h3: ({ children }: any) => (
                  <h3 style={{ fontSize: 12 }}>{children}</h3>
                ),
                h4: ({ children }: any) => (
                  <h4 style={{ fontSize: 10 }}>{children}</h4>
                ),
                blockquote: ({ children }: any) => (
                  <Blockquote style={{ marginTop: 8, padding: 5 }}>
                    {children}
                  </Blockquote>
                ),
              },
              types: {
                carousel: ({ value }: any) => (
                  <img
                    className={classes.card__img}
                    src={value.slides[0].asset.url}
                    alt=""
                  />
                ),
                image: ({ value }: any) => {
                  if (
                    body.length !== 1 &&
                    body.find((b) => b._type === "image")
                  ) {
                    return;
                  }
                  return (
                    <img
                      src={value.asset?.url}
                      alt={value.asset?.alt || "Image"}
                      style={{
                        marginTop: 16,
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                    />
                  );
                },
              },
            }}
          />
        )}
      </Text>

      <Card.Section className={classes.footer} style={{ marginTop: "auto" }}>
        <Group gap={4}>
          <CardPills pills={badges.filter((b) => tags?.includes(b.value))} />
        </Group>
      </Card.Section>
    </Card>
  );
}

type CardPillsProps = {
  pills: { title: string; value: string }[];
};

export function CardPills({ pills }: CardPillsProps) {
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const moreRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(pills.length);
  const [popoverOpened, setPopoverOpened] = useState(false);
  const MAX_WIDTH = 200;

  useEffect(() => {
    let total = 0;
    let count = 0;
    const moreWidth = moreRef.current?.offsetWidth || 0;

    for (let i = 0; i < pills.length; i++) {
      const el = pillRefs.current[i];
      if (!el) continue;

      const width = el.offsetWidth;
      const isLastVisible = count === pills.length - 1;
      const willOverflow =
        total + width + (isLastVisible ? 0 : moreWidth) > MAX_WIDTH;

      if (willOverflow) break;

      total += width;
      count++;
    }

    setVisibleCount(count);
  }, [pills]);

  const hiddenPills = pills.slice(visibleCount);
  const hiddenCount = hiddenPills.length;

  return (
    <Flex gap={2} w={MAX_WIDTH}>
      {pills.slice(0, visibleCount).map((pill, index) => (
        <div
          key={pill.title}
          ref={(el) => {
            pillRefs.current[index] = el;
          }}
        >
          <Pill size="xs">{pill.title}</Pill>
        </div>
      ))}

      {hiddenCount > 0 && (
        <Popover
          width="auto"
          position="bottom-start"
          withArrow
          shadow="md"
          opened={popoverOpened}
          onChange={setPopoverOpened}
        >
          <Popover.Target>
            <div
              ref={moreRef}
              onMouseEnter={() => setPopoverOpened(true)}
              onMouseLeave={() => setPopoverOpened(false)}
            >
              <Pill size="xs">+{hiddenCount} more</Pill>
            </div>
          </Popover.Target>
          <Popover.Dropdown onMouseLeave={() => setPopoverOpened(false)}>
            <div className="flex flex-col">
              {hiddenPills.map((pill) => (
                <Pill size="xs" key={pill.title}>
                  {pill.title}
                </Pill>
              ))}
            </div>
          </Popover.Dropdown>
        </Popover>
      )}
    </Flex>
  );
}

const searchSentencesFuzzy = (text: string, query: string) => {
  const sentences = text
    .trim()
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

  const fuse = new Fuse(
    sentences.map((s, i) => ({ id: i, text: s })),
    {
      keys: ["text"],
      includeScore: true,
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 2,
    }
  );

  return fuse.search(query).map((r) => r.item.text);
};

export const ArticleCardPlaceHolder = () => {
  return (
    <>
      <Skeleton width={"100%"} height={260} />
    </>
  );
};
