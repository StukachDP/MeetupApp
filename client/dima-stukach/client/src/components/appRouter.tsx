import { FC } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import CreateMeetupPage from "../pages/createMeetupPage";
import CreateNewsPage from "../pages/createNewsPage";
import EditMeetupPage from "../pages/editMeetupPage";
import EditNewsPage from "../pages/editNewsPage";
import ForbiddenErrorPage from "../pages/forbiddenErrorPage";
import LoginPage from "../pages/loginPage";
import NotFoundErrorPage from "../pages/notFoundErrorPage";
import WatchingChoosenMeetupPage from "../pages/watchingChoosenMeetupPage";
import WatchingChoosenNewsPage from "../pages/watchingChoosenNewsPage";
import WatchingMeetupsPage from "../pages/watchingMeetupsPage";
import WatchingNewsPage from "../pages/watchingNewsPage";
import RequireAuth from "./requireAuth";

const AppRouter: FC = () => {
  const anyRoutes = {
    path: "*",
    element: <Navigate to="/meetups" />,
  };

  const notFoundErrorRoutes = {
    path: "/404/error",
    element: (
      <RequireAuth>
        <NotFoundErrorPage />
      </RequireAuth>
    ),
  };

  const forbiddenErrorRoutes = {
    path: "/403/error",
    element: (
      <RequireAuth>
        <ForbiddenErrorPage />
      </RequireAuth>
    ),
  };

  const meetupRoutes = {
    path: "/meetups",
    element: (
      <RequireAuth>
        <WatchingMeetupsPage />
      </RequireAuth>
    ),
  };

  const choosenMeetupRoute = {
    path: "/meetup/:id",
    element: (
      <RequireAuth>
        <WatchingChoosenMeetupPage />
      </RequireAuth>
    ),
  };

  const editMeetupRoute = {
    path: "/meetup/edit/:id",
    element: (
      <RequireAuth>
        <EditMeetupPage />
      </RequireAuth>
    ),
  };

  const createMeetupRoute = {
    path: "/createMeetup",
    element: (
      <RequireAuth>
        <CreateMeetupPage />
      </RequireAuth>
    ),
  };

  const newsRoutes = {
    path: "/news",
    element: (
      <RequireAuth>
        <WatchingNewsPage />
      </RequireAuth>
    ),
  };

  const choosenNewsRoute = {
    path: "/news/:id",
    element: (
      <RequireAuth>
        <WatchingChoosenNewsPage />
      </RequireAuth>
    ),
  };

  const editNewsRoute = {
    path: "/news/edit/:id",
    element: (
      <RequireAuth>
        <EditNewsPage />
      </RequireAuth>
    ),
  };

  const createNewsRoute = {
    path: "/createNews",
    element: (
      <RequireAuth>
        <CreateNewsPage />
      </RequireAuth>
    ),
  };

  const loginRoutes = {
    path: "/login",
    element: <LoginPage />,
  };

  const routing = useRoutes([
    anyRoutes,
    notFoundErrorRoutes,
    forbiddenErrorRoutes,
    meetupRoutes,
    choosenMeetupRoute,
    createMeetupRoute,
    editMeetupRoute,
    loginRoutes,
    newsRoutes,
    choosenNewsRoute,
    editNewsRoute,
    createNewsRoute,
  ]);

  return <>{routing}</>;
};

export default AppRouter;
