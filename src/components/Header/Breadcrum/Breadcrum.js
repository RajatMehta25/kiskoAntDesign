import React, { useCallback, useEffect } from "react";
import "./Breadcrum.css";
import { useSelector, useDispatch } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { Button, Row, Col, Image } from "antd";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import syscoLogo from "../../../img/sysco.svg";
import { navItemChange } from "../../../ReduxToolkit/navListSlice";
const Breadcrum = ({ darkMode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.navActiveItem.activeItem);
  const checkUrl = useCallback(() => {
    switch (window.location.pathname) {
      case "/RedXSalesReport":
        return "Sales Report";

      case "/RedXDailyIssueReport":
        return "Daily Issue Report";

      case "/Admin":
        return "Admin";

      default:
        return "Home";
        break;
    }
  }, [window.location.pathname]);

  return (
    <>
      <div className="breadContainer">
        <div className="breadTextData">
          {/* <div className='logoBreadcrum'><img src={syscoLogo} /></div> */}
          <div className="dynamicText">{checkUrl()}</div>
        </div>
        {/* <Button onClick={()=>{navigate("/Home")}}><AiFillHome/></Button> */}
        {/* <CustomDropdown /> */}
      </div>
      {/* <div style={{margin:"1rem"}}>
    <Row
    
      
    >

    </Row>
    </div> */}
    </>
  );
};

export default Breadcrum;
