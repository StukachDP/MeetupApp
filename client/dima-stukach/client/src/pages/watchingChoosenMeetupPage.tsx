import { CircularProgress, Container } from "@mui/material";
import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import MeetupContent from "../components/meetupContent";
import ThemeContent from "../components/themeContent";
import { Context } from "../context/appContext";
import { meetupStatus } from "../textCorrection/statusConst";

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

const WatchingChoosenMeetupPage: FC = observer(() => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { userStore, meetupsStore } = useContext(Context);

  const getMeetupContentForStatus = () => {
    if (meetupsStore.choosenByIdMeetup && meetupsStore.participants) {
      if (meetupsStore.choosenByIdMeetup.status !== meetupStatus[0]) {
        return <MeetupContent />;
      } else {
        return <ThemeContent />;
      }
    } else {
      console.log("Wrong something");
    }
  };

  useEffect(() => {
    meetupsStore.getParticipants(id).then((requestResult) => {
      meetupsStore.getMeetupById(id).then((filterResult) => {
        meetupsStore
          .checkIsUserParticipantExactly(userStore.user?.id)
          .then(() => {
            if (requestResult && filterResult) {
              setLoading(false);
            } else {
              navigate("/meetups");
            }
          });
      });
    });
  }, [
    id,
    meetupsStore.sendNewRequestFlag,
    navigate,
    meetupsStore,
    userStore.user?.id,
  ]);

  if (loading) {
    return <WatchingChoosenMeetupPageSpinner />;
  }

  return (
    <WatchingChoosenMeetupPageContainer maxWidth="sm">
      {getMeetupContentForStatus()}
    </WatchingChoosenMeetupPageContainer>
  );
});

export default WatchingChoosenMeetupPage;
