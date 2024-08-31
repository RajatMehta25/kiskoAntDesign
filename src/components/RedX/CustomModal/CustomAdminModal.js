// import React from 'react'
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';


// const CustomModal = ({open,close,content}) => {
//   const handleClose = () => close(false);

//   return (
//     <div>
//         <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
        
//       >
//         <div style={{display:"flex",justifyContent:"space-between"}}><DialogTitle id="alert-dialog-title">
//           {"Update Data"}
        
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={handleClose}>Close</Button>
          
          
//         </DialogActions>
//         </div>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//            {content}
//           </DialogContentText>
//         </DialogContent>
      
//       </Dialog>
//     </div>
//   )
// }

// export default CustomModal
import React ,{useState} from 'react'
import {Flex, Form,Input,Modal, Select,Row,Col, DatePicker} from 'antd'
import dayjs from 'dayjs';
import { TreeSelect } from 'antd';


const CustomAdminModal = ({open,onCancel,setIsModalOpen,defaultValues,onCreate}) => {

  const [form]=Form.useForm();

  const validateSubCode=(dependentValue)=>({
    validator:(_,value)=>{
     
     
      if(dependentValue==="Yes"&&!value){
        return Promise.reject("Enter a Sub Code ")
      }
      return Promise.resolve()
    }
  })
  const validateDescription=(dependentValue)=>({
    validator:(_,value)=>{
     
     
      if(dependentValue==="Yes"&&!value){
        return Promise.reject("Enter a Description")
      }
      return Promise.resolve()
    }
  })

  // console.log("fieldvaluesss",FieldValues)

  // const onCreate = (values) =>{
  //   console.log("modal values",values)
  //   setIsModalOpen(false)
  //   form.resetFields()
  // }

  const handleSubmit =(e)=>{
    e.preventDefault();
    form.validateFields((err,values)=>{
       console.log("erorrrrr",err)
      // console.log("modallll",values);
      // if(!err){
      //   onCreate(values);
      //   form.resetFields()
      // }
    }).then((v)=>{ onCreate(v);form.resetFields()}).catch((e)=>{console.log("e",e);})
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };
  const treeData = [
    {
      value: 'RedX',
      title: 'RedX',
      children: [
        {
          value: 'redx_sales_report',
          title: 'Sales Report',
        //   children: [
        //     {
        //       value: 'read',
        //       title: 'read',
        //     },
        //     {
        //       value: 'write',
        //       title: 'write',
        //     },
        //   ],
        },
        {
          value: 'redx_daily_issue_report',
          title: 'Daily Issue Report',
        //   children: [
        //     {
        //       value: 'sss',
        //       title: (
        //         <b
        //           style={{
        //             color: '#08c',
        //           }}
        //         >
        //           sss
        //         </b>
        //       ),
        //     },
        //   ],
        },
      ],
    },
    {
        value: 'Staff Sales',
        title: 'staff_sales',
        children: [
          {
            value: 'demo report 1',
            title: 'demo report 1',
          //   children: [
          //     {
          //       value: 'leaf1',
          //       title: 'my leaf',
          //     },
          //     {
          //       value: 'leaf2',
          //       title: 'your leaf',
          //     },
          //   ],
          },
          {
            value: 'demo report 2',
            title: 'demo report 2',
          //   children: [
          //     {
          //       value: 'sss',
          //       title: (
          //         <b
          //           style={{
          //             color: '#08c',
          //           }}
          //         >
          //           sss
          //         </b>
          //       ),
          //     },
          //   ],
          },
        ],
      },
      {
        value:"admin",
        title:"Admin"
      }
  ];
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Modal
    open={open}
    title="Add"
    onCancel={handleCancel}
    onOk={handleSubmit}
    maskClosable={false}
  //  style={{maxHeight:'calc(100vh-500px)',overflowY:'auto'}}
    >
      <Form
      layout='vertical'
      form={form}
      // preserve={false}
      // initialValues={{...defaultValues,action:"inProgress"}}
      initialValues={defaultValues}

      
      >
        {/* <Flex wrap justify='space-around' align='center'> */}
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
           <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
        <Form.Item label="User" name="user" 
        //  dependencies={['sub_applied']}
        //  rules={
        //   [ ({getFieldValue})=>validateSubCode(getFieldValue('sub_applied')),
         
        //       ]}
        >
          <Input 
          
          // disabled={true}
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
        <Form.Item label="Use Case" name="use_case" 
        //  dependencies={['sub_applied']}
        //  rules={
        //   [ ({getFieldValue})=>validateSubCode(getFieldValue('sub_applied')),
         
        //       ]}
        >
          {/* <TreeSelect
          treeCheckStrictly={false}
          treeCheckable
          showCheckedStrategy={TreeSelect.SHOW_CHILD}
      showSearch
      style={{
        width: '100%',
      }}
    //   value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder="Please select"
      allowClear
    //   multiple
    //   treeDefaultExpandAll
    //   onChange={onChange}
      treeData={treeData}
    /> */}
    <Select 
    mode='multiple'
    onChange={handleChange}
    options={[{label:'Redx',value:'Redx'},{label:'Staff Sales',value:'Staff Sales'},{label:'Vim',value:'Vim'},{label:'Admin',value:'Admin'}]}
    //  options={[
    //   {
    //     label: <span>manager</span>,
    //     title: 'manager',
    //     value:'RedX',
       
    //     options: [
    //       {
    //         label: <span>Jack</span>,
    //         value: 'Jack',
    //       },
    //       {
    //         label: <span>Lucy</span>,
    //         value: 'Lucy',
    //       },
    //     ],
    //   },
    //   {
    //     label: <span>engineer</span>,
    //     title: 'engineer',
    //     options: [
    //       {
    //         label: <span>Chloe</span>,
    //         value: 'Chloe',
    //       },
    //       {
    //         label: <span>Lucas</span>,
    //         value: 'Lucas',
    //       },
    //     ],
    //   },
    // ]}
     />
          </Form.Item>
          </Col>
 <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
        <Form.Item label="Module Access" name="modules_screens" 
        //  dependencies={['sub_applied']}
        //  rules={
        //   [ ({getFieldValue})=>validateSubCode(getFieldValue('sub_applied')),
         
        //       ]}
        >
          {/* <TreeSelect
          treeCheckStrictly={false}
          treeCheckable
          showCheckedStrategy={TreeSelect.SHOW_CHILD}
      showSearch
      style={{
        width: '100%',
      }}
    //   value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder="Please select"
      allowClear
    //   multiple
    //   treeDefaultExpandAll
    //   onChange={onChange}
      treeData={treeData}
    /> */}
    <Select 
    mode='multiple'
    onChange={handleChange}
    options={[{label:'Redx Sales Report',value:'redx_sales_rep'},{label:'Redx Daily Issue Report',value:'redx_daily_issue_report'}]}
    //  options={[
    //   {
    //     label: <span>manager</span>,
    //     title: 'manager',
    //     value:'RedX',
       
    //     options: [
    //       {
    //         label: <span>Jack</span>,
    //         value: 'Jack',
    //       },
    //       {
    //         label: <span>Lucy</span>,
    //         value: 'Lucy',
    //       },
    //     ],
    //   },
    //   {
    //     label: <span>engineer</span>,
    //     title: 'engineer',
    //     options: [
    //       {
    //         label: <span>Chloe</span>,
    //         value: 'Chloe',
    //       },
    //       {
    //         label: <span>Lucas</span>,
    //         value: 'Lucas',
    //       },
    //     ],
    //   },
    // ]}
     />
          </Form.Item>
          </Col>

       
 
      
       
         
          
         
         
         
        {/* </Flex> */}
    
            </Row>
 
      </Form>

    </Modal>
  )
}

export default CustomAdminModal