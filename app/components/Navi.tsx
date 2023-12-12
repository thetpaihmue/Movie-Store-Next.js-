"use client";
import { Navbar, Container, Nav } from "react-bootstrap";
import "@/app/Styles/Navi.css";

const Navi = () => {
  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: "#0d253f" }}>
        <Container>
          <Navbar.Brand
            style={{ color: " #90cea1", fontSize: "20px" }}
            href={`/1`}
          >
            Movie Store
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              style={{ color: "#fff", fontSize: "15px", paddingTop: "11px" }}
              href={`/1`}
            >
              Movies
            </Nav.Link>
          </Nav>
          <Nav className="w-100"></Nav>
          <Nav className="w-100"></Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navi;
