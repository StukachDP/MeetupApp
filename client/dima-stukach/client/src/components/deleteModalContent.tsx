import { Box, Button, Typography } from "@mui/material";
import { FC, forwardRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import { Context } from "../context/appContext";
import { MeetupModel } from "../Models/Meetups/meetupModel";
import { UserRolesModel } from "../Models/Users/userRolesModel";

interface DeleteModalContentProps {
  deletingContent?: MeetupModel | null;
  close: Function;
}

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

const DeleteModalContent: FC<DeleteModalContentProps> = forwardRef(
  (props: DeleteModalContentProps, ref) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { userStore, meetupsStore } = useContext(Context);
    const hasEditingRights =
      userStore.user?.id === props.deletingContent?.author.id ||
      userStore.user?.roles === UserRolesModel.Chief
        ? true
        : false;
    const deleteMeetupAction = async () => {
      if (hasEditingRights) {
        meetupsStore.deleteMeetup(props.deletingContent?.id).then((data) => {
          if (data) {
            navigate("/meetups");
          } else {
            navigate("/404/error", { replace: true });
          }
        });
      } else {
        navigate("/403/error", { replace: true });
      }
    };

    return (
      <ContentBlock>
        <HeaderText data-test-id="delete-meetup-modal-header">
          {t("delete_modal.header")}
        </HeaderText>
        <hr />
        <ModalInformation>
          {t("delete_modal.content")} <br />
          {props.deletingContent?.subject}
        </ModalInformation>
        <ActionBlock>
          <DeleteButton
            onClick={deleteMeetupAction}
            data-test-id="delete-meetup-button"
          >
            {t("delete_modal.delete_button")}
          </DeleteButton>
          <CloseButton onClick={(e) => props.close()}>
            {t("delete_modal.close_button")}
          </CloseButton>
        </ActionBlock>
      </ContentBlock>
    );
  }
);

export default DeleteModalContent;
