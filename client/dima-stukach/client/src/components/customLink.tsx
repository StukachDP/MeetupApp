import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { colorTheme } from "../appTheme";

const CustomNavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colorTheme.palette.primary.main};
  font-size: 1rem;
  margin: 0.4rem 1rem;
  padding: 0 1rem;
  text-decoration: none;
`;

const CustomLink = ({
  children,
  to,
}: {
  children: JSX.Element | string;
  to: string;
}) => {
  const match = useMatch(to);
  return (
    <CustomNavLink
      to={to}
      style={{
        borderBottom: match ? "1px white solid" : "none",
      }}
    >
      {children}
    </CustomNavLink>
  );
};

export default CustomLink;
