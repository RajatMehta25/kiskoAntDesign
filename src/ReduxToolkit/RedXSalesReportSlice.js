import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { RedXData } from '../components/RedX/SalesReport/RedXData'
import axios from 'axios';

// export const fetchUserList = createAsyncThunk('fetchUserList', async ({page,pageSize}) => {
//   const response = await fetch(`http://localhost:5000/usersGet?page=${page}&pageSize=${pageSize}`)
//   return response.json()
// },
// )
export const fetchUserList = createAsyncThunk('fetchUserList', async ({page,pageSize,sortingValues},{getState}) => {
  const sortString = new URLSearchParams(sortingValues).toString();
  if(Object.values(sortingValues).length>0)
    {
      const check=`${process.env.REACT_APP_BASE_URL}`+ `app_redx/view_sales_report/?sort_by`+ sortString
    console.log("check",check) }
    else{
       const check=`${process.env.REACT_APP_BASE_URL}`+`app_redx/view_sales_report/`
    }
  // const response = await fetch(`http://localhost:5000/usersGet`)
    // const data=  setTimeout(() => {
       
    // }, 1000);
    
    // return RedXData.slice(0,100)

// const state=getState().salesManagerApi;
// if(state.cache[page]){
//     return {cacheHit:true,page};
// }

    let data
  if(page===1){
    data= await new Promise (resolve=>setTimeout(resolve(RedXData.slice(0,10)),4000))
        // data= await new Promise (reject=>setTimeout(reject("Eroorrrrrrr"),4000))


  }else{
    data= await new Promise (resolve=>setTimeout(resolve(RedXData.slice(10,20)),3000))

  }
    // setTimeout(() => {}, 3000); 
    console.log("curreeeenttt",pageSize)
    console.log("curreeeenttt",page)
   return {
        list:data,
        total:2300,
        page,
        pageSize,
        cacheHit:false,
        search:false,
    }
  // return Promise.reject("yeyyeyeyyey")
  },
  )
  export const searchUserList = createAsyncThunk('searchUserList', async ({page,pageSize,searchFormValues,sortingValues},{getState}) => {
    const searchString = new URLSearchParams(searchFormValues).toString();
    const sortString = new URLSearchParams(sortingValues).toString();

    const check=`http://localhost:5000/usersGet/`+ searchString +'/'+ sortString
    console.log("check",check)
    // const response = await fetch(`http://localhost:5000/usersGet`)
    // const data=  setTimeout(() => {
       
    // }, 1000);
    
    // return RedXData.slice(0,100)

// const state=getState().salesManagerApi;
// if(state.cache[page]){
//     return {cacheHit:true,page};
// }
console.log("apiSearchhhhhh",searchFormValues)

    let data
  if(page===1){
    data= await new Promise (resolve=>setTimeout(resolve(RedXData.slice(20,30)),3000))

  }else{
    data= await new Promise (resolve=>setTimeout(resolve(RedXData.slice(30,40)),3000))

  }
    // setTimeout(() => {}, 3000); 
    console.log("curreeeenttt",pageSize)
    console.log("curreeeenttt",page)
   return {
        list:data,
        total:200,
        page,
        pageSize,
        cacheHit:false,
        search:true,
    }
  },
  )

export const postUserList = createAsyncThunk('postUserList', async (data) => {
const response = await fetch(`http://localhost:5000/usersPost`, {
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
});
return response.json()
}
)
export const deleteUserRecord = createAsyncThunk('deleteUserRecord', async (id) => {
const response = await fetch(`http://localhost:5000/usersDelete/${id}`, {
    method:'DELETE',
    headers:{
        "Content-Type":"application/json"
    }
});
return response.json()
}
)
export const updateUserRecord = createAsyncThunk('updateUserRecord', async (data) => {
const response = await fetch(`http://localhost:5000/usersEdit`, {
    method:'PUT',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
});
return response.json()
}
)


const initialState = {
list: [],
// list:[...RedXData.slice(0,50)],

isLoading:true,
isError:false,
postRes:null,
deleteRes:null,
updateRes:null,
defaultValuesForEdit:{},
tableLocalSearchText:"",
tableLocalSearchedColumn:"",
selectedRecords:[],
selectedRowKeys:[],
total:0,
currentPage:1,
pageSize:10,
cache:{},
search:false,
searchedPageSize:10,
searchedCurrentPage:1,
searchFormValues:{
  // sales_mgr:null,
  // sales_rep:null,
  // depot:"",
  // TLC:"",
  // hierarchy_name:"",
  // customer_name:"",
  // fromDelivery:"",
  // toDelivery:""
},
sortingValues:{},

}

