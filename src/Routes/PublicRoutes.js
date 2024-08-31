import React from "react";
import { Routes,Route,Navigate } from "react-router-dom";
// import Home from "../containers/home";
// import Contact from "../containers/contact";
// import Layout from "../components/common/layout";
import Login from "../components/Login/Login";
import Main from "../components/Layout/Main";
const PublicRoutes = () => {
  return (

<Routes>
        {/* <Route path="/" element={ <Login  setUser={setUser} /> } /> */}
        <Route path="/" element={ <Login  /> } />

        {/* <Route path="*" element={ <Login setUser={setUser}/> } /> */}
        <Route path="*" element={ <Login /> } />

      </Routes>

    // // <Main>
    //   <Routes>
    //     <Route exact path="/" component={Login} />
    //     {/* <Route exact path="/contact" component={Contact} /> */}
    //   </Routes>
    // // </Main>
  );
};

export default PublicRoutes;