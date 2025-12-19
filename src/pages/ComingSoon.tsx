import { Title, Text, Container, Center, Stack } from "@mantine/core";

export default function ComingSoonPage() {
  return (
    <Container
      size="md"
      py="xl"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Center w="100%" pb={240}>
        <Stack align="center">
          <Title order={1} size="3rem">
            🚀 Coming Soon
          </Title>
          <Text size="lg" c="dimmed">
            We're working hard to launch our this page. Stay tuned for something
            amazing!
          </Text>
        </Stack>
      </Center>
    </Container>
  );
}
