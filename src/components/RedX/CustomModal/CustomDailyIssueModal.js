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
import {Flex, Form,Input,Modal, Select,Row,Col, DatePicker} from 'antd'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const CustomDailyIssueModal = ({open,onCancel,setIsModalOpen,defaultValues,onCreate}) => {

  const [form]=Form.useForm();
const reasonCodeList=useSelector((state)=>state.dailyIssueApi.reasonCodeList)
console.log("reasonCodeList",reasonCodeList)
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
        <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
          <Form.Item label="Reason Code" name="reason_code" rules={[{message:"Please select an option"}]}>
<Select 
// style={{minWidth:190}} 
// defaultValue={"no"}
>
{reasonCodeList?.map((ele)=>(<Select.Option key={ele.key} value={ele.value}>{ele.key}</Select.Option>))}


</Select >
 </Form.Item>
 </Col>
 <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
        <Form.Item label="Comment" name="comment" 
        // dependencies={['action']}
        //  rules={
        // [ ({getFieldValue})=>validateComment(getFieldValue('action')),
       
        //     ]}
            ><Input.TextArea/></Form.Item>
            </Col>
      <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
       
            <Form.Item label="Sub Applied" name="sub_applied" rules={[{message:"Please select an option"}]}>
<Select 
// style={{minWidth:190}} 
// defaultValue={"no"}
>
<Select.Option value="Yes">Yes</Select.Option>
  <Select.Option value="No">No</Select.Option>

</Select >
 </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
        <Form.Item label="Sub Code" name="sub_code" 
         dependencies={['sub_applied']}
         rules={
          [ ({getFieldValue})=>validateSubCode(getFieldValue('sub_applied')),
         
              ]}
        >
          <Input 
          
          // disabled={true}
          /></Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
        <Form.Item label="Description" name="description" 
        dependencies={['sub_applied']}
         rules={
        [ ({getFieldValue})=>validateDescription(getFieldValue('sub_applied')),
       
            ]}
            ><Input.TextArea/></Form.Item>
            </Col>
          
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
          <Form.Item label="Resolution Date" name="resolution_date"  >
           <DatePicker  style={{
      //  minWidth: 190,
       width:"100%"
        }}
        // onChange={(date,dateString)=>{
        //   form.setFieldsValue({
        //     fromDelivery: dateString
        // })}}
        placeholder='Resolution Date'
         minDate={dayjs()}

        // maxDate={dayjs()}

        format="MM/DD/YYYY"
        // value={searchFormValues['resolution_date']?dayjs(searchFormValues['resolution_date']):false}
        />
        </Form.Item>
        </Col>
          <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>
        <Form.Item label="Resolution Action Taken" name="resolution_action_taken" 
        // dependencies={['action']}
        //  rules={
        // [ ({getFieldValue})=>validateComment(getFieldValue('action')),
       
        //     ]}
            ><Input.TextArea/></Form.Item>
            </Col>
          
         
        {/* </Flex> */}
    
            </Row>
 
      </Form>

    </Modal>
  )
}

export default CustomDailyIssueModal