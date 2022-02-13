import { Container } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import LoginForm from "../components/loginForm";
import backgroundIMG from "../images/backgroundIMG.jpg";

const LoginPage: FC = () => {
  const LoginPageImage = styled.img`
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -1;
  `;
  return (
    <>
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
      <LoginPageImage src={backgroundIMG} alt="basic-page-background" />
    </>
  );
};

export default LoginPage;
