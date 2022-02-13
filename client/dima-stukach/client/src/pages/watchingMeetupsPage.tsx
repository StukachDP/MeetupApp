import {
  CircularProgress,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import MeetupsList from "../components/meetupsList";
import { Context } from "../context/appContext";
import { meetupStatus } from "../textCorrection/statusConst";

const WatchingMeetupsPageSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${colorTheme.palette.secondary.main};
`;

const WatchingMeetupsContainer = styled(Container)`
  margin-top: 8rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const WatchingMeetupsHeader = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  color: ${colorTheme.palette.primary.dark};
`;

const WatchingMeetupsPage: FC = observer(() => {
  const [tabNumber, setTabNumber] = useState(0);
  const { userStore, meetupsStore } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newTabNumber: number) => {
      meetupsStore.getStatusFilteredMeetups(newTabNumber);
      setTabNumber(newTabNumber);
    },
    [meetupsStore]
  );

  useEffect(() => {
    meetupsStore.getMeetups().then((result) => {
      if (result) {
        setLoading(false);
        meetupsStore.checkIsUserParticipant(userStore.user?.id).then(() => {});
      } else {
        navigate("/404/error", { replace: true });
      }
    });
  }, [
    meetupsStore.sendNewRequestFlag,
    meetupsStore,
    userStore.user?.id,
    navigate,
  ]);

  if (loading) {
    return <WatchingMeetupsPageSpinner />;
  }

  return (
    <WatchingMeetupsContainer maxWidth="sm">
      <WatchingMeetupsHeader>{t("meetups_page.header")}</WatchingMeetupsHeader>
      <Tabs
        value={tabNumber}
        onChange={handleChange}
        aria-label="full width tabs example"
        data-test-id="filter-tabs"
      >
        <Tab data-test-id="request-tab" label={t("meetups_page.request_tab")} />
        <Tab data-test-id="draft-tab" label={t("meetups_page.draft_tab")} />
        <Tab
          data-test-id="confirmed-tab"
          label={t("meetups_page.confirmed_tab")}
        />
        <Tab data-test-id="past-tab" label={t("meetups_page.past_tab")} />
      </Tabs>
      <MeetupsList
        meetups={meetupsStore.statusFilteredMeetups || []}
        meetupStatus={meetupStatus[tabNumber]}
      />
    </WatchingMeetupsContainer>
  );
});

export default WatchingMeetupsPage;
