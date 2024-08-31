import React,{useEffect, useState} from 'react'
import {Button, DatePicker, Flex, Form,Input,Modal, Select,Col,Row, notification} from 'antd'
import dayjs from 'dayjs';
import { FaPen ,FaMagnifyingGlass,FaFilter } from "react-icons/fa6";
import {salesReportSearch} from '../../../utils/validator'
import { values } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserList, setPage, setSearchDailyIssue, setSearchDailyIssueFormValues, setSearchFormValues, setSearchUserListData, setSearchedCurrentPage, setSelectedRowKeys, setSortingValues } from '../../../ReduxToolkit/RedXDailyIssueReportSlice';

const CustomDailyIssueSearch = ({setSearchFormValuesLocal,setSortingValuesLocal}) => {

    const [form]=Form.useForm();
    // const [clientReady,setClientReady]=useState(true)

    const dispatch = useDispatch()
const searchDailyIssueFormValues=useSelector((state)=>state.dailyIssueApi.searchDailyIssueFormValues)
// const searchDailyIssue=useSelector((state)=>state.dailyIssueApi.searchDailyIssue)

console.log("searchFormValues",searchDailyIssueFormValues);
    // const data=!Object.keys(form.getFieldValue()).length
    // console.log("ddddddddddd",data);
const handleSubmit =(e)=>{
    // e.preventDefault();
    form.validateFields((err,values)=>{
       console.log("erorrrrr",err)
      // console.log("modallll",values);
      // if(!err){
      //   onCreate(values);
      //   form.resetFields()
      // }
    }).then((v)=>{ 
        // onCreate(v);
        console.log(v)
        // form.resetFields()
    }).catch((e)=>{console.log("e",e);})
  }

  const handleCancel = () => {
    // setIsModalOpen(false);
    form.resetFields()
  };
  const modifyObject=(obj,key1,value1)=>{
    if(key1 in obj){
      obj[key1]=value1.format('MM/DD/YYYY')
    }
    
    return obj
  }
  const onFinish = (fieldsValue) => {
    const filteredValues=Object.keys(fieldsValue).reduce((acc,key)=>{
      if(fieldsValue[key]){
        acc[key]=fieldsValue[key]
      }
      return acc;
    },{})
    const finalObject=modifyObject(filteredValues,'date',filteredValues['date'])
    const values = {
      ...finalObject
      // ['fromDelivery']:filteredValues.hasOwnProperty('fromDelivery')?filteredValues['fromDelivery'].format('YYYY-MM-DD'):filteredValues['fromDelivery'],
      // ['toDelivery']:filteredValues.hasOwnProperty('toDelivery')?filteredValues['toDelivery'].format('YYYY-MM-DD'):filteredValues['toDelivery']
      // 'fromDelivery': fieldsValue['fromDelivery'].format('YYYY-MM-DD'),
      // 'toDelivery': fieldsValue['toDelivery'].format('YYYY-MM-DD')
    }
    console.log('Success:', values);
    
    // alert(JSON.stringify(values))

// dispatch(searchUserList({page:currentPage,pageSize}))

// if(!searchDailyIssue){dispatch(setSearchDailyIssue(true))};

dispatch(setSearchDailyIssueFormValues(values))
// notification.open({
//   message: `Filtered Data`,
//   // description:  ``,
//   placement:'topRight',
//   // icon:<div>dilbar</div>,
  
//   type:'success'
// })

    // form.resetFields()
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const ModifiedInitialValues=(searchDailyIssueFormValues)=>{


    
   if(searchDailyIssueFormValues.date){
  console.log("searchFormValues-----",searchDailyIssueFormValues.date)
  const date=dayjs(searchDailyIssueFormValues.date);
   const newFormObject={...searchDailyIssueFormValues,date:date}
   return newFormObject
   }
        else {
          return searchDailyIssueFormValues
        }
         
  }


  return (
    <div  style={{margin:"0 1rem"}}>
          <Form
      layout='horizontal'
      form={form}
      // preserve={false}
      initialValues={ModifiedInitialValues(searchDailyIssueFormValues)}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    size='small'
      >
        {/* <Flex wrap justify='center' align='center' gap={16} > */}
        <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
     justify="center"
     align="center"
    >
   
        
         
   <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
        <Form.Item name="depot"
        rules={
          [
            // {validator:salesReportSearch}
            {
              pattern: /^[a-z0-9]+$/i,
              message: 'AlphaNumeric Value Required',
            }
            ]}  
        >
          <Input

         placeholder='Depot'
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
        <Form.Item  name="product_code" 
        rules={
          [
            // {validator:salesReportSearch}
            {
              pattern: /^(?!0)\d+$/,
              message: 'Number Required',
            }
            ]}  
        >
          <Input
         placeholder='Product Code'
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
        <Form.Item  name="reason_code" 
        rules={
          [
            // {validator:salesReportSearch}
            {
              pattern: /^[a-zA-Z ]*$/,
              message: 'Text Required',
            }
            ]}  
        >
          <Input
         placeholder='Reason Code'
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
        <Form.Item  name="customer_name" 
        rules={
          [
            // {validator:salesReportSearch}
            {
              pattern: /^[a-zA-Z ]*$/,
              message: 'Text Required',
            }
            ]}  
        >
          <Input
         placeholder='Customer Name'
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
          <Form.Item  name="date"  >
           <DatePicker  style={{
      //  minWidth: 190,
       width:"100%"
        }}
        // onChange={(date,dateString)=>{
        //   form.setFieldsValue({
        //     fromDelivery: dateString
        // })}}
        placeholder='Date'
         minDate={dayjs().subtract(42,"days")}
        maxDate={dayjs()}
        format="MM/DD/YYYY"
        value={searchDailyIssueFormValues['toDelivery']?dayjs(searchDailyIssueFormValues['toDelivery']):false}
        inputReadOnly

        />
        </Form.Item>
        </Col>
       
        <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
        
        <Form.Item  shouldUpdate >
          {()=>(
        <Button  style={{
        // minWidth: 190,
        width:"100%"
        }}  type="primary" icon={<FaMagnifyingGlass/>} htmlType="submit"
        disabled={Object.values(form.getFieldsValue()).every((val)=>!val)}
        //  disabled={ !!form.getFieldsError().filter(({ errors }) => errors.length).length || !Object.keys(form.getFieldValue()).length}
         >
        Search
      </Button>
          )
}
         </Form.Item>
         </Col>
         <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
         <Form.Item   >
        <Button  style={{
      // minWidth: 190,
      width:"100%"
        }}  type="primary" icon={<FaFilter/>} onClick={()=>{
          dispatch(setSearchDailyIssueFormValues({}));
          form.resetFields();
          setSearchFormValuesLocal({})
          setSortingValuesLocal({})

  dispatch(setSortingValues({}))

  dispatch(setSelectedRowKeys([]))

          }}>
        Clear Filters
      </Button>
         </Form.Item>
         
         
         </Col>
         </Row>
        {/* </Flex> */}
       
      </Form>
    </div>
  )
}

export default CustomDailyIssueSearch