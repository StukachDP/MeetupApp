import { Typography, Paper, Button, Modal } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { Context } from "../context/appContext";
import { UserRolesModel } from "../Models/Users/userRolesModel";
import AvatarContent from "./avatarContent";
import DeleteModalContent from "./deleteModalContent";
import ParticipantsList from "./participantsList";

const ThemeContentHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const ThemeContentBlock = styled(Paper)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  color: ${colorTheme.palette.primary.dark};
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: flex;
`;

const ThemeContentGoCountBlock = styled(Paper)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  color: ${colorTheme.palette.primary.dark};
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: flex;
`;

const ThemeContentLabel = styled(Typography)`
  padding-left: 0.3rem;
  color: ${colorTheme.palette.primary.light};
  font-size: 0.9rem;
`;

const ThemeContentSubjectContent = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
`;

const ThemeContentAuthorContent = styled(Typography)`
  font-weight: 500;
  margin-top: 0.5rem;
`;

const ThemeContentGoBackButton = styled(Button)`
  width: 25%;
  text-transform: none;
  float: left;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.light};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid #e2e7ef;
`;

const ThemeContentDeleteButton = styled(Button)`
  width: 25%;
  text-transform: none;
  margin-left: auto;
  border-radius: 5px;
  color: ${colorTheme.palette.secondary.main};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid ${colorTheme.palette.secondary.main};
`;

const ThemeContentSubmitButton = styled(Button)`
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

const ThemeContent: FC = observer(() => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { t } = useTranslation();
  const { userStore, meetupsStore } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const hasEditingRights =
    userStore.user?.id === meetupsStore.choosenByIdMeetup?.author.id ||
    userStore.user?.roles === UserRolesModel.Chief
      ? true
      : false;
  const openDeleteModal = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setOpenModal(true);
  };

  const changeMeetupStatus = async () => {
    const isRequestDone = await meetupsStore.changeMeetupStatus();
    if (isRequestDone) {
      meetupsStore.setSendNewRequestFlag();
    } else {
      console.log("something going wrong");
    }
  };

  const addMeetupParticipant = async () => {
    const isRequestDone = await meetupsStore.addParticipant(
      meetupsStore.choosenByIdMeetup?.id,
      userStore?.user
    );
    if (isRequestDone) {
      meetupsStore.setSendNewRequestFlag();
    } else {
      console.log("something going wrong");
    }
  };

  const deleteMeetupParticipant = async () => {
    const isRequestDone = await meetupsStore.deleteParticipant(
      meetupsStore.choosenByIdMeetup?.id,
      userStore?.user
    );
    if (isRequestDone) {
      meetupsStore.setSendNewRequestFlag();
    } else {
      console.log("something going wrong");
    }
  };

  return (
    <>
      <ThemeContentHeader data-test-id="header">
        {t("choosen_meetup_page.theme_header")}
      </ThemeContentHeader>
      <ThemeContentLabel>{t("choosen_meetup_page.subject")}</ThemeContentLabel>
      <ThemeContentBlock>
        <ThemeContentSubjectContent>
          {meetupsStore.choosenByIdMeetup?.subject}
        </ThemeContentSubjectContent>
      </ThemeContentBlock>
      <ThemeContentLabel>{t("choosen_meetup_page.author")}</ThemeContentLabel>
      <ThemeContentBlock>
        <AvatarContent
          name={meetupsStore.choosenByIdMeetup?.author.name}
          surname={meetupsStore.choosenByIdMeetup?.author.surname}
        />
        <ThemeContentAuthorContent>
          {meetupsStore.choosenByIdMeetup?.author.name +
            " " +
            meetupsStore.choosenByIdMeetup?.author.surname}
        </ThemeContentAuthorContent>
      </ThemeContentBlock>
      <ThemeContentLabel>{t("choosen_meetup_page.excerpt")}</ThemeContentLabel>
      <ThemeContentBlock>
        {meetupsStore.choosenByIdMeetup?.excerpt}
      </ThemeContentBlock>
      <ThemeContentLabel>{t("choosen_meetup_page.goCount")}</ThemeContentLabel>
      <ThemeContentGoCountBlock>
        <ParticipantsList participants={meetupsStore.participants || []} />
      </ThemeContentGoCountBlock>
      <ThemeContentBlock>
        <ThemeContentGoBackButton onClick={goBack} data-test-id="goBack-button">
          {t("choosen_meetup_page.goBack_button")}
        </ThemeContentGoBackButton>
        {hasEditingRights ? (
          <>
            <ThemeContentDeleteButton
              onClick={openDeleteModal}
              data-test-id="delete-button"
            >
              {t("choosen_meetup_page.delete_button")}
            </ThemeContentDeleteButton>
            <ThemeContentSubmitButton
              onClick={changeMeetupStatus}
              data-test-id="publish-button"
            >
              {t("choosen_meetup_page.publication_button")}
            </ThemeContentSubmitButton>
          </>
        ) : (
          <>
            {meetupsStore.isUserParticipantExactly?.isParticipant ? (
              <ThemeContentSubmitButton
                onClick={deleteMeetupParticipant}
                data-test-id="delete-participant-button"
              >
                {t("choosen_meetup_page.delete_participant_button")}
              </ThemeContentSubmitButton>
            ) : (
              <ThemeContentSubmitButton
                onClick={addMeetupParticipant}
                data-test-id="add-participant-button"
              >
                {t("choosen_meetup_page.add_participant_button")}
              </ThemeContentSubmitButton>
            )}
          </>
        )}
      </ThemeContentBlock>
      <Modal open={openModal} onClose={handleClose}>
        <DeleteModalContent
          deletingContent={meetupsStore.choosenByIdMeetup}
          close={handleClose}
        />
      </Modal>
    </>
  );
});

export default ThemeContent;
