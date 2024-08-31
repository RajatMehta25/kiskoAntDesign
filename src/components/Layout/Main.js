import React, { Suspense, useContext, useEffect, useState } from "react";
import Breadcrum from "../Header/Breadcrum/Breadcrum";
import Navigation from "../Header/Navigation/Navigation";
import "./Main.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import syscoLogo from "../../img/sysco.svg";
import { MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Tabs,
  Space,
  ConfigProvider,
  Tooltip,
  createTheme,
  ThemeProvider,
  Switch,
  message,
} from "antd";
import { navItemChange } from "../../ReduxToolkit/navListSlice";
import { FaPowerOff, FaRegCircleUser, FaHouse, FaUserGear, FaX, FaFileLines, FaFolder, FaMoon } from "react-icons/fa6";
import { Footer } from "antd/es/layout/layout";
import AuthProvider from "../../authContext/AuthProvider";
import { AuthContext } from "../../authContext/AuthContext";
import Loading from "../Loading/Loading";
import rajat from "../../img/images.png";

const { Header, Sider, Content } = Layout;

const Main = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const [finalMenu, setFinalMenu] = useState([]);
  useEffect(() => {
    const Menu = generateSideMenu();
    setFinalMenu(Menu);
  }, [user]);

  // const myTheme=createTheme({
  //   components:{
  //     Menu:{
  //       Submenu:{
  //         backgroundColor:"#2A2F33"
  //       }
  //     }
  //   }
  // })
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeItem = useSelector((state) => state.navActiveItem.activeItem);
  const [activePage, setActivePage] = useState("/Home");
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  console.log(children);
  // useEffect(() => {
  //  setActivePage(window.location.pathname)
  // }, [window.location.pathname])
  // console.log("activePagw",activePage)
  const AllMenuItems = [
    ,
    // {
    //   key: "/Home",
    //   icon: <FaHouse />,
    //   label: <NavLink to="/Home">Home</NavLink>,
    // },
    {
      key: "/Admin",
      icon: <FaUserGear />,
      label: <NavLink to="/Admin">Admin</NavLink>,
    },

    {
      key: "/Redx",
      label: "Red X",
      icon: <FaFolder />,

      children: [
        {
          key: "/RedXSalesReport",
          icon: <FaFileLines />,
          label: <NavLink to="/RedXSalesReport">Sales Report</NavLink>,
        },
        {
          key: "/RedXDailyIssueReport",
          icon: <FaFileLines />,
          label: <NavLink to="/RedXDailyIssueReport">Daily Issue Report</NavLink>,
        },
      ],
    },
  ];
  const generateSideMenu = () => {
    const ExtractMenuArray = user?.Modules_Screens;
    const MenuList = AllMenuItems.filter((ele) => ExtractMenuArray.includes(ele.key.slice(1)));
    console.log(
      "hjzjzjj",
      AllMenuItems.filter((ele) => ExtractMenuArray.includes(ele.key.slice(1)))
    );

    // console.log("meulist", MenuList);
    return MenuList;
  };
  console.log(finalMenu);

  return (
    // <div className='mainContainer'>
    // <Breadcrum />
    // {/* <Navigation /> */}
    // <div style={{display:"flex",flex:"1"}} >{children}</div>
    // </div>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#008CD2",
          colorLink: "#008CD2",

          // colorError:"#008CD2"
          // colorText:"pink",
        },

        // components: {
        //   Menu: {
        //     Submenu:{
        //     backgroundColor:"#008CD2"
        //     }
        //   },

        // },
      }}
    >
      <div className="mainContainer">
        <Layout className={darkMode ? "SiderDark" : "SiderLight"}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={0}
            // style={{
            //   // backgroundColor:"#1B4F72"
            //   display: "flex",
            //   flexDirection: "column",
            // }}
            // theme="light"
          >
            <div
              className="demo-logo-vertical"
              // style={{color:"#fff",textAlign:"center"}}
            >
              <Space>
                <Space direction="vertical">
                  {/* <img src={syscoLogo} width="100px" height="50px" /> */}
                  <img src={rajat} width="100px" height="50px" />

                  <FaRegCircleUser style={{ fontSize: "2rem", marginTop: "1rem" }} />

                  <div> {user.name} </div>

                  <div className="logoutButtonDiv">
                    {" "}
                    <Tooltip title="Logout">
                      <Button
                        type="text"
                        shape="circle"
                        icon={
                          <FaPowerOff
                            style={{ color: "red" }}
                            onClick={() => {
                              localStorage.removeItem("user");
                              setUser({ ...user, logIn: false });
                              navigate("/");
                            }}
                          />
                        }
                      />
                    </Tooltip>
                    {user.Role}
                  </div>
                </Space>
              </Space>
            </div>
            <Menu
              // className="customMenuDark"
              // theme='light'
              // theme="dark"
              // style={{
              //   backgroundColor:"#1B4F72"
              // }}
              //   theme={{
              //   color:"#ffffff",
              //  backgroundColor:"#1B4F72",

              // }}

              mode="inline"
              // defaultSelectedKeys={[window.location.pathname]}
              selectedKeys={[window.location.pathname]}
              items={[
                {
                  key: "/Home",
                  icon: <FaHouse />,
                  label: <NavLink to="/Home">Home</NavLink>,
                },
                ...finalMenu,
              ]}
              // items={
              //   // UserScreens.map((ele)=>{}
              //   [
              //     {
              //       key: "/Home",
              //       icon: <FaHouse />,
              //       label: <NavLink to="/Home">Home</NavLink>,
              //       // onClick:()=>dispatch(navItemChange("Sales Report")),
              //     },
              //     // {
              //     //   key: '/Admin',
              //     //   icon: <FaUserGear />,
              //     //   label: (<NavLink to="/Admin" >Admin</NavLink>),

              //     // },
              //     {
              //       key: "1",
              //       label: "Red X",
              //       icon: <FaFolder />,
              //       // theme:{
              //       //   defaultConfig: {
              //       //     token: {
              //       //       backgroundColor:"#ffffff"
              //       //     }
              //       //   }
              //       // },
              //       children: [
              //         {
              //           key: "/RedXSalesReport",
              //           icon: <FaFileLines />,
              //           label: <NavLink to="/RedXSalesReport">Sales Report</NavLink>,

              //           // onClick:()=>dispatch(navItemChange("Sales Report")),
              //           // children: [
              //           //   {
              //           //     key: 'Sales Report',
              //           //     label: (<NavLink to="/RedXSalesReport">Sales Report</NavLink>),
              //           //     onClick:()=>dispatch(navItemChange("Sales Report"))
              //           //   },
              //           //   {
              //           //     key: 'Daily Issue Report',
              //           //     label: (<NavLink to="/RedXDailyIssueReport">Daily Issue Report</NavLink>),
              //           //     onClick:()=>dispatch(navItemChange("Daily Issue Report"))

              //           //   },
              //           // ],
              //         },
              //         {
              //           key: "/RedXDailyIssueReport",
              //           icon: <FaFileLines />,
              //           label: <NavLink to="/RedXDailyIssueReport">Daily Issue Report</NavLink>,
              //           // onClick:()=>dispatch(navItemChange("Daily Issue Report"))
              //         },
              //       ],
              //     },
              //   ]
              // }
            />
            {/* <Button onClick={()=>setDarkMode(!darkMode)}>Toggle</Button> */}

            <div className="darkModeDiv">
              <Switch checkedChildren={`Dark Mode`} unCheckedChildren="Light Mode" onChange={() => setDarkMode(!darkMode)} />
            </div>
          </Sider>

          <Layout>
            <Header
              style={{
                padding: 0,
                background: darkMode ? "black" : colorBgContainer,
                // background: colorBgContainer,

                display: "flex",
                // flexWrap:"wrap",
                // alignItems:"center",
              }}
            >
              <Button
                type="text"
                draggable
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                  color: darkMode ? "#fff" : "inherit",
                }}
              />
              <Breadcrum darkMode={darkMode} />
              {/* abc */}
            </Header>

            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                background: darkMode ? "black" : colorBgContainer,
                // background: colorBgContainer,

                borderRadius: borderRadiusLG,
              }}
            >
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </Content>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default Main;
