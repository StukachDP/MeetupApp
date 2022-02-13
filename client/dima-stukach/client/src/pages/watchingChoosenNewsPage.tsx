import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { Context } from "../context/appContext";
import DefaultMeetupImage from "../images/svg/defaultMeetupImage";
import { UserRolesModel } from "../Models/Users/userRolesModel";

const WatchingChoosenMeetupPageSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${colorTheme.palette.secondary.main};
`;

const WatchingChoosenMeetupPageContainer = styled(Container)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ChoosenNewsHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const ChoosenNewsBlock = styled(Paper)`
  padding: 1.5rem;
  margin-bottom: 1rem;
  color: ${colorTheme.palette.primary.dark};
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
`;

const ChoosenNewsActionBlock = styled(Paper)`
  padding: 1.5rem;
  margin-bottom: 1rem;
  color: ${colorTheme.palette.primary.dark};
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: flex;
`;

const ChoosenNewsSubjectImage = styled.img`
  width: 100%;
`;

const ChoosenNewsTittleContent = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
`;

const ChoosenNewsTextContent = styled(Typography)`
  font-size: 1rem;
  margin-bottom: 2.5rem;
`;

const ChoosenNewsGoBackButton = styled(Button)`
  width: 25%;
  text-transform: none;
  float: left;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.light};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid ${colorTheme.palette.primary.contrastText};
`;

const ChoosenNewsDeleteButton = styled(Button)`
  width: 25%;
  text-transform: none;
  margin-left: auto;
  border-radius: 5px;
  color: ${colorTheme.palette.secondary.main};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid ${colorTheme.palette.secondary.main};
`;

const ChoosenNewsSubmitButton = styled(Button)`
  width: 25%;
  text-transform: none;
  margin-left: auto;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.main};
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0px 6px 16px rgba(49, 74, 215, 0.242782);
  background-image: linear-gradient(114.85deg, #8065ec 15.83%, #314ad7 84.17%);
`;

const ContentBlock = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30%;
  transform: translate(-50%, -50%);
  background-color: ${colorTheme.palette.primary.main};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  border: 1px solid ${colorTheme.palette.primary.main};
`;

const HeaderText = styled(Typography)`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: ${colorTheme.palette.primary.dark};
`;

const ModalInformation = styled(Typography)`
  width: 100%;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${colorTheme.palette.primary.dark};
  overflow-wrap: break-word;
`;

const ActionBlock = styled.div`
  display: flex;
`;

const DeleteButton = styled(Button)`
  width: 50%;
  margin-top: 1rem;
  margin-right: 1rem;
  text-transform: none;
  border-radius: 5px;
  color: ${colorTheme.palette.error.main};
  font-weight: 500;
  font-size: 0.8rem;
  border: 1px solid ${colorTheme.palette.error.main};
`;

const CloseButton = styled(Button)`
  width: 50%;
  margin-top: 1rem;
  margin-left: 1rem;
  text-transform: none;
  border-radius: 5px;
  color: ${colorTheme.palette.secondary.main};
  font-weight: 500;
  font-size: 0.8rem;
  border: 1px solid ${colorTheme.palette.secondary.main};
`;

const WatchingChoosenNewsPage: FC = observer(() => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { userStore, newsStore } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const hasEditingRights =
    userStore.user?.roles === UserRolesModel.Chief ? true : false;
  const goToEditNewsPage = () => {
    return navigate("/news/edit/" + newsStore.choosenByIdNews?.id);
  };
  const openDeleteModal = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setOpenModal(true);
  };

  const deleteNewsAction = async () => {
    newsStore.deleteNews(newsStore.choosenByIdNews?.id).then((data) => {
      if (data) {
        navigate("/news");
      } else {
        navigate("/403/error", { replace: true });
      }
    });
  };

  useEffect(() => {
    newsStore.getNewsById(id).then((filterResult) => {
      if (filterResult) {
        setLoading(false);
      } else {
        navigate("/404/error", { replace: true });
      }
    });
  }, [id, navigate, newsStore]);

  if (loading || newsStore.choosenByIdNews === null) {
    return <WatchingChoosenMeetupPageSpinner />;
  }

  return (
    <WatchingChoosenMeetupPageContainer maxWidth="sm">
      <ChoosenNewsHeader data-test-id="choosen-news-header">
        {t("choosen_news_page.header")}
      </ChoosenNewsHeader>
      {newsStore.choosenByIdNews.image ? (
        <ChoosenNewsSubjectImage
          src={require(`../images/${newsStore.choosenByIdNews.image}`).default}
        />
      ) : (
        <DefaultMeetupImage />
      )}

      <ChoosenNewsBlock>
        <ChoosenNewsTittleContent>
          {newsStore.choosenByIdNews.title}
        </ChoosenNewsTittleContent>
        <ChoosenNewsTextContent>
          {newsStore.choosenByIdNews.text}
        </ChoosenNewsTextContent>
      </ChoosenNewsBlock>
      <ChoosenNewsActionBlock>
        <ChoosenNewsGoBackButton onClick={goBack} data-test-id="goBack-button">
          {t("choosen_news_page.goBack_button")}
        </ChoosenNewsGoBackButton>
        {hasEditingRights ? (
          <>
            <ChoosenNewsDeleteButton
              onClick={openDeleteModal}
              data-test-id="open-delete-modal-button"
            >
              {t("choosen_news_page.delete_news_button")}
            </ChoosenNewsDeleteButton>
            <ChoosenNewsSubmitButton
              onClick={goToEditNewsPage}
              data-test-id="edit-news-button"
            >
              {t("choosen_news_page.edit_news_button")}
            </ChoosenNewsSubmitButton>
          </>
        ) : (
          <></>
        )}
      </ChoosenNewsActionBlock>
      <Modal open={openModal} onClose={handleClose}>
        <ContentBlock>
          <HeaderText>{t("delete_modal.header")}</HeaderText>
          <hr />
          <ModalInformation>
            {t("delete_modal.content")} <br />
            {newsStore.choosenByIdNews.title}
          </ModalInformation>
          <ActionBlock>
            <DeleteButton
              onClick={deleteNewsAction}
              data-test-id="delete-news-button"
            >
              {t("delete_modal.delete_button")}
            </DeleteButton>
            <CloseButton onClick={handleClose}>
              {t("delete_modal.close_button")}
            </CloseButton>
          </ActionBlock>
        </ContentBlock>
      </Modal>
    </WatchingChoosenMeetupPageContainer>
  );
});

export default WatchingChoosenNewsPage;
