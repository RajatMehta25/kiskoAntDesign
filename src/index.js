import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./ReduxToolkit/store";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
// import { MsalProvider } from '@azure/msal-react';

// import {Configuration,PublicClientApplication} from "@azure/msal-browser";
// import {Configuration,PublicClientApplication} from "@azure/msal-react";

const config = {
  auth: {
    clientId: "1111-2222-3333-4444-55555555",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
  },
};
// const msalInstance=new PublicClientApplication(config)
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login/>,
//   },
//   {
//     path:"/welcome",
//     // element:<Main/>
//     element:<Main componentToLoad={<SalesManager/>}/>
//   },
//   // {
//   //   path:"/SalesManager",
//   //   element:<Main componentToLoad={<SalesManager/>}/>
//   // },

// ]);
const msalInstance = new PublicClientApplication(config);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <React.StrictMode> */}
    {/* <Provider store={store}>
    <RouterProvider router={router} />
    </Provider> */}

    <Provider store={store}>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </BrowserRouter>
    </Provider>
    {/* </React.StrictMode> */}
  </>
);
