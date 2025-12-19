import { Stack, Title, Text, Container, Center } from "@mantine/core";
import classes from "./NoArticleFound.module.css";

export default function NoArticleFound() {
  return (
    <Container size="md" py="xl" className={classes.container}>
      <Center w="100%" pb={240}>
        <Stack align="center">
          <Title order={1} size="3rem">
            Article Not Found
          </Title>
          <Text size="lg" c="dimmed">
            The article you’re looking for doesn’t exist or may have been
            removed.
          </Text>
        </Stack>
      </Center>
    </Container>
  );
}
