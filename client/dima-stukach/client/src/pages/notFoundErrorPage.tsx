import { Button, Container, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";

const NotFoundErrorPageContainer = styled(Container)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const NotFoundErrorPageHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const NotFoundErrorPageActionBlock = styled.div`
  margin-top: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NotFoundErrorPageGoMainButton = styled(Button)`
  width: 50%;
  text-transform: none;
  border-radius: 5px;
  color: ${colorTheme.palette.secondary.main};
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0px 6px 16px rgba(49, 74, 215, 0.242782);
  border: 1px solid ${colorTheme.palette.secondary.main};
`;

const NotFoundErrorPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate("/meetups", { replace: true });
  };
  return (
    <NotFoundErrorPageContainer maxWidth="sm">
      <NotFoundErrorPageHeader>
        {t("error_page.notFound_header")}
      </NotFoundErrorPageHeader>
      <NotFoundErrorPageActionBlock>
        <NotFoundErrorPageGoMainButton onClick={goToMainPage}>
          {t("error_page.go_main_button")}
        </NotFoundErrorPageGoMainButton>
      </NotFoundErrorPageActionBlock>
    </NotFoundErrorPageContainer>
  );
};

export default NotFoundErrorPage;
