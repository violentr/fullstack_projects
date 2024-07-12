import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

const Welcome = () => (
  <Jumbotron className="mt-4">
    <h1>Images Gallery</h1>
    <p>This is simple application, using unsplash API</p>
    <p>
      <Button variant="primary" href="https://unsplash.com" target="_blank">
        Learn more
      </Button>
    </p>
  </Jumbotron>
);

export default Welcome;
