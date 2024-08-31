import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import pom from "../../img/pom.jpg";
import { redirect, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userChange, userLogin } from "../../ReduxToolkit/authSlice";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { Button } from "antd";
import Cookies from "js-cookie";
import AuthProvider from "../../authContext/AuthProvider";
import { AuthContext } from "../../authContext/AuthContext";
// import { SigninButton } from '@azure/msal-react';

// import {Configuration,PublicClientApplication} from "@azure/msal-react";

// const config=new Configuration({
//   auth:{
//     // clientId:"",
//     // authority:"https://login.microsoftonline.com/tenantId",
//     // redirectUri:"http://localhost:3000",
//   },
//   cache:{
//     cacheLocation:"localStorage"
//   }
// })
// const msalInstance=new PublicClientApplication(config)

const Login = () => {
  const { user, setUser } = useContext(AuthContext);

  //  const user=useSelector((state)=>state.user.user.loggedIn)
  // useEffect(() => {
  //   dispatch(userLogin(localStorage.getItem("user")))
  // }, [user])
  // const [userIn,setUserIn]=useState(localStorage.getItem('user'))
  // useEffect(() => {
  //  setUserIn(localStorage.getItem('user'))
  // }, [userIn])

  const request = {
    // loginHint: "name@example.com",
    // scopes: ["User.Read"],
  };
  const { accounts, instance } = useMsal();

  // const { login, result, error } = useMsalAuthentication(InteractionType.Silent, request);
  // const isAuthenticated = useIsAuthenticated();
  // const initializeSignIn = () => {
  //   instance.loginRedirect();
  // };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // go to an authenticated-only place
  //  } else {
  //    // go back to the public landing page where the user can try to login again
  //  }
  //     // if (error) {
  //     //     // login(InteractionType.Popup, request);
  //     //     alert("login")
  //     // }
  // }, [isAuthenticated]);

  const handleLogin = () => {
    instance.loginPopup(request).catch((e) => {
      console.log(e);
    });
    // instance.login(request).catch((e) => {
    //   console.log(e);
    // });
  };
  const getUserLoginStatus = () => {
    localStorage.setItem("user", true);
    return localStorage.getItem("user");
  };

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userLoggedIn=Cookies.get("user")

  return (
    <div className="container">
      <div className="leftContainer">
        <div className="logoDiv">
          <div className="loginLogoSysco">KISCO</div> <div className="loginLogoRedX">{`| Keeside`} </div>
        </div>
        <div className="text">ABC Tracker Report</div>
        {/* <div className='ssoButton'><button className='ssoBtn'>SSO Login</button></div> */}
        <div className="form">
          {/* <div className='useridRow'><div className='userText'>Username</div><div className='useridInput'><input type='text' value={userID} onChange={(e)=>setUserID(e.target.value)} /></div></div>
                <div className='passwordRow'><div className='passwordText'>Password</div><div className='passwordInput'><input type='password' value={password}  onChange={(e)=>setPassword(e.target.value)}/></div></div> */}
          <div className="loginButton">
            <button
              className="loginBtn"
              onClick={() => {
                // handleLogin();
                localStorage.setItem("user", JSON.stringify({ ...user, logIn: true }));
                setUser(JSON.parse(localStorage.getItem("user")));

                // Cookies.set("user",true);
              }}
            >
              Login
            </button>
          </div>
          {/* <SigninButton instance={msalInstance}/> */}
          {/* <AuthenticatedTemplate>
                <p>Signed in as: {accounts[0]?.username}</p>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>No users are signed in!</p>
            </UnauthenticatedTemplate> */}
          {/* <div onClick={initializeSignIn}>Sign in</div> */}
          {/* <Button onClick={handleLogin}>Sign in</Button> */}
        </div>
      </div>
      <div className="rightContainer">
        <div className="imageContainer" style={{ backgroundImage: `url(${pom})` }}></div>
      </div>
    </div>
  );
};

export default Login;