export const RedXSalesReportSlice = createSlice({
name: 'RedXSalesReport',
initialState,
reducers:{

    setDefaultValuesForEdit: (state,action) => {
       
        state.defaultValuesForEdit =action.payload
      },
      setSelectedRecords:(state,action)=>{
        state.selectedRowKeys=action.payload?.map(row=>row.key)
        state.selectedRecords=action.payload
      },
      setSelectedRowKeys:(state,action)=>{
        state.selectedRowKeys=action.payload
      },
      setPage:(state,action)=>{
        state.currentPage=action.payload
        

      },
      setPageSize:(state,action)=>{
        state.pageSize=action.payload
        

      },
      addSelectedRows:(state,action)=>{
        const newSelectedRows=action.payload.filter(row=>!state.selectedRowKeys.includes(row.key));
        state.selectedRecords=[...state.selectedRecords,...newSelectedRows];
        state.selectedRowKeys=[...state.selectedRowKeys,...newSelectedRows?.map(row=>row.key)]
      },
      removeSelectedRows:(state,action)=>{
        state.selectedRowKeys=state.selectedRowKeys.filter(key=>!action.payload.includes(key))
        state.selectedRecords=state.selectedRecords.filter(row=>!action.payload.includes(row.key))
      },
      setSearchUserListData:(state,action)=>{
        state.search=action.payload
      },
      setSearchedCurrentPage:(state,action)=>{
        state.searchedCurrentPage=action.payload
        

      },
      setSearchedPageSize:(state,action)=>{
        state.searchedPageSize=action.payload
        

      },
      setSearchFormValues:(state,action)=>{
        state.searchFormValues=action.payload
      },
      setFilterValues:(state,action)=>{
        state.filters=action.payload
      },
      setSortersRedux:(state,action)=>{
        state.sorters=action.payload
      },
      setSortingValues:(state,action)=>{
        state.sortingValues=action.payload
      }
},
extraReducers:(builder)=>{
    // Listing of User Data
    builder.addCase(fetchUserList.pending, (state, action)=>{
        state.isLoading = true
    })
    builder.addCase(fetchUserList.fulfilled, (state, action)=>{
       
        state.isLoading= false
        // state.list=action.payload

        // state.list = [...new Set([...state.list,...action.payload.list.map((row,index)=>({...row,key:row.id}))])]



const existingData=state.list||[];
const newData=action.payload.list?.map((row,index)=>({...row,key:row.id}))||[];
const combinedData=[...existingData,...newData];

const uniqueDataMap= combinedData.reduce((map,item)=>{
    map.set(item.key,item);
    return map;
},new Map());
const uniqueData=Array.from(uniqueDataMap.values());

// state.list=uniqueData;
state.list=action.payload.list?.map((row,index)=>({...row,key:row.id}))






// let filteredList = action.payload.list.map((row,index)=>({...row,key:row.id})).reduce((acc, curr) => {
//     if (!acc.find(item => item.key === curr.key)) {
//       acc.push(curr);
//     }
//     return acc;
//   }, []);
//   state.list=filteredList

        // if(action.payload.page===1){
            // state.list=action.payload.list.map((row,index)=>({...row,key:row.id}))
        // }else{
        //     // state.list=[...state.list,...action.payload.list]
        //     state.list=[...state.list,...action.payload.list.map((row,index)=>({...row,key:row.id}))]

        // }
        state.total=action.payload.total;
        state.currentPage=action.payload.page;
        state.pageSize=action.payload.pageSize
        state.searchedCurrentPage=1;
        state.searchedPageSize=10



// console.log("hittttt",action.payload.cacheHit)
// console.log("cache",state.cache[0])
// console.log("cache",state.cache[2])


// if(!action.payload.cacheHit){
// state.cache[action.payload.page]=action.payload.list.map((row)=>({...row,key:row.id}));
//     state.list=Object.values(state.cache)


//         state.total=action.payload.total;
//         state.currentPage=action.payload.page;
//         state.pageSize=action.payload.pageSize
//         state.isLoading=false
// }
// else{
//      state.list=Object.values(state.cache).flat()


//      state.total=action.payload.total;
//      state.currentPage=action.payload.page;
//      state.pageSize=action.payload.pageSize
//      state.isLoading=false
// }


//  if(!action.payload.cacheHit){
    // state.cache[action.payload.page]=action.payload.list.map((row)=>({...row,key:row.id}));
    


    //     state.total=action.payload.total;
    //     state.currentPage=action.payload.page;
    //     state.pageSize=action.payload.pageSize
//  }
//  state.list=state.cache[action.payload.page];
//  state.currentPage=action.payload.page;
//  state.isLoading=false

       
    })
    builder.addCase(fetchUserList.rejected, (state, action)=>{
        state.isError = true 
    })

    // Post api user Data
    builder.addCase(postUserList.pending, (state, action)=>{
        state.isLoading = true
    })
    builder.addCase(postUserList.fulfilled, (state, action)=>{
        state.isLoading= false
        state.postRes = action.payload
    })
    builder.addCase(postUserList.rejected, (state, action)=>{
        state.isError = true 
    })

    // Delete api user Data
    builder.addCase(deleteUserRecord.pending, (state, action)=>{
        state.isLoading = true
    })
    builder.addCase(deleteUserRecord.fulfilled, (state, action)=>{
        state.isLoading= false
        state.deleteRes = action.payload
    })
    builder.addCase(deleteUserRecord.rejected, (state, action)=>{
        state.isError = true 
    })

    // Update api user data
    builder.addCase(updateUserRecord.pending, (state, action)=>{
        state.isLoading = true
    })
    builder.addCase(updateUserRecord.fulfilled, (state, action)=>{
        state.isLoading= false
        state.updateRes = action.payload
    })
    builder.addCase(updateUserRecord.rejected, (state, action)=>{
        state.isError = true 
    })

 // Search api user Data
 builder.addCase(searchUserList.pending, (state, action)=>{
    state.isLoading = true
})
builder.addCase(searchUserList.fulfilled, (state, action)=>{
    state.isLoading= false
    state.list = action.payload.list?.map((row)=>({...row,key:row.id}))

    state.total=action.payload.total;
    state.searchedCurrentPage=action.payload.page;
    state.searchedPageSize=action.payload.pageSize
    // state.search=action.payload.search
    state.currentPage=1;
    state.pageSize=10
})
builder.addCase(searchUserList.rejected, (state, action)=>{
    state.isError = true 
})




}
})

export const { setDefaultValuesForEdit,setSelectedRecords,setSelectedRowKeys,setPage,setPageSize,addSelectedRows,removeSelectedRows,setSearchUserListData,setSearchedCurrentPage,setSearchedPageSize,setSearchFormValues,setFilterValues,setSortersRedux,setSortingValues} = RedXSalesReportSlice.actions
export default RedXSalesReportSlice.reducer