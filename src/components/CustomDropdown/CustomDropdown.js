import React, { useRef } from 'react'
import { Dropdown, Space,Button ,message, Divider} from 'antd';
import { NavLink } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";

import { useSelector, useDispatch } from 'react-redux';
import { userChange } from '../../ReduxToolkit/authSlice';
import { FaPowerOff } from "react-icons/fa6";

const CustomDropdown = ({access}) => {

  // const navigate = useNavigate();
  const dispatch = useDispatch()
// const dropdownRef=useRef(null)
const handleLogout=()=>{
  dispatch(userChange(false))
}
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  
    const items = [
       
       
        
        
  // {
  //   key: '1',
  //   label: 'Red X',
  //   children: [
  //     {
  //       key: 'Sales Report',
  //       label: (<NavLink to="/RedXSalesReport">Sales Report</NavLink>),
  //     },
  //     {
  //       key: 'Daily Issue Report',
  //       label: (<NavLink to="/RedXDailyIssueReport">Daily Issue Report</NavLink>),
  //     },
  //   ],
  // },
  
  {
    key: 'User Name',
    // danger: true,
    label:   <div> Rajat Mehta </div>,
    // icon: <FaPowerOff/>,
    selectable:false
  },
  {
    key: 'User Role',
    // danger: true,
    label: <div> Sales Manager </div>,
    // icon: <FaPowerOff/>,
    selectable:false
  },
  
        {
          key: 'Logout',
          danger: true,
          label: ('Logout'),
          icon: <FaPowerOff/>,
          
          onClick:handleLogout,
        },
      ];
      const menuProps = {
        items,
        // onClick: handleMenuClick,
      };

  return (
    <div>
         <Dropdown
        //  ref={dropdownRef}
    menu={{
      items,
      // selectable:true
    }}
  >
     <FaRegCircleUser style={{fontSize:"2rem",margin:"1rem"}} />
    {/* <a onClick={(e) => e.preventDefault()}> */}
     
      {/* <Dropdown.Button menu={{
      items,
    }} placement="bottom" icon={<FaRegCircleUser />}> */}
       {/* <Button icon={<FaRegCircleUser />}> */}
       {/* <Space>
       <Space direction='vertical'>
     <div> Rajat Mehta </div>
     
     <div> Sales Manager </div>
     </Space>
     <FaRegCircleUser style={{fontSize:"1.5rem"}} />
     </Space> */}
     {/* </Button> */}
    {/* </Dropdown.Button> */}
        {/* <DownOutlined /> */}
      {/* </Space> */}
    {/* </a> */}
  </Dropdown>
    </div>
  )
}

export default CustomDropdown