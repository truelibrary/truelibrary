import {
  IconBrandDiscord,
  IconBrandTiktok,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Container,
  Group,
  Text,
  Notification,
} from "@mantine/core";
import classes from "./Footer.module.css";
import { Link } from "react-router";
import { useState } from "react";

export function FooterSocial() {
  const [counter, setCounter] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const increment = () => {
    setCounter((prev) => prev + 1);

    if (counter > 10 && localStorage.getItem("enable-studio") !== "true") {
      localStorage.setItem("enable-studio", "true");
      setShowNotification(true);
    }
  };

  return (
    <div className={classes.footer}>
      {showNotification && (
        <Notification
          title="Studio enabled. You can refresh the page now"
          mb={24}
          m={12}
          onClose={() => setShowNotification(false)}
        />
      )}

      <Container className={classes.inner}>
        <Text onClick={increment} fw={800}>
          True Islam Library
        </Text>
        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link to={import.meta.env.VITE_TIKTOK} target="_blank">
              <IconBrandTiktok size={18} stroke={1.5} />
            </Link>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link to={import.meta.env.VITE_YOUTUBE} target="_blank">
              <IconBrandYoutube size={18} stroke={1.5} />
            </Link>
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Link to={import.meta.env.VITE_DISCORD} target="_blank">
              <IconBrandDiscord size={18} stroke={1.5} />
            </Link>
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
