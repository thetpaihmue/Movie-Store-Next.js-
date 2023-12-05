"use client";
import { useState } from "react";
import { Navbar, Container, Nav, FormControl } from "react-bootstrap";
import "../Styles/Navi.css";
import { useRouter } from "next/navigation";

const Navi = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      console.log("Performing search for:", searchTerm);
      router.push(`/movies?search=${searchTerm}`);
    }
  };

  return (
    <div>
      <Navbar expand="lg" style={{ backgroundColor: "#0d253f" }}>
        <Container>
          <Navbar.Brand
            style={{ color: " #90cea1", fontSize: "20px" }}
            href={`/`}
          >
            Movie Store
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              style={{ color: "#fff", fontSize: "15px", paddingTop: "11px" }}
              href={`/`}
            >
              Movies
            </Nav.Link>
          </Nav>
          <Nav className="w-100"></Nav>
          <Nav className="w-100"></Nav>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </Container>
      </Navbar>
    </div>
  );
};

export default Navi;
