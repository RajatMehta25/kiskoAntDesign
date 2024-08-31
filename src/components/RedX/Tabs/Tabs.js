import React, { useEffect }  from 'react'
import { useNavigate } from "react-router-dom";
import { Flex ,Card} from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { navItemChange } from '../../../ReduxToolkit/navListSlice';

const Tabs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(navItemChange("Welcome"))
    }, [])
    

  return (
    <Flex  vertical justify="center" align="space-around" gap="large"  
    style={
      {
        // backgroundColor:"#E4E5E6",
        flex:1}} >
      <Flex wrap  justify="space-around" align="center" style={{flex:1}}>
      <Card
      hoverable
    style={{
      width:"19rem",
    //  fontSize:"1.5rem",
    // height:"9rem"
    }}
    onClick={()=>{navigate("/RedXSalesReport");dispatch(navItemChange("Sales Report"))}}
    
  >
    <p>Sales Report</p>
   
  </Card>
  
  <Card
      hoverable
    style={{
      width: "19rem",
//       fontSize:"1.5rem",
// height:"9rem"

    }}
    onClick={()=>{navigate("/RedXDailyIssueReport");dispatch(navItemChange("Daily Issue Report"))}}
  >
    <p>Daily Issue Report</p>
   
  </Card>
      </Flex>
     </Flex>
  )
}

export default Tabs