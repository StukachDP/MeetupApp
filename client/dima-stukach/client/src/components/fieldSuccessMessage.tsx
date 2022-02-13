import { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { colorTheme } from "../appTheme";
import SuccessIcon from "../images/svg/successIcon";

const SuccessBlock = styled.div`
  width: 100%;
  margin-top: 0.2rem;
  display: flex;
`;

const SuccessIconBlock = styled.div`
  vertical-align: middle;
`;

const SuccessMessageBlock = styled.div`
  font-size: 0.8rem;
  color: ${colorTheme.palette.success.main};
`;

const FieldSuccessMessage: FC = () => {
  const { t } = useTranslation();
  return (
    <SuccessBlock>
      <SuccessIconBlock>
        <SuccessIcon />
      </SuccessIconBlock>

      <SuccessMessageBlock>{t("form_messages.success")}</SuccessMessageBlock>
    </SuccessBlock>
  );
};

export default FieldSuccessMessage;
