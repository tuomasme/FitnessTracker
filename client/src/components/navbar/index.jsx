import { Button, Container, Nav } from "react-bootstrap";
import "./styles.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Nav className="center">
        <Nav.Link href="/addworkout">New workout</Nav.Link>
        <Nav.Link href="/workouts">Workouts</Nav.Link>
        <Nav.Link href="/records">Records</Nav.Link>
      </Nav>
      <Nav className="logout">
        <Nav.Link href="/" onClick={() => dispatch(setLogout())}>
          Log out
        </Nav.Link>
      </Nav>
    </Container>
  );
};

export default NavBar;
