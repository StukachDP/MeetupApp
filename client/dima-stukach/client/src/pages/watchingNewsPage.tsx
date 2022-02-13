import { Button, Container, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import NewsItem from "../components/newsItem";
import { Context } from "../context/appContext";
import { UserRolesModel } from "../Models/Users/userRolesModel";

const WatchingNewsContainer = styled(Container)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const WatchingNewsHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 30%;
  text-align: left;
  margin-bottom: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const WatchingNewsActionBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

const WatchingNewsCreateNewsButton = styled(Button)`
  color: ${colorTheme.palette.secondary.main};
  padding: 0.5rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${colorTheme.palette.secondary.main};
  margin-left: auto;
  text-transform: none;
`;

const WatchingNewsPage: FC = observer(() => {
  const { userStore, newsStore } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const hasEditingRights =
    userStore.user?.roles === UserRolesModel.Chief ? true : false;
  const redirectToCreateForm = () => {
    navigate("/createNews");
  };

  useEffect(() => {
    newsStore.getNews().then((result) => {
      if (!result) {
        navigate("/404/error", { replace: true });
      }
    });
  }, [newsStore, navigate]);

  return (
    <WatchingNewsContainer maxWidth="sm">
      <WatchingNewsActionBlock data-test-id="news-header">
        <WatchingNewsHeader>{t("news_page.header")}</WatchingNewsHeader>
        {hasEditingRights ? (
          <WatchingNewsCreateNewsButton
            onClick={redirectToCreateForm}
            data-test-id="create-news-button"
          >
            {t("news_page.create_news_button")}
          </WatchingNewsCreateNewsButton>
        ) : (
          <></>
        )}
      </WatchingNewsActionBlock>
      <>
        {newsStore.news?.map((news) => (
          <NewsItem key={news.id} news={news} />
        ))}
      </>
    </WatchingNewsContainer>
  );
});

export default WatchingNewsPage;
