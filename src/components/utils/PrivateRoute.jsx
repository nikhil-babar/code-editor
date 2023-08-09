import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH_STATUS,
  authStatusSelector,
  fetchAuthState,
} from "../../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const PrivateRoute = () => {
  const authStatus = useSelector((state) => authStatusSelector(state.auth));
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus.localeCompare(AUTH_STATUS.idle) === 0) {
      dispatch(fetchAuthState());
    }
  }, [dispatch, authStatus]);

  if (authStatus.localeCompare(AUTH_STATUS.loading) === 0) {
    return <Loader isLoading={true} />;
  } else if (authStatus.localeCompare(AUTH_STATUS.idle) === 0) {
    return null;
  } else if (authStatus.localeCompare(AUTH_STATUS.failure) === 0) {
    return <Navigate to={"/home"} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
