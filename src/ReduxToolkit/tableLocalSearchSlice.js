import { createSlice } from '@reduxjs/toolkit'


const initialState = {




tableLocalSearchText:"",
tableLocalSearchedColumn:"",
}

export const tableLocalSearchSlice = createSlice({
name: 'SearchData',
initialState,
reducers:{

    setTableLocalSearchText: (state,action) => {
       
        state.tableLocalSearchText =action.payload
      },
      setTableLocalSearchedColumn: (state,action) => {
       
        state.tableLocalSearchedColumn =action.payload
      },
      
},

})

export const { setTableLocalSearchText,setTableLocalSearchedColumn} = tableLocalSearchSlice.actions
export default tableLocalSearchSlice.reducer