import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { FC } from "react";
import styled from "styled-components";

interface AvatarContentProps {
  name: string | undefined;
  surname: string | undefined;
}

const AvatarContainer = styled(Avatar)`
  max-width: 50px;
`;

const AvatarContent: FC<AvatarContentProps> = ({ name, surname }) => {
  let initials: string | JSX.Element = <AccountCircleIcon />;
  if (name !== undefined && surname !== undefined) {
    initials = name[0].toUpperCase() + surname[0].toUpperCase();
  }
  if (name === undefined && surname !== undefined) {
    initials = surname[0].toUpperCase();
  }
  if (name !== undefined && surname === undefined) {
    initials = name[0].toUpperCase();
  }

  return <AvatarContainer>{initials}</AvatarContainer>;
};

export default AvatarContent;
