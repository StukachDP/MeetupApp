import { FC } from "react";
import styled from "styled-components";
import { colorTheme } from "../appTheme";

interface FieldStartMessageProps {
  message: string;
}

const StartBlock = styled.div`
  width: 100%;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: ${colorTheme.palette.primary.dark};
  display: flex;
`;

const FieldStartMessage: FC<FieldStartMessageProps> = ({ message }) => {
  return <StartBlock>{message}</StartBlock>;
};

export default FieldStartMessage;
