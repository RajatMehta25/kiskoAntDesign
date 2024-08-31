import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Card, Divider, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { navItemChange } from "../../ReduxToolkit/navListSlice";
import { userChange } from "../../ReduxToolkit/authSlice";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import Breadcrum from "../Header/Breadcrum/Breadcrum";
import { AuthContext } from "../../authContext/AuthContext";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);
  const [finalCards, setFinalCards] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const Cards = getCards();
    setFinalCards(Cards);
  }, [user]);

  const AllCards = [
    {
      key: "Redx",
      card: (
        <Card
          key="/RedXSalesReport"
          hoverable
          style={{
            width: "19rem",
            textAlign: "center",
            //  fontSize:"2rem",
            //  backgroundColor:"ButtonShadow"
          }}
          onClick={() => {
            // navigate("/RedXHome");
            // dispatch(navItemChange("Sales Report"))
            navigate("/RedXSalesReport");
          }}
        >
          <p style={{ fontSize: "2rem" }}>RedX</p>
          <p>Data Management With Red X - for streamlined management and actionable analytics</p>
        </Card>
      ),
    },
    {
      key: "Admin",
      card: (
        <Card
          key="Admin"
          hoverable
          style={{
            width: "19rem",
            textAlign: "center",
            //  fontSize:"2rem",
            //  backgroundColor:"ButtonShadow"
          }}
          onClick={() => {
            // navigate("/RedXHome");
            // dispatch(navItemChange("Admin"))
            navigate("/Admin");
          }}
        >
          <p style={{ fontSize: "2rem" }}>Admin</p>
        </Card>
      ),
    },
  ];

  const getCards = () => {
    const Modules_Screens = user?.Modules_Screens;
    const CardsGenerated = AllCards.filter((ele) => Modules_Screens.includes(ele.key));
    return CardsGenerated;
  };

  return (
    <Flex
      vertical
      justify="center"
      align="space-around"
      gap="large"
      style={
        {
          // backgroundColor:"#E4E5E6"
        }
      }
    >
      {/* <Flex justify='space-between' style={{}}>
              <Flex style={{  fontSize: "2rem",
    color: "#008CD2",marginTop:"0.5rem",marginLeft:"1rem"}}>Sysco</Flex>
             
            </Flex> */}
      {/* <Breadcrum/> */}
      {/* <Divider style={{margin:"0.5rem"}} /> */}
      <Flex wrap justify="space-between" gap={5} align="center" style={{ height: "100%" }}>
        {finalCards.length > 0 ? finalCards.map((ele) => ele.card) : <div>{`Welcome , ${user.name}`}</div>}
        {/* <Card
      hoverable
    style={{
      width:"19rem",
      textAlign:"center",
    //  fontSize:"2rem",
    //  backgroundColor:"ButtonShadow"
    }}
    onClick={()=>{
    
      navigate("/RedXSalesReport");

    }}
    
  >
    <p
    style={{ fontSize:"2rem",}}
    >RedX</p>
       <p>Data Management With Red X - for streamlined management and actionable analytics</p>

  </Card> */}
      </Flex>
    </Flex>
  );
};

export default Home;
