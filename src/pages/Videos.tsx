import { Card, Text, Container, Grid, Modal } from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import ReactPlayer from "react-player";
import classes from "./Video.module.css";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

function Videos() {
  const [selectVideo, setSelectVideo] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const onClickCard = (videoId: string) => {
    setSelectVideo(videoId);
    open();
  };

  const videoCards = [
    {
      title: "Jay Dyer and David Wood 'ISLAMIC DILEMMA' Refuted!",
      date: "May 16, 2025",
      videoId: "-V7_AA7AN2U",
    },
    {
      title: "Proof Islam is True",
      date: "Jun 1, 2022",
      videoId: "EiolHD-lfHM",
    },
    {
      title: "The Unseen in Islam - Said Nursi's Second Word",
      date: "May 11, 2025",
      videoId: "soiVsZbR0aE",
    },
    {
      title: "Tafsir Surah Ikhlas Part 1",
      date: "Apr 20, 2025",
      videoId: "stNp0DBeygI",
    },
  ];

  return (
    <>
      <Modal opened={opened} onClose={close} centered size={"100%"}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${selectVideo}`}
          width={"100%"}
          height={550}
          controls
        />
      </Modal>
      <Container size={"lg"}>
        <Grid>
          {videoCards.map((card) => {
            const thumbnailUrl = `https://img.youtube.com/vi/${card.videoId}/hqdefault.jpg`;
            return (
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Card
                  p="md"
                  radius="md"
                  component="a"
                  h={"100%"}
                  href="#"
                  className={classes.card}
                  onClick={() => onClickCard(card.videoId)}
                >
                  <img
                    src={thumbnailUrl}
                    alt="YouTube Thumbnail"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <Text className={classes.date}>{card.date}</Text>
                  <Text className={classes.title}>{card.title}</Text>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}

export default PageTransition(Videos);
