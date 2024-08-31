import { createSlice } from '@reduxjs/toolkit'

const initialState = {
user: { loggedIn: false, name: "ABC" }
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userChange: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user={ ...state.user, loggedIn:action.payload };
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    userLogin: (state,action) => {
      
      state.user={ ...state.user, loggedIn:action.payload };
    },
  },
})

// Action creators are generated for each case reducer function
export const { userChange,userLogin} = authSlice.actions

export default authSlice.reducer