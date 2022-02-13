import { Button, Typography } from "@mui/material";
import React, { FC } from "react";
import { getCorrectDataWithNeedStatus } from "../textCorrection/endingCorrectionFunctions";
import { MeetupModel } from "../Models/Meetups/meetupModel";
import { MeetupStatusModel } from "../Models/Meetups/meetupStatusModel";
import MeetupItem from "./meetupItem";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MeetupListMeetupCounterData = styled(Typography)`
  color: ${colorTheme.palette.secondary.light};
  font-size: 1rem;
`;

const MeetupListActionBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

const MeetupListCreateMeetupButton = styled(Button)`
  color: ${colorTheme.palette.secondary.main};
  padding: 0.5rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${colorTheme.palette.secondary.main};
  margin-left: auto;
  text-transform: none;
`;

interface MeetupListProps {
  meetups: Array<MeetupModel>;
  meetupStatus: MeetupStatusModel;
}

const MeetupsList: FC<MeetupListProps> = ({ meetups, meetupStatus }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const redirectToCreateForm = () => {
    navigate("/createMeetup");
  };
  const meetupCounterData = getCorrectDataWithNeedStatus(
    meetups.length,
    meetupStatus
  );
  return (
    <>
      <MeetupListActionBlock>
        <MeetupListMeetupCounterData data-test-id="status-filter-content">
          {meetupCounterData}
        </MeetupListMeetupCounterData>
        <MeetupListCreateMeetupButton
          onClick={redirectToCreateForm}
          data-test-id="create-button"
        >
          {t("meetups_page.create_meetup_button")}
        </MeetupListCreateMeetupButton>
      </MeetupListActionBlock>
      <>
        {meetups.map((meetup) => (
          <MeetupItem
            key={meetup.id}
            meetup={meetup}
            data-test-id="meetup-area"
          />
        ))}
      </>
    </>
  );
};

export default MeetupsList;
