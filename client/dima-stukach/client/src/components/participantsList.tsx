import { Button } from "@mui/material";
import { FC, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { MeetupPersonModel } from "../Models/Meetups/meetupPersonModel";
import AvatarContent from "./avatarContent";

interface ParticipantsListProps {
  participants: Array<MeetupPersonModel>;
}

const Container = styled.div`
  width: 100%;
`;

const ParticipantsListContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ParticipantsListLimitContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ParticipantsListRenderNewParticipantsBotton = styled(Button)`
  min-width: 50px;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: ${colorTheme.palette.info.main};
  color: ${colorTheme.palette.primary.main};
  font-size: 1rem;
  font-weight: 500;
  :hover {
    background-color: ${colorTheme.palette.secondary.main};
  }
`;

const ParticipantsList: FC<ParticipantsListProps> = ({ participants }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  }, [divRef]);
  const getLimitBlockNumber = (width: number) => {
    const maxWidth = 50;
    let limitBlock = Math.trunc(width / maxWidth);
    let pushIndex = 0;
    const limitParticipantsList: Array<MeetupPersonModel> = [];
    while (limitBlock - 1 > 0) {
      limitBlock--;
      if (participants.length > 0) {
        limitParticipantsList.push(participants[pushIndex]);
        participants.shift();
      }
    }
    if (participants.length > 0) {
      return (
        <ParticipantsListLimitContainer>
          {limitParticipantsList.map((participant) => (
            <AvatarContent
              key={participant.id}
              name={participant.name}
              surname={participant.surname}
            />
          ))}
          <ParticipantsListRenderNewParticipantsBotton>
            +{participants.length}
          </ParticipantsListRenderNewParticipantsBotton>
        </ParticipantsListLimitContainer>
      );
    } else {
      return (
        <ParticipantsListLimitContainer>
          {limitParticipantsList.map((participant) => (
            <AvatarContent
              key={participant.id}
              name={participant.name}
              surname={participant.surname}
            />
          ))}
        </ParticipantsListLimitContainer>
      );
    }
  };
  return (
    <Container>
      <ParticipantsListContainer ref={divRef}></ParticipantsListContainer>
      <ParticipantsListContainer>
        {getLimitBlockNumber(width)}
      </ParticipantsListContainer>
    </Container>
  );
};

export default ParticipantsList;
