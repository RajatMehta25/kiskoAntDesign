import {useEffect, useState} from "react"
import logo from './logo.svg';
import './App.css';
import Routes from "./Routes/index";
import { useSelector, useDispatch } from 'react-redux'
import AuthProvider from "./authContext/AuthProvider";
function App() {
  // const [user, setUser] = useState({ loggedIn: false, name: "ABC" });
  // localStorage.setItem("lastname", "Smith");
// const user1= localStorage.getItem("user1");
  // const user = useSelector((state) => state.user)

  // const [userIn,setUser]=useState(false)
  // useEffect(() => {
  //  setUser(localStorage.getItem("user"))
  // },[])
  // return <Routes user={user} />;
  // return <AuthContext><Routes user={userIn} setUser={setUser} /></AuthContext>;

  return <AuthProvider><Routes /></AuthProvider>;


    // return <Layout user={user} children={Routes} />;
  // return (
  //   <div className="App">
  //   Jai Hanuman , Jai Shree Ram
 
  //   </div>
  // );
}

export default App;
