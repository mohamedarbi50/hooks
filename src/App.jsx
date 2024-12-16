import React from "react";
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import MovieList from "./components/MovieList/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      {/* Blue Navbar */}
      <Navbar className="navbar-custom" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand >Mflix</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Row className="text-center">
          <Col></Col>
        </Row>

        <MovieList />
      </Container>
    </div>
  );
};

export default App;
