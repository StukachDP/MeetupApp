import { Card, Typography } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { getFormatDate } from "../textCorrection/dateContent";
import { NewsModel } from "../Models/News/newsModel";
import DefaultMeetupImage from "../images/svg/defaultMeetupImage";

interface NewsItemProps {
  news: NewsModel;
}

const NewsItemLink = styled(Link)`
  display: flex;
  text-decoration: none;
  width: 70%;
`;

const NewsItemCard = styled(Card)`
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
  overflow: visible;
`;

const NewsItemImageBlock = styled.div`
  display: flex;
  align-items: flex-start;
  width: 30%;
  z-index: 1;
  margin-left: -0.5rem;
  margin-top: -0.2rem;
`;

const NewsItemImage = styled.img`
  width: 100%;
  box-shadow: 3px 5px 8px rgba(105, 112, 127, 0.336293);
  border-radius: 5px;
  mix-blend-mode: multiply;
`;

const NewsItemDefaultImageBlock = styled.div`
  background-color: #d0cecb;
  box-shadow: 3px 5px 8px rgba(105, 112, 127, 0.336293);
  border-radius: 5px;
  mix-blend-mode: multiply;
`;

const NewsItemContentBlock = styled.div`
  padding: 1rem 0.5rem 1rem 1rem;
  width: 100%;
  float: left;
`;

const NewsItemPublicationDate = styled(Typography)`
  font-size: 0.9rem;
  color: ${colorTheme.palette.secondary.contrastText};
`;

const NewsItemTittle = styled(Typography)`
  font-size: 1.2rem;
  color: ${colorTheme.palette.primary.dark};
  font-weight: 500;
`;

const NewsItemContentData = styled(Typography)`
  font-size: 0.9rem;
  color: ${colorTheme.palette.primary.light};
`;

const NewsItem: FC<NewsItemProps> = observer(({ news }) => {
  const dateStart = new Date(news.publicationDate.split(".")[0]);
  const shortText =
    news.text.split(".").length === 2
      ? news.text.split(".")[0] + ". " + news.text.split(".")[1] + "..."
      : news.text.split(".")[0] + "...";
  const dateContent = getFormatDate(dateStart);

  return (
    <NewsItemCard data-test-id="news-area">
      <NewsItemImageBlock>
        {news.image ? (
          <NewsItemImage src={require(`../images/${news.image}`).default} />
        ) : (
          <NewsItemDefaultImageBlock>
            <DefaultMeetupImage />
          </NewsItemDefaultImageBlock>
        )}
      </NewsItemImageBlock>
      <NewsItemLink
        to={{
          pathname: "/news/" + news.id,
        }}
      >
        <NewsItemContentBlock>
          <NewsItemPublicationDate>{dateContent}</NewsItemPublicationDate>
          <NewsItemTittle>{news.title}</NewsItemTittle>
          <NewsItemContentData>{shortText}</NewsItemContentData>
        </NewsItemContentBlock>
      </NewsItemLink>
    </NewsItemCard>
  );
});

export default NewsItem;
