import React,{useEffect, useState} from 'react'
import {Button, DatePicker, Flex, Form,Input,Modal, Select,Col,Row, notification} from 'antd'
import dayjs from 'dayjs';
import { FaPen ,FaMagnifyingGlass,FaFilter } from "react-icons/fa6";
import {salesReportSearch} from '../../../utils/validator'
import { values } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserList, setPage, setSearchFormValues, setSearchUserListData, setSearchedCurrentPage, setSelectedRowKeys, setSortingValues } from '../../../ReduxToolkit/RedXSalesReportSlice';
import moment from 'moment';

const CustomSalesReportSearch = ({setSearchFormValuesLocal,setSortingValuesLocal}) => {

    const [form]=Form.useForm();
    // const [clientReady,setClientReady]=useState(true)

    const dispatch = useDispatch()
const searchFormValues=useSelector((state)=>state.salesReportApi.searchFormValues)
const search=useSelector((state)=>state.salesReportApi.search)

console.log("searchFormValues",searchFormValues);
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
  const modifyObject=(obj,key1,value1,key2,value2)=>{
    if(key1 in obj){
      obj[key1]=value1.format('MM/DD/YYYY')

    }
    if(key2 in obj){
      obj[key2]=value2.format('MM/DD/YYYY')

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
    const finalObject=modifyObject(filteredValues,'fromDelivery',filteredValues['fromDelivery'],'toDelivery',filteredValues['toDelivery'])
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

// if(!search){dispatch(setSearchUserListData(true))};

dispatch(setSearchFormValues(values))
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

const ModifiedInitialValues=(searchFormValues)=>{


  if(searchFormValues.fromDelivery&&searchFormValues.toDelivery){
    const fromDelivery=dayjs(searchFormValues.fromDelivery);
    const toDelivery=dayjs(searchFormValues.toDelivery);

     const newFormObject={...searchFormValues,fromDelivery:fromDelivery,toDelivery:toDelivery}
     return newFormObject
      }

 else if(searchFormValues.fromDelivery){
console.log("searchFormValues-----",searchFormValues.fromDelivery)
const fromDelivery=dayjs(searchFormValues.fromDelivery);
 const newFormObject={...searchFormValues,fromDelivery:fromDelivery}
 return newFormObject
  }
  else if(searchFormValues.toDelivery){
    console.log("searchFormValues-----",searchFormValues.toDelivery)
    const toDelivery=dayjs(searchFormValues.toDelivery);
     const newFormObject={...searchFormValues,toDelivery:toDelivery}
     return newFormObject
      }
      else {
        return searchFormValues
      }
       
}

  return (
    <div  style={{margin:"0 1rem"}}>
          <Form
      layout='horizontal'
      form={form}
      // preserve={false}
      initialValues={ModifiedInitialValues(searchFormValues)}
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
        <Form.Item  name="sales_mgr"
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
          // value={searchFormValues.sales_mgr}
         placeholder='Sales Manager Reporting Number'
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
        <Form.Item name="sales_rep" 
        rules={
          [
            // {validator:salesReportSearch}
            {
              pattern: /^(?!0)\d+$/,
              message: 'Number Required',
            }
            ]}   >
          <Input 
                    // value={searchFormValues.sales_rep}

          placeholder='Sales Representative Reporting Number'
          /></Form.Item>
          </Col>
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
        <Form.Item  name="TLC" 
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
          placeholder='TLC'
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
        <Form.Item  name="hierarchy_name" 
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
          placeholder='Hierarchy Name'
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
           {/* <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
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
          </Col> */}
          <Col className="gutter-row" xs={24} sm={24} md={6} lg={6}>
        <Form.Item  name="action_status" 
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
         placeholder='Action Status'
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={12} sm={12} md={6} lg={6}>
          <Form.Item  name="fromDelivery"  >
           <DatePicker  style={{
      //  minWidth: 190,
       width:"100%"
        }}
        // onChange={(date,dateString)=>{
        //   form.setFieldsValue({
        //     fromDelivery: dateString
        // })}}
        placeholder='Delivery From'
         minDate={dayjs().subtract(14,"days")}

        maxDate={dayjs()}

        format="MM/DD/YYYY"
        value={searchFormValues['fromDelivery']?dayjs(searchFormValues['fromDelivery']):false}
        inputReadOnly

        />
        </Form.Item>
        </Col>
        <Col className="gutter-row" xs={12} sm={12} md={6} lg={6}>
         <Form.Item  name="toDelivery"  >
    <DatePicker   style={{
          // minWidth: 190,
          width:"100%"
        }} 
        placeholder='Delivery To'
        minDate={dayjs()}
        maxDate={dayjs().add(7,"day")}
        format="MM/DD/YYYY"
        value={searchFormValues['toDelivery']?dayjs(searchFormValues['toDelivery']):false}
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
          dispatch(setSearchFormValues({}));
          form.resetFields();
          setSearchFormValuesLocal({})
          
  setSortingValuesLocal({})

  dispatch(setSortingValues({}))

  dispatch(setSelectedRowKeys([]))

        }
          }>
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

export default CustomSalesReportSearch