import React, { lazy, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "../components/Layout/Main";
// import SalesManager from "../components/RedX/SalesManager/SalesManager";
import Tabs from "../components/RedX/Tabs/Tabs";
import CustomerNotInMasterData from "../components/RedX/CustomerNotInMasterData/CustomerNotInMasterData";
// import DailyIssueReport from "../components/RedX/DailyIssueReport/DailyIssueReport";
import Home from "../components/Home/Home";
// import SalesReport from "../components/RedX/SalesReport/SalesReport";
import Admin from "../components/Admin/Admin";
import Loading from "../components/Loading/Loading";
import Cookies from "js-cookie";
import { AuthContext } from "../authContext/AuthContext";
// import Layout from "../components/common/layout";
// import Contact from "../containers/contact";
// const PrivateRoutes = ({ user ,setUser}) => {
const SalesReport = lazy(() => import("../components/RedX/SalesReport/SalesReport"));
const DailyIssueReport = lazy(() => import("../components/RedX/DailyIssueReport/DailyIssueReport"));

const PrivateRoutes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [finalRoutes, setFinalRoutes] = useState([]);
  useEffect(() => {
    const Routes = getDynamicRoutes();
    setFinalRoutes(Routes);
  }, [user]);

  const DynamicRoutes = [
    {
      key: "Admin",
      route: (
        <Route
          path="/Admin"
          key="/Admin"
          element={
            <Main>
              <Admin user={user} access={"write"} />
            </Main>
          }
        />
      ),
    },
    {
      key: "Redx",
      route: (
        <Route
          path="/RedXSalesReport"
          key="/RedXSalesReport"
          element={
            <Main>
              <SalesReport user={user} access={"write"} />
            </Main>
          }
        />
      ),
    },
    {
      key: "Redx",
      route: (
        <Route
          path="/RedXDailyIssueReport"
          key="/RedXDailyIssueReport"
          element={
            <Main>
              <DailyIssueReport user={user} access={"write"} />
            </Main>
          }
        />
      ),
    },
  ];

  const getDynamicRoutes = () => {
    const Modules_Screens = user?.Modules_Screens;
    const RoutesGenerated = DynamicRoutes.filter((ele) => Modules_Screens.includes(ele.key));
    console.log(
      "routess",
      DynamicRoutes.filter((ele) => Modules_Screens.includes(ele.key))
    );
    return RoutesGenerated;
  };
  //  const userLoggedIn= localStorage.getItem("user")
  // const userLoggedIn=Cookies.get("user")
  return (
    <>
      {/* <Routes>
    <Route path="/Home" element={ <Home user={user} access={"write"}/> } />
    </Routes>
    <Main> */}
      {/* RedX routes Starts */}
      <Routes>
        <Route path="/" element={<Navigate replace to="/Home" />} />

        <Route
          path="/Home"
          element={
            <Main>
              <Home user={user} access={"write"} />
            </Main>
          }
        />
        {/* 
        <Route
          path="/RedXSalesReport"
          element={
            <Main>
              <SalesReport user={user} access={"write"} />
            </Main>
          }
        />

      
        <Route
          path="/RedXDailyIssueReport"
          element={
            <Main>
              {" "}
              <DailyIssueReport user={user} access={"write"} />
            </Main>
          }
        />

        <Route path="/Admin" element={<Main> <Admin user={user} access={"write"} /></Main>} /> */}
        {finalRoutes.map((ele) => ele.route)}

        <Route
          path="*"
          element={
            <Main>
              {" "}
              <div>NO PAGE FOUND</div>
            </Main>
          }
        />
      </Routes>

      {/* RedX routes end  */}

      {/* </Main> */}
    </>
  );
};

export default PrivateRoutes;
