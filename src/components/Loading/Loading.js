import { Skeleton, Table } from 'antd'
import React from 'react'
import "./Loading.css"
import SkeletonInput from 'antd/es/skeleton/Input'
const Loading = () => {
  return (

    <div>
        {/* <Skeleton paragraph={{rows:10}} active>
        </Skeleton> */}
        {/* <div className='LoadingInputRow'>{Array(10).fill(null).map((ele)=><SkeletonInput active/>)}</div> */}
         {/* <div className='LoadingTable'> */}
           
            <Skeleton paragraph={{rows:12}} active/>
         {/* </div> */}
         
    </div>
  )
}
 
export default Loading