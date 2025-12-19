import { Stack, Title, Text, Container, Center, Grid } from "@mantine/core";
import {
  IconBrandDiscordFilled,
  IconBrandTiktokFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import classes from "./JoinUs.module.css";
import { Link } from "react-router";
import PageTransition from "../animations/PageTransition";

function JoinUs() {
  return (
    <Container size="md" py="xl">
      <Center w="100%" pb={240}>
        <Stack align="center">
          <Title order={1} size="3rem">
            Join 🚀
          </Title>
          <Grid>
            <Grid.Col span={4}>
              <Stack
                className={classes.icon__card}
                justify="center"
                align="center"
                p={24}
              >
                <Link
                  className={classes.link}
                  to={import.meta.env.VITE_DISCORD}
                  target="_target"
                >
                  <IconBrandDiscordFilled size={64} />
                  <Text fw={500}>Discord</Text>
                </Link>
              </Stack>
            </Grid.Col>
            <Grid.Col span={4}>
              <Link
                className={classes.link}
                to={import.meta.env.VITE_YOUTUBE}
                target="_target"
              >
                <Stack
                  className={classes.icon__card}
                  justify="center"
                  align="center"
                  p={24}
                >
                  <IconBrandYoutubeFilled size={64} />
                  <Text fw={500}>YouTube</Text>
                </Stack>
              </Link>
            </Grid.Col>
            <Grid.Col span={4}>
              <Link
                className={classes.link}
                to={import.meta.env.VITE_TIKTOK}
                target="_target"
              >
                <Stack
                  className={classes.icon__card}
                  justify="center"
                  align="center"
                  p={24}
                >
                  <IconBrandTiktokFilled size={64} />
                  <Text fw={500}>TikTok</Text>
                </Stack>
              </Link>
            </Grid.Col>
          </Grid>
        </Stack>
      </Center>
    </Container>
  );
}

export default PageTransition(JoinUs);
