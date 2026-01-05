import {
  Container,
  Text,
  Button,
  Group,
  List,
  ThemeIcon,
  Title,
  Image,
  Divider,
  Flex,
  Skeleton,
} from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import classes from "./Home.module.css";
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../client";
import type { Post } from "../types";
import { Link } from "react-router";
import Bismillah from "../assets/Bismillah_Calligraphy.svg";
import { MultiplePlaceHolder } from "../components/MultiplePlaceHolder";
import {
  IconAtom,
  IconCross,
  IconHazeMoon,
  IconBuildingMosque,
} from "@tabler/icons-react";
import image from "/trueislamlibrary-1200x600.png";

const categories = [
  { title: "Islam", value: "islam" },
  // { title: "Atheist", value: "atheist" },
  { title: "Christians", value: "christian" },
  { title: "Aqeedah", value: "aqeedah" },
  { title: '"Salafi" / Wahabi', value: "wahabi" },
  { title: "Quranist", value: "quranist" },
  { title: "Shias", value: "shia" },
];

const fetchCategoryPosts = async () => {
  const query = `*[_type == "post" && defined(category)]{
    _id,
    title,
    slug,
    category,
    categoryWeight
  }`;

  const posts = await sanityClient.fetch(query);
  return posts;
};

function Home() {
  const { isLoading, data } = useQuery<Post[]>({
    queryKey: ["categoryPosts"],
    queryFn: fetchCategoryPosts,
  });

  return (
    <>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>True Islam Library </Title>
            <Text c="dimmed" mt="md">
              Welcome to this library of articles, research, books, and sources
              dedicated to presenting authentic
              <span className={classes.highlight}>
                Sunni Islam according to Ahl al-Sunnah wa al-Jamāʿah.
              </span>
              <br />
              This collection preserves the correct creed and methodology of
              Islam while providing clear, evidence-based refutations of deviant
              sects and responses to Christianity, atheism, and Judaism through
              sound scholarship.
            </Text>

            <List mt={30} spacing="sm" size="sm">
              <List.Item
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconAtom size={12} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <b>I am an Atheist</b>
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCross size={12} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <b>I am a Christian</b>
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconHazeMoon size={12} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <b>
                  I am a Salafi or follow the teachings of Muhammad Ibn Abdul
                  Wahhab
                </b>
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconBuildingMosque size={12} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <b>I am a follower of Ali رحمة الله عليه </b>
              </List.Item>
            </List>

            {/* <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Source code
            </Button>
          </Group> */}
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
      <Container className={classes.container} size={"sm"} pb={"xl"}>
        <Flex align={"center"} direction={"column"}>
          <h1>True Islam Library</h1>
          <img height={48} src={Bismillah} />
        </Flex>
        <Container size={"sm"}>
          {categories.map((category) => (
            <div key={category.value}>
              <h2>{category.title}</h2>
              <Flex direction={"column"} gap={12}>
                {isLoading && (
                  <MultiplePlaceHolder
                    amount={6}
                    placeHolder={<Skeleton height={32} />}
                  />
                )}
                {data
                  ?.filter((post) => post.category === category.value)
                  .sort(
                    (a, b) =>
                      //Infinity here because categoryWeight can be undefined
                      (a.categoryWeight || Infinity) -
                      (b.categoryWeight || Infinity)
                  )
                  .map((post) => (
                    <Link
                      className={classes.link}
                      to={`/post/${post.slug.current}`}
                    >
                      <Text>{post.title}</Text>
                      <Divider mt={16} />
                    </Link>
                  ))}
              </Flex>
            </div>
          ))}
        </Container>
      </Container>
    </>
  );
}

export default PageTransition(Home);
