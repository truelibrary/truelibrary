import { defineConfig, Studio } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "../schemaTypes";
import { media } from "sanity-plugin-media";
import { Alert, Center, Container } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

const config = defineConfig({
  projectId: import.meta.env.VITE_PROJECT_ID || "",
  dataset: import.meta.env.VITE_DATASET || "",
  basePath: "/studio",

  plugins: [structureTool(), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
});
export default function StudioRoute() {
  const icon = <IconInfoCircle />;

  if (localStorage.getItem("enable-studio") !== "true") {
    return (
      <Container>
        <Center>
          <Alert
            variant="light"
            color="red"
            title="The Studio feature is limited to administrators."
            icon={icon}
          >
            For access-related questions, please get in touch with the
            appropriate person on your team.
          </Alert>
        </Center>
      </Container>
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <Studio config={config} />
    </div>
  );
}
