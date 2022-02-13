import { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import ErrorIcon from "../images/svg/errorIcon";

interface FieldErrorMessageProps {
  error: string;
}

const ErrorBlock = styled.div`
  width: 100%;
  margin-top: 0.2rem;
  display: flex;
`;

const ErrorIconBlock = styled.div`
  vertical-align: middle;
`;

const ErrorMessageBlock = styled.div`
  font-size: 0.8rem;
  color: ${colorTheme.palette.error.main};
`;

const FieldErrorMessage: FC<FieldErrorMessageProps> = ({ error }) => {
  const { t } = useTranslation();
  return (
    <ErrorBlock>
      <ErrorIconBlock>
        <ErrorIcon />
      </ErrorIconBlock>

      <ErrorMessageBlock>{t(error)}</ErrorMessageBlock>
    </ErrorBlock>
  );
};

export default FieldErrorMessage;
