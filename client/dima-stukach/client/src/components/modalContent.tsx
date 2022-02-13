import { Box, Button, Typography } from "@mui/material";
import { FC, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colorTheme } from "../appTheme";

interface ModalContentProps {
  errorType: string;
  close: Function;
}

const ContentBlock = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20%;
  transform: translate(-50%, -50%);
  background-color: ${colorTheme.palette.primary.main};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 7px rgba(215, 221, 232, 0.398055);
  border: 1px solid ${colorTheme.palette.error.main};
`;

const HeaderText = styled(Typography)`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: ${colorTheme.palette.primary.dark};
`;

const ErrorText = styled(Typography)`
  width: 100%;
  font-size: 0.8rem;
  font-weight: 400;
  color: ${colorTheme.palette.primary.dark};
`;

const CloseButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  text-transform: none;
  border-radius: 5px;
  color: ${colorTheme.palette.secondary.main};
  font-weight: 500;
  font-size: 0.8rem;
  border: 1px solid ${colorTheme.palette.secondary.main};
`;

const ModalContent: FC<ModalContentProps> = forwardRef(
  (props: ModalContentProps, ref) => {
    const { t } = useTranslation();
    return (
      <ContentBlock>
        <HeaderText>{t("delete_modal.header")}</HeaderText>
        <hr />
        {props.errorType === "fileType" ? (
          <ErrorText>
            {t("error_modal.file_error_content.mistake")} <br />
            {t("error_modal.file_error_content.advice")}
          </ErrorText>
        ) : (
          <ErrorText>
            {t("error_modal.size_error_content.mistake")} <br />
            {t("error_modal.size_error_content.advice")}
          </ErrorText>
        )}
        <CloseButton onClick={(e) => props.close()}>
          {t("error_modal.close_button")}
        </CloseButton>
      </ContentBlock>
    );
  }
);

export default ModalContent;
