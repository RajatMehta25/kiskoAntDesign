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
import React from 'react'
import {Flex, Form,Input,Modal, Select,Row,Col} from 'antd'
import { setDefaultValuesForEdit } from '../../../ReduxToolkit/RedXSalesReportSlice';
import { useSelector, useDispatch } from 'react-redux';

const CustomsalesReportModal = ({open,onCancel,setIsModalOpen,defaultValues,onCreate}) => {

  const dispatch = useDispatch()

  const [form]=Form.useForm();

  const validateComment=(dependentValue)=>({
    validator:(_,value)=>{
     
     
      if(dependentValue==="completed"&&!value){
        return Promise.reject("Enter a Comment")
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
    })
    .then((v)=>{
       onCreate(v);
       form.resetFields()
           // dispatch(setDefaultValuesForEdit({}))

      })
       .catch((e)=>{
        console.log("e",e);})
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
    // dispatch(setDefaultValuesForEdit({}))

  };
  return (
    <Modal
    open={open}
    title="Update"
    onCancel={handleCancel}
    onOk={handleSubmit}
  //  style={{maxHeight:'calc(100vh-500px)',overflowY:'auto'}}
    >
      <Form
      layout='vertical'
      form={form}
      // preserve={false}
      // initialValues={{...defaultValues,action:"inProgress"}}
      initialValues={defaultValues}

      size='small'
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
      <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Customer ID" name="customer" >
          <Input 
         
          disabled={true}/></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Customer Name" name="customer_name"  >
          <Input 
          
          disabled={true}/></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Depot" name="depot"  >
          <Input
        
          disabled={true}/></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Delivery Date" name="delivery_date"  >
          <Input 
         
          disabled={true}/></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Material" name="material"  >
          <Input 
         
          disabled={true}/></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Material Description" name="material_description"  >
          <Input
         
          disabled={true}/></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
        <Form.Item label="Red X" name="red_x"  >
          <Input 
          
          disabled={true}/></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
          <Form.Item label="Action" name="action" rules={[{message:"Please select an option"}]}>
<Select 
// style={{minWidth:190}} 
// defaultValue={"no"}
>
<Select.Option value="inProgress">In Progress</Select.Option>
  <Select.Option value="completed">Completed</Select.Option>
  <Select.Option value="onHold">On Hold</Select.Option>

</Select >
 </Form.Item>
 </Col>
 <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
          <Form.Item label="AssignedTo" name="assigned_to" rules={[{message:"Please select an option"}]}>
{/* <Select 
// style={{minWidth:190}} 
// defaultValue={"no"}
disabled
>
<Select.Option />
  

</Select > */}
 <Input 
          
          disabled={true}/>
 </Form.Item>
 </Col>
 <Col className="gutter-row" xs={24} sm={24} md={12} lg={12}>
          <Form.Item label="Re-AssignedTo" name="re_assigned_to" rules={[{message:"Please select an option"}]}>
<Select 
// style={{minWidth:190}} 
// defaultValue={"no"}
// showSearch
>
<Select.Option value="a">Person A</Select.Option>
  <Select.Option value="b">Person B</Select.Option>
  <Select.Option value="c">Person B</Select.Option>

</Select >
 </Form.Item>
 </Col>
        {/* </Flex> */}
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
        <Form.Item label="Comment" name="comment" dependencies={['action']} rules={
        [ ({getFieldValue})=>validateComment(getFieldValue('action')),
        //    {
        //   pattern: /^[a-zA-Z ]*$/,
        //   message: 'Text Required',
        // }
            // {required:true,message:"Please add a comment"}
            // conditionalRequired
            ]}><Input.TextArea/></Form.Item>
            </Col>
            </Row>
 
      </Form>

    </Modal>
  )
}

export default CustomsalesReportModal