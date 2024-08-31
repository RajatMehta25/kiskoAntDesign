import { configureStore } from '@reduxjs/toolkit'
import navActiveItemReducer from './navListSlice'
import useChangeReducer from './authSlice'
import tableLocalSearchSlice from './tableLocalSearchSlice'
import RedXDailyIssueReportSlice from './RedXDailyIssueReportSlice'
import RedXSalesReportSlice from './RedXSalesReportSlice'
export const store = configureStore({
  reducer: {
    navActiveItem:navActiveItemReducer,
    user:useChangeReducer,
    salesReportApi:RedXSalesReportSlice,
    tableLocalSearch:tableLocalSearchSlice,
    dailyIssueApi:RedXDailyIssueReportSlice,
  },
})