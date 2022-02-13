import { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Context } from "../context/appContext";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { userStore } = useContext(Context);
  if (!userStore.isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
