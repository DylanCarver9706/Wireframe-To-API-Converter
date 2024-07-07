import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const authorWebsiteURL =
  "https://dylancarver9706.github.io/Dylan-Carver-Personal-Website/";

function Navbar() {
  return (
    <AppBar position="static" style={{ position: "fixed", top: 0, zIndex: 100, width: "100%" }}>
      <Toolbar
        disableGutters
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="/database-icon.png"
              alt="Logo"
              style={{ height: "50px", marginRight: "-20px" }}
            />
          </Link>
          &nbsp;
          <Container
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              component={Link}
              to="/wireframe-maker"
              sx={{
                my: 2,
                color: "white", // Set the text color to white
                backgroundColor: "transparent",
                display: "block",
                // Add underline
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "none", // Remove underline on hover
                  color: "black",
                },
              }}
            >
              Wireframe Maker
            </Button>
            <Button
              component={Link}
              to="/how-to-use"
              sx={{
                my: 2,
                color: "white",
                backgroundColor: "transparent",
                display: "block",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  color: "black",
                },
              }}
            >
              How To Use
            </Button>

            <Button
              component="a"
              href={authorWebsiteURL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                my: 2,
                color: "white",
                backgroundColor: "transparent",
                display: "block",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "none",
                  color: "black",
                },
              }}
            >
              About the Author
            </Button>
          </Container>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
