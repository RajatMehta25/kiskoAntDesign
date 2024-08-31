export const form =(values)=>{
    let errors={};
    if(!values.email){
        errors.email="email is required";
    }
    return errors;
}
  //  if (!values.email) {
        //    errors.email = 'Required';
        //  } else if (
        //    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //  ) {
        //    errors.email = 'Invalid email address';
        //  } 
   export const salesReportSearch=(value,a,b,c)=>{
    let errorFields={};
   const numberRegex=/^(?!0)\d+$/;
    // ^\d+$
console.log(value)
    // if(!values.sales_mgr){
    //     return Promise.reject("Number is required")
    // }else if(numberRegex.test(values.sales_mgr)){
    //     return Promise.reject("Number is incorrect")
    // }
   
   }

export   const checkErrorStatus=(value,dataIndex,SetErrorStatus,errorStatus,SetErrorMessage,errorMessage)=>{
    const NumberTest=/^(?!0)\d+$/
    const AlphaNumericTest=/^[a-z0-9]+$/i
    const TextTest= /^[a-zA-Z ]*$/
console.log("functionError",NumberTest.test(value))

 switch (dataIndex) {
   case "id":
     
     if(NumberTest.test(value)){
       SetErrorStatus({...errorStatus,id:false})
       SetErrorMessage({...errorMessage,id:""})

     }else{
       SetErrorStatus({...errorStatus,id:true})
       SetErrorMessage({...errorMessage,id:"Numeric Value"})

 }
     break;
   //   case "delivery_date":
   //     if(NumberTest.test(value)){
   //       SetErrorStatus({...errorStatus,delivery_date:false})
   //     }else{
   //       SetErrorStatus({...errorStatus,delivery_date:true})
   // }
   //     break;
   case "depot":
     
   if(AlphaNumericTest.test(value)){
     SetErrorStatus({...errorStatus,depot:false})
     SetErrorMessage({...errorMessage,depot:""})

   }else{
     SetErrorStatus({...errorStatus,depot:true})
     SetErrorMessage({...errorMessage,depot:"AlphaNumeric Value"})

}
   break;
   case "material":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,material:false})
     SetErrorMessage({...errorMessage,material:""})

   }else{
     SetErrorStatus({...errorStatus,material:true})
     SetErrorMessage({...errorMessage,material:"Numeric Value"})

}
   break;
   case "material_description":
     
   if(AlphaNumericTest.test(value)){
     SetErrorStatus({...errorStatus,material_description:false})
     SetErrorMessage({...errorMessage,material_description:""})

   }else{
     SetErrorStatus({...errorStatus,material_description:true})
     SetErrorMessage({...errorMessage,material_description:"AlphaNumeric Value"})

}
   break;
   case "red_x":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,red_x:false})
     SetErrorMessage({...errorMessage,red_x:""})

   }else{
     SetErrorStatus({...errorStatus,red_x:true})
     SetErrorMessage({...errorMessage,red_x:"Numeric Value"})

}
   break;
   case "total_LP1":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,total_LP1:false})
     SetErrorMessage({...errorMessage,total_LP1:""})

   }else{
     SetErrorStatus({...errorStatus,total_LP1:true})
     SetErrorMessage({...errorMessage,total_LP1:"Numeric Value"})

}
   break;
   case "stock_on_hand":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,stock_on_hand:false})
     SetErrorMessage({...errorMessage,stock_on_hand:""})

   }else{
     SetErrorStatus({...errorStatus,stock_on_hand:true})
     SetErrorMessage({...errorMessage,stock_on_hand:"Numeric Value"})

}
   break;
   case "purchasing_group":
     
   if(AlphaNumericTest.test(value)){
     SetErrorStatus({...errorStatus,purchasing_group:false})
     SetErrorMessage({...errorMessage,purchasing_group:""})

   }else{
     SetErrorStatus({...errorStatus,purchasing_group:true})
     SetErrorMessage({...errorMessage,purchasing_group:"AlphaNumeric Value"})

}
   break;
   case "MMPP_status":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,MMPP_status:false})
     SetErrorMessage({...errorMessage,MMPP_status:""})

   }else{
     SetErrorStatus({...errorStatus,MMPP_status:true})
     SetErrorMessage({...errorMessage,MMPP_status:"Numeric Value"})

}
   break;
   case "sales_status":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,sales_status:false})
     SetErrorMessage({...errorMessage,sales_status:""})

   }else{
     SetErrorStatus({...errorStatus,sales_status:true})
     SetErrorMessage({...errorMessage,sales_status:"Numeric Value"})

}
   break;
   case "material_group":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,material_group:false})
     SetErrorMessage({...errorMessage,material_group:""})

   }else{
     SetErrorStatus({...errorStatus,material_group:true})
     SetErrorMessage({...errorMessage,material_group:"Numeric Value"})

}
   break;
   case "hierarchy":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,hierarchy:false})
     SetErrorMessage({...errorMessage,hierarchy:""})

   }else{
     SetErrorStatus({...errorStatus,hierarchy:true})
     SetErrorMessage({...errorMessage,hierarchy:"Numeric Value"})

}
   break;
   case "hierarchy_name":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,hierarchy_name:false})
     SetErrorMessage({...errorMessage,hierarchy_name:""})

   }else{
     SetErrorStatus({...errorStatus,hierarchy_name:true})
     SetErrorMessage({...errorMessage,hierarchy_name:"Text Value"})

}
   break;
   case "customer":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,customer:false})
     SetErrorMessage({...errorMessage,customer:""})

   }else{
     SetErrorStatus({...errorStatus,customer:true})
     SetErrorMessage({...errorMessage,customer:"Numeric Value"})

}
   break;
   case "customer_name":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,customer_name:false})
     SetErrorMessage({...errorMessage,customer_name:""})

   }else{
     SetErrorStatus({...errorStatus,customer_name:true})
     SetErrorMessage({...errorMessage,customer_name:"Text Value"})

}
   break;
   case "order_number":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,order_number:false})
     SetErrorMessage({...errorMessage,order_number:""})

   }else{
     SetErrorStatus({...errorStatus,order_number:true})
     SetErrorMessage({...errorMessage,order_number:"Numeric Value"})

}
   break;
   case "MGC":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,MGC:false})
     SetErrorMessage({...errorMessage,MGC:""})

   }else{
     SetErrorStatus({...errorStatus,MGC:true})
     SetErrorMessage({...errorMessage,MGC:"Text Value"})

}
   break;
   case "TLC":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,TLC:false})
     SetErrorMessage({...errorMessage,TLC:""})

   }else{
     SetErrorStatus({...errorStatus,TLC:true})
     SetErrorMessage({...errorMessage,TLC:"Text Value"})

}
   break;
   case "postal_code":
     
   if(AlphaNumericTest.test(value)){
     SetErrorStatus({...errorStatus,postal_code:false})
     SetErrorMessage({...errorMessage,postal_code:""})

   }else{
     SetErrorStatus({...errorStatus,postal_code:true})
     SetErrorMessage({...errorMessage,postal_code:"AlphaNumeric Value"})

}
   break;
   case "Mini_group":
     
   if(AlphaNumericTest.test(value)){
     SetErrorStatus({...errorStatus,Mini_group:false})
     SetErrorMessage({...errorMessage,Mini_group:""})

   }else{
     SetErrorStatus({...errorStatus,Mini_group:true})
     SetErrorMessage({...errorMessage,Mini_group:"AlphaNumeric Value"})

}
   break;
   case "sales_rep":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,sales_rep:false})
     SetErrorMessage({...errorMessage,sales_rep:""})

   }else{
     SetErrorStatus({...errorStatus,sales_rep:true})
     SetErrorMessage({...errorMessage,sales_rep:"Numeric Value"})

}
   break;
   case "sales_rep_name":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,sales_rep_name:false})
     SetErrorMessage({...errorMessage,sales_rep_name:""})

   }else{
     SetErrorStatus({...errorStatus,sales_rep_name:true})
     SetErrorMessage({...errorMessage,sales_rep_name:"Text Value"})

}
   break;
   case "sales_mgr":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,sales_mgr:false})
     SetErrorMessage({...errorMessage,sales_mgr:""})

   }else{
     SetErrorStatus({...errorStatus,sales_mgr:true})
     SetErrorMessage({...errorMessage,sales_mgr:"Numeric Value"})

}
   break;
   case "Sales_mgr_name":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,Sales_mgr_name:false})
     SetErrorMessage({...errorMessage,Sales_mgr_name:""})

   }else{
     SetErrorStatus({...errorStatus,Sales_mgr_name:true})
     SetErrorMessage({...errorMessage,Sales_mgr_name:"Text Value"})

}
   break;
   case "comments":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,comments:false})
     SetErrorMessage({...errorMessage,comments:""})

   }else{
     SetErrorStatus({...errorStatus,comments:true})
     SetErrorMessage({...errorMessage,comments:"Text Value"})

}
   break;
   case "insert_by":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,insert_by:false})
     SetErrorMessage({...errorMessage,insert_by:""})

   }else{
     SetErrorStatus({...errorStatus,insert_by:true})
     SetErrorMessage({...errorMessage,insert_by:"Text Value"})

}
   break;
   case "update_by":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,update_by:false})
     SetErrorMessage({...errorMessage,update_by:""})

   }else{
     SetErrorStatus({...errorStatus,update_by:true})
     SetErrorMessage({...errorMessage,update_by:"Text Value"})

}
   break;
   case "assigned_to":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,assigned_to:false})
     SetErrorMessage({...errorMessage,assigned_to:""})

   }else{
     SetErrorStatus({...errorStatus,assigned_to:true})
     SetErrorMessage({...errorMessage,assigned_to:"Text Value"})

}
   break;
   case "re_assigned_to":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,re_assigned_to:false})
     SetErrorMessage({...errorMessage,re_assigned_to:""})

   }else{
     SetErrorStatus({...errorStatus,re_assigned_to:true})
     SetErrorMessage({...errorMessage,re_assigned_to:"Text Value"})

}
   break;
   case "action_status":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,action_status:false})
     SetErrorMessage({...errorMessage,action_status:""})

   }else{
     SetErrorStatus({...errorStatus,action_status:true})
     SetErrorMessage({...errorMessage,action_status:"Text Value"})

}
   break;


   // Daily Issue Report

   case "product_code":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,product_code:false})
     SetErrorMessage({...errorMessage,product_code:""})

   }else{
     SetErrorStatus({...errorStatus,product_code:true})
     SetErrorMessage({...errorMessage,product_code:"Numeric Value"})

}
   break;
   case "product_description":
     
   if(AlphaNumericTest.test(value)){
     SetErrorStatus({...errorStatus,product_description:false})
     SetErrorMessage({...errorMessage,product_description:""})

   }else{
     SetErrorStatus({...errorStatus,product_description:true})
     SetErrorMessage({...errorMessage,product_description:"AlphaNumeric Value"})

}
   break;
   case "hierarchy_number":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,hierarchy_number:false})
     SetErrorMessage({...errorMessage,hierarchy_number:""})

   }else{
     SetErrorStatus({...errorStatus,product_description:true})
     SetErrorMessage({...errorMessage,hierarchy_number:"Numeric Value"})

}
   break;
   case "customer_number":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,customer_number:false})
     SetErrorMessage({...errorMessage,customer_number:""})

   }else{
     SetErrorStatus({...errorStatus,customer_number:true})
     SetErrorMessage({...errorMessage,customer_number:"Numeric Value"})

}
   break;
   case "sc":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,sc:false})
     SetErrorMessage({...errorMessage,sc:""})

   }else{
     SetErrorStatus({...errorStatus,sc:true})
     SetErrorMessage({...errorMessage,sc:"Text Value"})

}
   break;
   case "temperature":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,temperature:false})
     SetErrorMessage({...errorMessage,temperature:""})

   }else{
     SetErrorStatus({...errorStatus,temperature:true})
     SetErrorMessage({...errorMessage,temperature:"Text Value"})

}
   break;
   case "vendor_code":
     
   if(NumberTest.test(value)){
     SetErrorStatus({...errorStatus,vendor_code:false})
     SetErrorMessage({...errorMessage,vendor_code:""})

   }else{
     SetErrorStatus({...errorStatus,vendor_code:true})
     SetErrorMessage({...errorMessage,vendor_code:"Numeric Value"})

}
   break;
   case "vendor_name":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,vendor_name:false})
     SetErrorMessage({...errorMessage,vendor_name:""})

   }else{
     SetErrorStatus({...errorStatus,vendor_name:true})
     SetErrorMessage({...errorMessage,vendor_name:"Text Value"})

}
   break;
   case "upg":
     
   if(AlphaNumericTest.test(value)){
     SetErrorStatus({...errorStatus,upg:false})
     SetErrorMessage({...errorMessage,upg:""})

   }else{
     SetErrorStatus({...errorStatus,upg:true})
     SetErrorMessage({...errorMessage,upg:"AlphaNumeric Value"})

}
   break;
   case "comm_team":
     
   if(TextTest.test(value)){
     SetErrorStatus({...errorStatus,comm_team:false})
     SetErrorMessage({...errorMessage,comm_team:""})

   }else{
     SetErrorStatus({...errorStatus,comm_team:true})
     SetErrorMessage({...errorMessage,comm_team:"Text Value"})

}
   break;
   default:
     break;
 }
}