import { Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Container>
      <Nav
        className="me-auto d-flex justify-content-center"
        style={{ fontSize: "28px" }}
      >
        <Nav.Link href="/addworkout">New workout</Nav.Link>
        <Nav.Link href="/workouts">Workouts</Nav.Link>
        <Nav.Link href="/records">Records</Nav.Link>
      </Nav>
    </Container>
  );
};

export default NavBar;
