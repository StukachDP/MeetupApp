import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterMoment";
import { CircularProgress, ThemeProvider } from "@mui/material";
import styled from "@mui/styled-engine";
import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { colorTheme, theme } from "./appTheme";
import AppRouter from "./components/appRouter";
import NavBar from "./components/navBar";
import { Context } from "./context/appContext";
import UserStore from "./store/userStore";
import MeetupStore from "./store/meetupStore";
import NewsStore from "./store/newsStore";
import "./translations/localization";

const Spinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${colorTheme.palette.secondary.main};
`;

const App: FC = observer(() => {
  const userInfo = new UserStore();
  const meetupsInfo = new MeetupStore();
  const newsInfo = new NewsStore();
  const [userStore, setUserStore] = useState<UserStore>(userInfo);
  const [meetupsStore, setMeetupsStore] = useState<MeetupStore>(meetupsInfo);
  const [newsStore, setNewsStore] = useState<NewsStore>(newsInfo);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    userStore.checkLogin().then(() => {
      setLoading(false);
    });
  }, [userStore]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Context.Provider value={{ userStore, meetupsStore, newsStore }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <NavBar />
            <AppRouter />
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Context.Provider>
  );
});

export default App;
