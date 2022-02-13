import LogoSaM from "../images/LogoSaM.png";
import { FC, useContext, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  AppBar,
  Divider,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { colorTheme } from "../appTheme";
import CustomLink from "./customLink";
import { Context } from "../context/appContext";
import AvatarContent from "./avatarContent";
import LanguageIcon from "@mui/icons-material/Language";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const NavBarContainer = styled(Container)`
  display: flex;
`;
const NavBarLogo = styled.div`
  width: 20%;
  display: flex;
`;

const NavBarLinkArea = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
`;

const AvatarLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colorTheme.palette.primary.main};
  font-size: 1rem;
  margin: 0.4rem 1rem;
  padding: 0 1rem;
  text-decoration: none;
`;

const NavBarLogin = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
`;

const NavBarInfo = styled(Typography)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0.3rem 0.3rem 0.3rem 0;
`;

const NavBar: FC = observer(() => {
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logout = async () => {
    const result = await userStore.logoutUser();
    if (result) {
      navigate("/meetups");
    } else {
      navigate("/404/error", { replace: true });
    }
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeLanguage = (event: React.SyntheticEvent) => {
    if (i18n.language === "en") {
      i18n.changeLanguage("rus");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <>
      <AppBar>
        <NavBarContainer>
          <NavBarLogo>
            <AvatarLink to="/meetups">
              <img src={LogoSaM} alt="Logo" />
            </AvatarLink>
          </NavBarLogo>
          {userStore.isAuth ? (
            <>
              <NavBarLinkArea>
                <CustomLink to="/meetups">
                  {t("nav_bar.meetup_link")}
                </CustomLink>
                <CustomLink to="/news">{t("nav_bar.news_link")}</CustomLink>
              </NavBarLinkArea>
              <NavBarLogin>
                <IconButton
                  onClick={handleClick}
                  data-test-id="open-menu-button"
                >
                  <NavBarInfo>
                    {userStore.user?.name + " " + userStore.user?.surname}
                  </NavBarInfo>
                  <AvatarContent
                    name={userStore.user?.name}
                    surname={userStore.user?.surname}
                  />
                </IconButton>
              </NavBarLogin>
            </>
          ) : (
            <>
              <NavBarLinkArea></NavBarLinkArea>
              <NavBarLogin>
                <IconButton
                  onClick={handleClick}
                  data-test-id="open-menu-button"
                >
                  <NavBarInfo>{t("nav_bar.signIn_button")}</NavBarInfo>
                </IconButton>
              </NavBarLogin>
            </>
          )}
        </NavBarContainer>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem data-test-id="language-label">
          <ListItemIcon>
            <LanguageIcon fontSize="small" />
          </ListItemIcon>
          {t("nav_bar.current_language_button")}
        </MenuItem>
        <MenuItem
          onClick={changeLanguage}
          data-test-id="change-language-button"
        >
          <ListItemIcon>
            <ChangeCircleIcon fontSize="small" />
          </ListItemIcon>
          {t("nav_bar.change_language_button")}
        </MenuItem>
        {userStore.isAuth ? (
          <MenuItem onClick={logout} data-test-id="logOut-button">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {t("nav_bar.logOut_button")}
          </MenuItem>
        ) : (
          <Divider />
        )}
      </Menu>
    </>
  );
});

export default NavBar;
