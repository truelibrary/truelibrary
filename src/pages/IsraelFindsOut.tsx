import { Card, Container, Title } from "@mantine/core";
import PageTransition from "../animations/PageTransition";
import classes from "./IsraelFindsOut.module.css";
import Masonry from "react-masonry-css";

function IsraelFindsOut() {
  return (
    <Container className={classes.container} size={"sm"}>
      <Title>Israel Finds Out</Title>
      <Masonry
        breakpointCols={3}
        className={classes.masonry__grid}
        columnClassName={classes.masonry__grid__column}
      >
        <Card style={{ height: 30 }}>
          <Card.Section>Hello</Card.Section>
        </Card>
        <Card style={{ height: 70 }}>
          <Card.Section>Hello</Card.Section>
        </Card>
        <Card style={{ height: 120 }}>
          <Card.Section>Hello</Card.Section>
        </Card>
        <Card style={{ height: 60 }}>
          <Card.Section>Hello</Card.Section>
        </Card>
        <Card>
          <Card.Section>Hello</Card.Section>
        </Card>
        <Card>
          <Card.Section>Hello</Card.Section>
        </Card>
        <Card>
          <Card.Section>Hello</Card.Section>
        </Card>
        {/* array of JSX items */}
      </Masonry>
    </Container>
  );
}

export default PageTransition(IsraelFindsOut);
