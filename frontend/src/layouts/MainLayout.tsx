import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Container } from "@mui/material";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Container style={{marginTop: "10px"}}>
        <main>
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default MainLayout;
