import React, { useContext, useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route, Link, useLocation, useNavigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { AuthContext } from "../authContext/AuthContext";
const Routes = () => {
  const { user, setUser } = useContext(AuthContext);

  // const userLoggedIn= localStorage.getItem("user")
  // const userLoggedIn=Cookies.get("user")
  //   const [userIn,setUser]=useState(false)
  // useEffect(() => {
  //  setUser(localStorage.getItem("user"))
  // },[])

  console.log("Authcontexttt", user);
  // const userIn = useSelector((state) => state.user.user.loggedIn)

  // return user?.user?.loggedIn ? <PrivateRoutes user={user} /> : <PublicRoutes />;
  // return userLoggedIn ? <PrivateRoutes user={user} /> : <PublicRoutes />;

  // return user? <PrivateRoutes setUser={setUser} /> : <PublicRoutes setUser={setUser} />;
  return user.logIn ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
