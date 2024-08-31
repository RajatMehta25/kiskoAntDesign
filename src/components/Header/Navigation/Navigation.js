import React, { useState } from 'react'
import './Navigation.css'

import { useSelector, useDispatch } from 'react-redux'
import { navItemChange } from '../../../ReduxToolkit/navListSlice'
import { useNavigate } from "react-router-dom";

const Navigation = () => {

    // const count = useSelector((state) => state.navActiveItem.navActiveItem)
  const dispatch = useDispatch()
  const navigate = useNavigate();

     const navList=["Sales Manager Report","Sales rep"]
    const [value, setValue] = useState(0);
   
    const [index,setIndex]=useState()

 const handleClick=(i)=>{
     setIndex(i)
 }
 const handleChange = (e,val) => {
      dispatch(navItemChange(e.target.innerText))
    // console.log(e.target.innerText)
    
    // console.log(val)
    setValue(val);
 const routeName= e.target.innerText
    switch (routeName) {
      case "SALES MANAGER REPORT":
        navigate("/")

        break;
    
      default:
        navigate("/")

        break;
    }
   
  };

    return (
        <>
    {/* <div className='navContainer'>
        {navList.map((ele,i)=>(<div className={`${index==i?"focusedTab":"navList"}`} key={i} onClick={()=>handleClick(i)}>{ele}</div>))}
        
    </div> */}
    <div>
   
    </div>
    </>
  )
}

export default Navigation