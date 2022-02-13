import { Typography, Paper, Button } from "@mui/material";
import { FC, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { getFormatDate, getFormatTime } from "../textCorrection/dateContent";
import AvatarContent from "./avatarContent";
import DefaultMeetupImage from "../images/svg/defaultMeetupImage";
import { observer } from "mobx-react-lite";
import { Context } from "../context/appContext";
import { UserRolesModel } from "../Models/Users/userRolesModel";
import { useTranslation } from "react-i18next";
import { MeetupStatusModel } from "../Models/Meetups/meetupStatusModel";

const MeetupContentHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const MeetupContentBlock = styled(Paper)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  color: ${colorTheme.palette.primary.dark};
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: flex;
`;

const MeetupContentTimeBlock = styled(Paper)`
  margin-bottom: 1rem;
  padding: 1.5rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  display: inline;
`;

const MeetupContentTime = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const MeetupContentSubjectImage = styled.img`
  width: 100%;
`;

const MeetupContentLabel = styled(Typography)`
  padding-left: 0.3rem;
  color: ${colorTheme.palette.primary.light};
  font-size: 0.9rem;
`;

const MeetupContentSubjectContent = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 500;
`;

const MeetupContentTimeContent = styled(Typography)`
  color: ${colorTheme.palette.primary.dark};
  font-size: 1rem;
  font-weight: 500;
`;

const MeetupContentBusinessIcon = styled(BusinessCenterIcon)`
  width: 1.2rem;
  height: 1.2rem;
  padding-right: 1rem;
  padding-bottom: 0.1rem;
`;

const MeetupContentTimeIcon = styled(AccessTimeIcon)`
  width: 1.2rem;
  height: 1.2rem;
  padding-right: 1rem;
  padding-bottom: 0.1rem;
`;

const MeetupContentFMDIcon = styled(FmdGoodIcon)`
  width: 1.2rem;
  height: 1.2rem;
  padding-right: 1rem;
  padding-bottom: 0.1rem;
`;

const MeetupContentAuthorContent = styled(Typography)`
  font-weight: 500;
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

const MeetupContentGoBackButton = styled(Button)`
  width: 25%;
  text-transform: none;
  float: left;
  border-radius: 5px;
  color: ${colorTheme.palette.primary.light};
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid #e2e7ef;
`;

const MeetupContentSubmitButton = styled(Button)`
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

const MeetupContent: FC = observer(() => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { t } = useTranslation();
  const { userStore, meetupsStore } = useContext(Context);
  const dateStart = new Date(
    meetupsStore.choosenByIdMeetup?.start.split(".")[0] ||
      new Date().toISOString()
  );
  const dateFinish = new Date(
    meetupsStore.choosenByIdMeetup?.finish.split(".")[0] ||
      new Date().toISOString()
  );
  const dateContent = getFormatDate(dateStart);
  const timeContent = getFormatTime(dateStart, dateFinish);
  const hasEditingRights =
    userStore.user?.id === meetupsStore.choosenByIdMeetup?.author.id ||
    userStore.user?.roles === UserRolesModel.Chief
      ? true
      : false;
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
      <MeetupContentHeader data-test-id="header">
        {t("choosen_meetup_page.meetup_header")}
      </MeetupContentHeader>
      {meetupsStore.choosenByIdMeetup?.image ? (
        <MeetupContentSubjectImage
          src={
            require(`../images/${meetupsStore.choosenByIdMeetup?.image}`)
              .default
          }
        />
      ) : (
        <DefaultMeetupImage />
      )}

      <MeetupContentBlock>
        <MeetupContentSubjectContent>
          {meetupsStore.choosenByIdMeetup?.subject}
        </MeetupContentSubjectContent>
      </MeetupContentBlock>
      <MeetupContentLabel>
        {t("choosen_meetup_page.time_place")}
      </MeetupContentLabel>
      <MeetupContentTimeBlock>
        <MeetupContentTime>
          <MeetupContentBusinessIcon />
          <MeetupContentTimeContent>{dateContent}</MeetupContentTimeContent>
        </MeetupContentTime>
        <MeetupContentTime>
          <MeetupContentTimeIcon />
          <MeetupContentTimeContent>{timeContent}</MeetupContentTimeContent>
        </MeetupContentTime>
        <MeetupContentTime>
          <MeetupContentFMDIcon />
          <MeetupContentTimeContent>
            {meetupsStore.choosenByIdMeetup?.place}
          </MeetupContentTimeContent>
        </MeetupContentTime>
      </MeetupContentTimeBlock>

      <MeetupContentLabel>
        {t("choosen_meetup_page.speakers")}
      </MeetupContentLabel>
      <MeetupContentBlock>
        <AvatarContent
          name={meetupsStore.choosenByIdMeetup?.author.name}
          surname={meetupsStore.choosenByIdMeetup?.author.surname}
        />
        <MeetupContentAuthorContent>
          {meetupsStore.choosenByIdMeetup?.author.name +
            " " +
            meetupsStore.choosenByIdMeetup?.author.surname}
        </MeetupContentAuthorContent>
      </MeetupContentBlock>
      <MeetupContentLabel>
        {t("choosen_meetup_page.excerpt")}
      </MeetupContentLabel>
      <MeetupContentBlock>
        {meetupsStore.choosenByIdMeetup?.excerpt}
      </MeetupContentBlock>
      <MeetupContentBlock>
        <MeetupContentGoBackButton
          onClick={goBack}
          data-test-id="goBack-button"
        >
          {t("choosen_meetup_page.goBack_button")}
        </MeetupContentGoBackButton>
        {meetupsStore.choosenByIdMeetup?.status !== MeetupStatusModel.Past ? (
          <>
            {hasEditingRights ? (
              <MeetupContentSubmitButton
                onClick={changeMeetupStatus}
                data-test-id="publish-button"
              >
                {t("choosen_meetup_page.publication_button")}
              </MeetupContentSubmitButton>
            ) : (
              <>
                {meetupsStore.isUserParticipantExactly?.isParticipant ? (
                  <MeetupContentSubmitButton
                    onClick={deleteMeetupParticipant}
                    data-test-id="delete-participant-button"
                  >
                    {t("choosen_meetup_page.delete_meetup_participant_button")}
                  </MeetupContentSubmitButton>
                ) : (
                  <MeetupContentSubmitButton
                    onClick={addMeetupParticipant}
                    data-test-id="add-participant-button"
                  >
                    {t("choosen_meetup_page.add_meetup_participant_button")}
                  </MeetupContentSubmitButton>
                )}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </MeetupContentBlock>
    </>
  );
});

export default MeetupContent;
