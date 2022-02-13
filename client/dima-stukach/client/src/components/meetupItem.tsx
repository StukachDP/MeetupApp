import {
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from "@mui/material";
import { MeetupModel } from "../Models/Meetups/meetupModel";
import { FC, useContext, useState } from "react";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { Link, useNavigate } from "react-router-dom";
import AvatarContent from "./avatarContent";
import { observer } from "mobx-react-lite";
import { Context } from "../context/appContext";
import { UserRolesModel } from "../Models/Users/userRolesModel";
import DeleteModalContent from "./deleteModalContent";
import { meetupStatus } from "../textCorrection/statusConst";
import { getFormatDate, getFormatTime } from "../textCorrection/dateContent";
import { useTranslation } from "react-i18next";

interface MeetupItemProps {
  meetup: MeetupModel;
}

const MeetupItemLink = styled(Link)`
  text-decoration: none;
`;

const MeetupItemHeaderBlock = styled(CardContent)`
  display: flex;
  padding-top: 1rem;
`;

const MeetupItemCardFooterBlock = styled(CardActions)`
  display: flex;
  padding-left: 1rem;
`;

const MeetupItemAvatarBlock = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
`;

const MeetupItemActionBlock = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
`;

const MeetupItemAuthorData = styled(Typography)`
  font-size: 0.9rem;
  color: ${colorTheme.palette.secondary.light};
  overflow-wrap: break-word;
`;

const MeetupItemStartPlaceData = styled(Typography)`
  font-size: 1rem;
  color: ${colorTheme.palette.secondary.light};
  overflow-wrap: break-word;
`;

const MeetupItemCardContentTittle = styled(Typography)`
  font-size: 1.2rem;
  color: ${colorTheme.palette.primary.dark};
  font-weight: 500;
`;

const MeetupItemCardContentData = styled(Typography)`
  font-size: 0.9rem;
  color: ${colorTheme.palette.primary.light};
`;

const MeetupItemCardActionGoCountIcon = styled(PersonOutlineTwoToneIcon)`
  font-size: 1.4rem;
  padding-right: 0.2rem;
`;

const MeetupItemLikeCount = styled(Typography)`
  color: ${colorTheme.palette.secondary.contrastText};
  display: flex;
  justify-content: center;
`;

const MeetupItemLikeCountActive = styled(Typography)`
  color: ${colorTheme.palette.primary.dark};
  font-weight: 500;
  display: flex;
  justify-content: center;
`;

const MeetupItemActionButton = styled(Button)`
  width: 1rem;
  height: 2rem;
  min-width: 2rem;
  margin: 0 0.5rem;
  color: ${colorTheme.palette.secondary.dark};
`;

const MeetupItem: FC<MeetupItemProps> = observer(({ meetup }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userStore, meetupsStore } = useContext(Context);
  const dateStart = new Date(meetup.start.split(".")[0]);
  const dateFinish = new Date(meetup.finish.split(".")[0]);
  const dateContent = getFormatDate(dateStart);
  const timeContent = getFormatTime(dateStart, dateFinish);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const openDeleteModal = () => {
    setOpenModal(true);
  };
  const hasEditingRights =
    userStore.user?.id === meetup.author.id ||
    userStore.user?.roles === UserRolesModel.Chief
      ? true
      : false;
  const isUserParticipant = meetupsStore.findIsParticipant(meetup.id);
  const goToEditMeetupPage = () => {
    return navigate("/meetup/edit/" + meetup.id);
  };

  return (
    <Card>
      <MeetupItemHeaderBlock>
        <MeetupItemAvatarBlock>
          {meetup.status === meetupStatus[0] ? (
            <>
              <AvatarContent
                name={meetup.author.name}
                surname={meetup.author.surname}
              />
              <MeetupItemAuthorData>
                {meetup.author.name + " " + meetup.author.surname}
              </MeetupItemAuthorData>
            </>
          ) : (
            <>
              <MeetupItemStartPlaceData>
                {dateContent + " " + timeContent}
              </MeetupItemStartPlaceData>
            </>
          )}
        </MeetupItemAvatarBlock>
        <MeetupItemActionBlock>
          {hasEditingRights ? (
            <>
              <MeetupItemActionButton
                onClick={openDeleteModal}
                data-test-id="delete-meetup-icon"
              >
                <DeleteIcon />
              </MeetupItemActionButton>
              <MeetupItemActionButton
                onClick={goToEditMeetupPage}
                data-test-id="edit-meetup-button"
              >
                <ModeEditOutlineIcon />
              </MeetupItemActionButton>
            </>
          ) : (
            <></>
          )}
        </MeetupItemActionBlock>
      </MeetupItemHeaderBlock>
      <MeetupItemLink
        to={{
          pathname: "/meetup/" + meetup.id,
        }}
      >
        <CardContent data-test-id="meetup-info">
          <MeetupItemCardContentTittle>
            {meetup.subject}
          </MeetupItemCardContentTittle>
          <MeetupItemCardContentData>
            {meetup.excerpt}
          </MeetupItemCardContentData>
        </CardContent>
      </MeetupItemLink>
      {meetup.status === meetupStatus[0] ? (
        <CardActions>
          {!isUserParticipant ? (
            <MeetupItemLikeCount>
              <MeetupItemCardActionGoCountIcon />
              {meetup.goCount} {t("meetups_page.goCount_button")}
            </MeetupItemLikeCount>
          ) : (
            <MeetupItemLikeCountActive>
              <MeetupItemCardActionGoCountIcon />
              {meetup.goCount} {t("meetups_page.goCount_button")}
            </MeetupItemLikeCountActive>
          )}
        </CardActions>
      ) : (
        <MeetupItemCardFooterBlock>
          <AvatarContent
            name={meetup.author.name}
            surname={meetup.author.surname}
          />
          <MeetupItemAuthorData>
            {meetup.author.name + " " + meetup.author.surname}
          </MeetupItemAuthorData>
        </MeetupItemCardFooterBlock>
      )}
      <Modal open={openModal} onClose={handleClose}>
        <DeleteModalContent deletingContent={meetup} close={handleClose} />
      </Modal>
    </Card>
  );
});

export default MeetupItem;
