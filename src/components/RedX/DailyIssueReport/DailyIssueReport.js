import React,{useState,useRef,useEffect,useMemo,useCallback} from 'react'
import { Button, Table,Input,Space, Checkbox,Pagination,notification,Tabs, DatePicker, TimePicker, Tooltip } from 'antd';
import {get, times} from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList, postUserList, deleteUserRecord, updateUserRecord, setSelectedRecords, searchUserList, setSearchedPageSize, setSearchedCurrentPage, setSearchDailyIssueFormValues, reasonCodeList } from '../../../ReduxToolkit/RedXDailyIssueReportSlice';
import { setDefaultValuesForEdit ,setSelectedRowKeys,removeSelectedRows,addSelectedRows,setPage,setPageSize,setSortingValues} from '../../../ReduxToolkit/RedXDailyIssueReportSlice';
import CustomModal from '../CustomModal/CustomSalesReportModal';
import { FaPen , FaMagnifyingGlass  } from "react-icons/fa6";
import CustomSalesReportSearch from '../CustomSearch/CustomSalesReportSearch';
import CustomDownload from '../CustomDownload/CustomDownload';
import Highlighter from 'react-highlight-words';
import { setTableLocalSearchText, setTableLocalSearchedColumn } from '../../../ReduxToolkit/tableLocalSearchSlice';
import moment from 'moment';
import CustomDailyIssueSearch from '../CustomSearch/CustomDailyIssueSearch';
import dayjs from 'dayjs';
import CustomDailyIssueModal from '../CustomModal/CustomDailyIssueModal';
import { DailyIssueReportHeaders } from './DailyIssueReportDownloadConfig';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { checkErrorStatus } from '../../../utils/validator';
import Loading from '../../Loading/Loading';

// import { RedXData } from './RedXData';

const DailyIssueReport = ({access}) => {

  
  const onChange = (key) => {
    console.log(key);
  };
  



const {
list,
isLoading,
isError,
defaultValuesForEdit,
selectedRecords,
selectedRowKeys,
currentPage,
pageSize,
total,
searchDailyIssueFormValues,
searchedPageSize,
searchedCurrentPage,
sortingValues
}=useSelector((state)=>state.dailyIssueApi)

console.log("list",list);
const [searchFormValuesLocal,setSearchFormValuesLocal]=useState({})
const [sortingValuesLocal,setSortingValuesLocal]=useState({})
const [errorStatus,SetErrorStatus]=useState({})
const [errorMessage,SetErrorMessage]=useState({})
const [expandCell,setExpandCell]=useState(false)
console.log("selectedRecords",selectedRecords);
// const userPostRes = useSelector((state) => state.dailyIssueApi.postRes)
// const userDeleteRes = useSelector((state) => state.dailyIssueApi.deleteRes)
// const userUpdateRes = useSelector((state) => state.dailyIssueApi.updateRes)
const dispatch = useDispatch()
const [show, setShow] = useState(false);
useEffect(() => {
  setSortingValuesLocal(sortingValues)
  if(!Object.values(searchDailyIssueFormValues).some(ele=>ele)){
    if(currentPage&&pageSize){
      dispatch(fetchUserList({page:currentPage,pageSize,sortingValues:sortingValues}))}
  }else{
    setSearchFormValuesLocal(searchDailyIssueFormValues)

    if(searchedCurrentPage&&searchedPageSize){
    dispatch(searchUserList({page:searchedCurrentPage,pageSize:searchedPageSize,searchDailyIssueFormValues:searchDailyIssueFormValues,sortingValues:sortingValues}))
  }
}
  
}, [currentPage,pageSize,searchedCurrentPage,searchedPageSize,searchDailyIssueFormValues,sortingValues])



const onSubmitEvent = async (e) => {
  e.preventDefault()
  console.log('final data', )
   dispatch(postUserList())
}
// Delete Event
const deleteEvent = (item) => {
  dispatch(deleteUserRecord(item._id))
}
// Update Event
const updateEvent=(item)=>{
  setShow(true)
  
  // setEditData(obj)
}
//Update Api Event
const updateRecordApi=()=>{
  // dispatch(updateUserRecord(editData))
  setShow(false)
}

// Response handle
// useEffect(() => {
//   dispatch(fetchUserList())
// }, [userPostRes || userDeleteRes || userUpdateRes])


// const [searchText, setSearchText] = useState('');
// const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  console.log("selectedKeysSearch",selectedKeys)
  console.log("dataIndex",dataIndex)
  console.log("confirm",confirm)

  confirm();

  dispatch(setSearchDailyIssueFormValues(searchFormValuesLocal))

  // setSearchText(selectedKeys[0]);
  // dispatch(setTableLocalSearchText(selectedKeys[0]))
  // setSearchedColumn(dataIndex);
  // dispatch(setTableLocalSearchedColumn(dataIndex))
};
const handleReset = (clearFilters,dataIndex) => {
  clearFilters();
  // setSearchText('');
  // dispatch(setTableLocalSearchText(""))
  setSearchFormValuesLocal({...searchFormValuesLocal,[dataIndex]:null})
  dispatch(setSearchDailyIssueFormValues({...searchFormValuesLocal,[dataIndex]:null}))
};
console.log("data inside redux",searchDailyIssueFormValues);
const checkDateAndTime=(text)=>{
  if(text.includes('date')){
    return "date"
  }else if(text.includes('time')){
    return "time"
  }
  else {return false}
}

const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
        {
        checkDateAndTime(dataIndex)==="date"?
        <DatePicker
        size='small'
        placeholder={`Search ${dataIndex}`}
        minDate={dayjs().subtract(42,"days")}
        maxDate={dayjs()}
        format="MM/DD/YYYY"
        value={searchFormValuesLocal[dataIndex]?dayjs(searchFormValuesLocal[dataIndex]):false}
        inputReadOnly

        onChange={(e) => {
          // setSelectedKeys(e? [e.format("MM/DD/YYYY")] : []);
          console.log("this",e.format("MM/DD/YYYY"))
          setSearchFormValuesLocal({...searchFormValuesLocal,[dataIndex]:e.format("MM/DD/YYYY")})


          // setSearchFormValuesLocal({...searchFormValuesLocal,})
          // dispatch(setTableLocalSearchText(e.target.value ? [e.target.value] : []))
        }}
        // onChange={(e) => setTableLocalSearchText(e.target.value ? [e.target.value] : [])}

        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
        />
        :
        checkDateAndTime(dataIndex)==="time"
        ?
        <DatePicker
        size='small'
        placeholder={`Search ${dataIndex}`}
        showTime
        minDate={dayjs().subtract(42,"days")}
        maxDate={dayjs()}
        // format="MM/DD/YYYY"
        value={searchFormValuesLocal[dataIndex]?dayjs(searchFormValuesLocal[dataIndex]):false}
        inputReadOnly

        onChange={(e) => {
          // setSelectedKeys(e? [e.format("MM/DD/YYYY")] : []);
          console.log("this",e.format("MM/DD/YYYY HH:mm:ss"))
          setSearchFormValuesLocal({...searchFormValuesLocal,[dataIndex]:e.format("MM/DD/YYYY HH:mm:ss")})


          // setSearchFormValuesLocal({...searchFormValuesLocal,})
          // dispatch(setTableLocalSearchText(e.target.value ? [e.target.value] : []))
        }}
        // onChange={(e) => setTableLocalSearchText(e.target.value ? [e.target.value] : [])}

        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
        />
        // <TimePicker 
        // style={{
        //   marginBottom: 8,
        //   display: 'block',
        // }}
        // value={searchFormValuesLocal[dataIndex]?searchFormValuesLocal[dataIndex]:false}
        // onChange={(e) => {
        //   // setSelectedKeys(e? [e.format("MM/DD/YYYY")] : []);
        //   console.log("this",e)
        //   setSearchFormValuesLocal({...searchFormValuesLocal,[dataIndex]:e})


        //   // setSearchFormValuesLocal({...searchFormValuesLocal,})
        //   // dispatch(setTableLocalSearchText(e.target.value ? [e.target.value] : []))
        // }}
        // />
        :
        <>
      <Input
      size='small'
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        // value={selectedKeys[0]}
        value={searchFormValuesLocal[dataIndex]}

        onChange={(e) => {
          checkErrorStatus(e.target.value,dataIndex,SetErrorStatus,errorStatus,SetErrorMessage,errorMessage)

          // setSelectedKeys(e.target.value ? [e.target.value] : [])
          setSearchFormValuesLocal({...searchFormValuesLocal,[dataIndex]:e.target.value})


        }}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
      />
      <div style={{color:"red"}}>{errorStatus[dataIndex]?errorMessage[dataIndex]:false}</div>
</>
}
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<FaMagnifyingGlass />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() =>  {
            if(clearFilters)
              { 
            handleReset(clearFilters,dataIndex); 
            confirm()
          
          }}}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
       
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <FaMagnifyingGlass 
      style={{
        color: searchFormValuesLocal[dataIndex]? '#1677ff' : undefined,
      }}
    />
  ),
  // onFilter: (value, record) =>
  //   // console.log("filtervaluee",record[dataIndex])
  // // console.log("record",value)
  
  // record[dataIndex]? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()):null
  //   ,
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  // render: (text) => text,
    // tableLocalSearchedColumn === dataIndex ? (
    //   <Highlighter
    //     highlightStyle={{
    //       backgroundColor: '#ffc069',
    //       padding: 0,
    //     }}
    //     searchWords={[tableLocalSearchText]}
    //     autoEscape
    //     textToHighlight={text ? text.toString() : '-'}
    //   />
    //   // text
      
    // ) : (
    //   text?text:"-"
    // ),
});

function sorter(a,b,sortOrder,dataIndex){
  
  if(!a||!b){
    return a?1:-1;
  }
  const sortFn=typeof a[dataIndex]==="string"?
  (a,b)=>(a?a:"").replace(/\n/g,"").localeCompare((b?b:"").replace(/\n/g,""),undefined,{numeric:true})
  :
  (a,b)=>a-b;
  return sortFn(a[dataIndex],b[dataIndex])* (sortOrder==='ascend'?1:-1);
}





const csvData= (selectedRecords.length===0?list:selectedRecords).map((item)=>({
        
  'id':get(item,"id",""),
  'date':get(item,"date",""),
 'depot':get(item,"depot",""),
 'product_code':get(item,"product_code",""),
 'product_description':get(item,"product_description",""),
 
'red_x':get(item,"red_x",""),
  'total_LP1':get(item,"total_LP1",""),
'stock_on_hand':get(item,"stock_on_hand",""),
 'purchasing_group':get(item,"purchasing_group",""),
 'MMPP_status':get(item,"MMPP_status",""),
'sales_status':get(item,"sales_status",""),
'material_group':get(item,"material_group",""),
'hierarchy_number':get(item,"hierarchy_number",""),
'hierarchy_name':get(item,"hierarchy_name",""),
'customer_number':get(item,"customer_number",""),
'customer_name':get(item,"customer_name",""),
'order_number':get(item,"order_number",""),
'MGC':get(item,"MGC",""),
'TLC':get(item,"TLC",""),
'sc':get(item,"sc",""),
'temperature':get(item,"temperature",""),
'vendor_code':get(item,"vendor_code",""),
'vendor_name':get(item,"vendor_name",""),
'upg':get(item,"upg",""),
'comm_team':get(item,"comm_team",""),
'time_stamp':get(item,"time_stamp",""),



   
     // "date":moment(item.date).format("YYYY-MM-DD")
   }))

const cellData=useCallback((text)=>{
  
  if(expandCell){
    return text
  }else{
   
    return `${text.substring(0,7)}...`
  }

},[expandCell])

const customSort=(dataIndex,sortOrder)=>{
  console.log("sortOrder",sortOrder)
  console.log("column",dataIndex)
    
  setSortingValuesLocal({...sortingValuesLocal,[dataIndex]:sortOrder})

   dispatch(setSortingValues({...sortingValuesLocal,[dataIndex]:sortOrder}))

}


const generateTitleDiv=useCallback((sortingValuesLocal,column)=>{
  // console.log('incoming data',sortingValuesLocal.column)
let NewTitle = (<div 
  style={{width:"max-content"}}
  // style={{width:"2rem",display:"flex",justifyContent:"space-between"}}
  >
    {<span style={{textTransform:"capitalize",padding:"0 0.5rem"}}>{column}</span>}
    {
    // sortingValuesLocal[column]===undefined||sortingValuesLocal[column]==="descend"
    sortingValuesLocal[column]===undefined||sortingValuesLocal[column]==="ascend"

    ?
    <Tooltip title='Click to sort in Descending Order' >
<CaretDownOutlined 
     style={{
      color:
      // sortingValuesLocal[column]
      // ?
      // '#1677ff'
      // :
      'rgba(0, 0, 0, 0.29)',
      cursor:"pointer"}}  
    onClick={()=>customSort(column,"descend")} />
    </Tooltip>
     
    
    :
    sortingValuesLocal[column]==="descend"
    ?
    <Tooltip title='Click to sort in Ascending Order' >
    <CaretUpOutlined 
     style={{
      color:
      // sortingValuesLocal[column]
      // ?
      // '#1677ff'
      // :
      'rgba(0, 0, 0, 0.29)',
      cursor:"pointer"}}  
    onClick={()=>customSort(column,"ascend")} />
    </Tooltip>
  :
  false
  }</div>)
  return NewTitle
},[sortingValuesLocal])

const columns = 
  // useMemo(()=> -
    [
    {
      title: generateTitleDiv(sortingValuesLocal,"id"),
      dataIndex: 'id',
      key:"id",
      
      render: (text) => text?text:"-",
      ...getColumnSearchProps('id'),
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.id - b.id,

      // sorter : (a,b) =>console.log(sorter(a,b,'ascend','id'))
    },
    {
      title: generateTitleDiv(sortingValuesLocal,"date"),
      dataIndex: 'date',
      key:"date",
      
      render: (text) => text?dayjs(text).format("MM/DD/YYYY"):"-",
      ...getColumnSearchProps('date'),
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.id - b.id,

      // sorter : (a,b) =>console.log(sorter(a,b,'ascend','id'))
    },
    {
      title: generateTitleDiv(sortingValuesLocal,"depot"),
      dataIndex: 'depot',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('depot'),
      //  sortDirections: [ 'descend','ascend'],
  //     sorter: (a,b)=> a.depot.localeCompare(b.depot, undefined, {
  //   numeric: true,
  //   sensitivity: 'base'
  // }),


  // sorter : (a,b) =>sorter(a,b,'ascend','depot')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"product code"),
      dataIndex: 'product_code',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('product_code'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.material - b.material,
      // sorter : (a,b) =>sorter(a,b,'ascend','material')

    },
    {
      title:generateTitleDiv(sortingValuesLocal,"product description"),
      dataIndex: 'product_description',
      render: (text) => text?text:"-",

      // render: (text) => <div onClick={()=>setExpandCell(!expandCell)}>{text?cellData(text):"-"}</div>,
       ...getColumnSearchProps('material_description'),
  //      sortDirections: [ 'descend','ascend'],
  //     sorter: (a,b)=> a.material_description.localeCompare(b.material_description, undefined, {
  //   numeric: true,
  //   sensitivity: 'base'
  // }),
  // sorter : (a,b) =>sorter(a,b,'ascend','material_description')

    },
    
    {
      title: generateTitleDiv(sortingValuesLocal,"red x"),
      dataIndex: 'red_x',
      render: (text) => text?text:"-",
       ...getColumnSearchProps('red_x'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.red_x - b.red_x,
      // sorter : (a,b) =>sorter(a,b,'ascend','red_x')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"total lp1"),
      dataIndex: 'total_LP1',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('total_LP1'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],
      // sorter: (a, b) => parseFloat(a.total_LP1) - parseFloat(b.total_LP1)
      // (a,b)=>console.log(a.total_LP1)
      // (a, b) => a.total_LP1.localeCompare(b.total_LP1),
      // sorter : (a,b) =>sorter(a,b,'ascend','total_LP1')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"stock on hand"),
      dataIndex: 'stock_on_hand',
      render: (text) => text?text:"-",
      // sorter : (a,b) =>sorter(a,b,'ascend','stock_on_hand'),
      ...getColumnSearchProps('stock_on_hand'),

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"purchasing group"),
      dataIndex: 'purchasing_group',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('purchasing_group'),
//        sortDirections: [ 'descend','ascend'],
//       sorter: (a, b) =>{
//     if (!a.purchasing_group) {
       
//         return -1;
//     }
//     if (!b.purchasing_group) {
      
//         return +1;
//     }
//     return a.purchasing_group.localeCompare(b.purchasing_group);
// }
  //     (a,b)=> a?.purchasing_group?.localeCompare(b?.purchasing_group, undefined, {
  //   numeric: true,
  //   sensitivity: 'base'
  // }),
  // sorter : (a,b) =>sorter(a,b,'ascend','purchasing_group')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"mmpp status"),
      dataIndex: 'MMPP_status',
      render: (text) => text?text:"-",
       ...getColumnSearchProps('MMPP_status'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.MMPP_status - b.MMPP_status,
      // sorter : (a,b) =>sorter(a,b,'ascend','MMPP_status')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"sales status"),
      dataIndex: 'sales_status',
      render: (text) => text?text:"-",
        ...getColumnSearchProps('sales_status'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.sales_status - b.sales_status,
      // sorter : (a,b) =>sorter(a,b,'ascend','sales_status')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"material group"),
      dataIndex: 'material_group',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('material_group'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.material_group - b.material_group,
      // sorter : (a,b) =>sorter(a,b,'ascend','material_group')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"hierarchy number"),
      dataIndex: 'hierarchy_number',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('hierarchy'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.hierarchy - b.hierarchy,
      // sorter : (a,b) =>sorter(a,b,'ascend','hierarchy')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"hierarchy name"),
      dataIndex: 'hierarchy_name',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('hierarchy_name'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.hierarchy_name - b.hierarchy_name,
      // sorter : (a,b) =>sorter(a,b,'ascend','hierarchy_name')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"customer number"),
      dataIndex: 'customer_number',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('customer'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.customer - b.customer,
      // sorter : (a,b) =>sorter(a,b,'ascend','customer')

    },
    {
      title:generateTitleDiv(sortingValuesLocal,"customer name"),
      dataIndex: 'customer_name',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('customer_name'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.customer_name - b.customer_name,
      // sorter : (a,b) =>sorter(a,b,'ascend','customer_name')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"order number"),
      dataIndex: 'order_number',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('order_number'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.order_number - b.order_number,
      // sorter : (a,b) =>sorter(a,b,'ascend','order_number')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"mgc"),
      dataIndex: 'MGC',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('MGC'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.MGC - b.MGC,
      // sorter : (a,b) =>sorter(a,b,'ascend','MGC')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"tlc"),
      dataIndex: 'TLC',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('TLC'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.TLC - b.TLC,
      // sorter : (a,b) =>sorter(a,b,'ascend','TLC')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"sc"),
      dataIndex: 'sc',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('postal_code'),
//       sortDirections: [ 'descend','ascend'],
//      sorter: (a,b)=> a.postal_code.localeCompare(b.postal_code, undefined, {
//    numeric: true,
//    sensitivity: 'base'
//  }),
// sorter : (a,b) =>sorter(a,b,'ascend','postal_code')

    },
    {
      title:generateTitleDiv(sortingValuesLocal,"temperature"),
      dataIndex: 'temperature',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('Mini_group'),
//       sortDirections: [ 'descend','ascend'],
//      sorter: (a,b)=> a.Mini_group.localeCompare(b.Mini_group, undefined, {
//    numeric: true,
//    sensitivity: 'base'
//  }),
// sorter : (a,b) =>sorter(a,b,'ascend','Mini_group')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"vendor code"),
      dataIndex: 'vendor_code',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('sales_rep'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.sales_rep - b.sales_rep,
      // sorter : (a,b) =>sorter(a,b,'ascend','sales_rep')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"vendor name"),
      dataIndex: 'vendor_name',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('sales_rep_name'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.sales_rep_name - b.sales_rep_name,
      // sorter : (a,b) =>sorter(a,b,'ascend','sales_rep_name')
    },
    {
      title:generateTitleDiv(sortingValuesLocal,"upg"),
      dataIndex: 'upg',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('sales_mgr'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.sales_mgr - b.sales_mgr,
      // sorter : (a,b) =>sorter(a,b,'ascend','sales_mgr')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"comm team"),
      dataIndex: 'comm_team',
      render: (text) => text?text:"-",
      ...getColumnSearchProps('Sales_mgr_name'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.Sales_mgr_name - b.Sales_mgr_name,
      // sorter : (a,b) =>sorter(a,b,'ascend','Sales_mgr_name')

    },
    {
      title: generateTitleDiv(sortingValuesLocal,"time stamp"),
      dataIndex: 'time_stamp',
      render: (text) => <div style={{whiteSpace:"pre"}}>{text?dayjs(text).format("MM/DD/YYYY HH:mm:ss"):"-"}</div>,

      // render: (text) => <div style={{whiteSpace:"pre"}}>{text?dayjs(text).format('HH:mm'):"-"}</div>,
      ...getColumnSearchProps('time_stamp'),
      // defaultSortOrder: 'ascend',
      // sortDirections: [ 'descend','ascend'],

      // sorter: (a, b) => a.comments - b.comments,
      // sorter : (a,b) =>sorter(a,b,'ascend','comments')

    },
   
   
    {
      title: "Action",
      dataIndex: 'action_status',
      // fixed:'right',
      // width:100,
      // key: 'x',
      render: (text,record,index) => <div 
      style={
        {
          display:"flex",
          gap:"0.5rem",
          justifyContent:"center",
          alignItems:"center"}}>
        {/* <div>{text?text:"-"}</div> */}
        <Button type="default" 
        size='small'
         onClick={()=>{
          dispatch(setDefaultValuesForEdit(record))
          dispatch(reasonCodeList())

          showModal();
          }}>
      <FaPen/>
    </Button></div>,
    // ...getColumnSearchProps('action_status'),
    // sorter : (a,b) =>sorter(a,b,'ascend','action_status'),
    },  
    
 
  
  ]
  // ,[]);

  

  
  

const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

 
  
  const onCreate = (values) =>{
    console.log("modal values",values)
    setIsModalOpen(false)
  }

  // const handleSelect = (record, selected) => {
  //   if (selected) {
  //     dispatch(setSelectedRowKeys((keys) => [...keys, record.id]));
  //   } else {
  //     dispatch(setSelectedRowKeys((keys) => {
  //       const index = keys.indexOf(record.id);
  //       return [...keys.slice(0, index), ...keys.slice(index + 1)];
  //     }));
  //   }
  // };

  // const toggleSelectAll = () => {
  //   dispatch(setSelectedRowKeys((keys) =>
  //     keys.length === list.length ? [] : list.map((r) => r.id)
  //   ));
  // };

  // const headerCheckbox = (
  //   <Checkbox
  //     checked={selectedRowKeys.length}
  //     indeterminate={
  //       selectedRowKeys.length > 0 && selectedRowKeys.length < list.length
  //     }
  //     onChange={toggleSelectAll}
  //   />
  // );

  const rowSelectionCustom = 
  // useMemo(()=>(
    {
    selectedRowKeys,
    // onChange: (selectedRowKeys, selectedRecords) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRecords);
    //   // dispatch(setSelectedRowKeys(selectedRowKeys))
    // },
    onSelect:(record,selected)=>{
      if(selected){
        dispatch(addSelectedRows([record]))
        // console.log("onselect",record);
        // console.log("onselect",selected);
      }else{
        dispatch(removeSelectedRows([record.key]))
      }
    },

onSelectAll:(selected)=>{
  if(selected){
    // dispatch(setSelectedRowKeys(listWithKeys.map(row=>row.key)))
    // dispatch(setSelectedRecords(listWithKeys))

console.log("onselectUserList",list.map(row=>row.key))
    dispatch(setSelectedRowKeys(list.map(row=>row.key)))
    dispatch(setSelectedRecords(list))
  }else{
    dispatch(setSelectedRecords([]))
  }
},
    // onSelectAll:(selected,selectedRows,changeRows)=>{
    //   if(selected){
    //     // dispatch(addSelectedRows(changeRows))
    //     // dispatch(addSelectedRows(list.map(row=>row)))
    //     dispatch(setSelectedRecords(list))

    //   }else{
    //     dispatch(setSelectedRecords([]))
    //     // dispatch(removeSelectedRows(list.map(row=>row)))

    //     // dispatch(removeSelectedRows(changeRows.map(row=>row.id)))
    //   }
    // }


//     onSelectAll:(selected,list)=>{
//       if(selected){
// console.log("kuaaaa",selected)
// console.log("kuaaaa",list)
// const selectedKeys=selected?list.map((item)=>item.id):[];
// dispatch(setSelectedRecords(selectedKeys))

//       }else{

//       }
//     }
   
  }
// ),[selectedRowKeys,dispatch]);


console.log("defaultValuesForEdit",defaultValuesForEdit)
console.log("keyssss",selectedRowKeys)


const handleTableChange=
// useCallback(
  (pagination)=>{
    if(!Object.values(searchDailyIssueFormValues).some(ele=>ele)){
  if(pagination.current!==currentPage){
    dispatch(setPage(pagination.current))
  }
  if(pagination.pageSize!==pageSize){
    dispatch(setPageSize(pagination.pageSize))
  }
}else{
  if(pagination.current!==searchedCurrentPage){
    dispatch(setSearchedCurrentPage(pagination.current))
  }
  if(pagination.pageSize!==searchedPageSize){
    dispatch(setSearchedPageSize(pagination.pageSize))
  }
}

  // dispatch(setPage(pagination.current));
  // dispatch(setPageSize(pagination.pageSize));
// let newPage=pagination.current;
// let newPageSize=pagination.pageSize
  // dispatch(fetchUserList({newPage,newPageSize}))
  console.log(pagination.current)
}
// ,[currentPage,pageSize]);
//  const listWithKeys=list.map((item,index)=>({...item,key:index+1}))
//  console.log(listWithKeys);
 console.log(pageSize)
 const onChangePagination = (page,pageSize) => {
  console.log(page);
  dispatch(setPage(page));
  dispatch(setPageSize(pageSize));

  // dispatch(fetchUserList({page,pageSize}))
};
  return (
    <>
    {
      isLoading
            ?
            ( isError ? <div>Error Occurred</div>
            :
       <Loading/>
       // alert("loading")
            )
      :
      <div className='salesManagerContainer'>
      {/* <Button variant="contained" onClick={()=>{localStorage.removeItem("user1");}}>Logout</Button> */}
      {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
       
        
          
         <CustomDailyIssueSearch setSearchFormValuesLocal={setSearchFormValuesLocal} setSortingValuesLocal={setSortingValuesLocal} />
         {/* <Button onClick={()=>dispatch(setPage(2))}>2</Button> */}
        { 
        // searchDailyIssueFormValues?
        // <CustomDownload csvData={csvData} headers={DailyIssueReportHeaders}/>
        // :
        // <CustomDownload csvData={csvData} headers={DailyIssueReportHeaders}/>
        <CustomDownload selectedData={selectedRowKeys} searchFormValues={searchDailyIssueFormValues}/>

        }
         {/* <CustomDownload csvData={csvData} headers={headers}/>Page Range */}

       
    <div style={
      {
        // margin:"0 1rem",
        // width:"98vw",
        // height:"400px",
        // overflowY:"auto"
        }} >
    <Table
       size='small'
       
        rowSelection={ 
        
          rowSelectionCustom
        }
        columns={columns}
        dataSource={list}

        scroll={{
      x: 1500,
     
      
    }}
    // sticky
   pagination={Object.values(searchDailyIssueFormValues).some(ele=>ele)?{current:searchedCurrentPage,total,pageSize:searchedPageSize}:{current:currentPage,total,pageSize}}
   onChange={handleTableChange}
    // rowKey='id'
    loading={isLoading}
    // pagination={false}
      />


      {/* <Pagination current={currentPage} onChange={onChangePagination}  total={total} pageSize={pageSize} /> */}
    </div>
   
    
   
  <div>
<CustomDailyIssueModal 
open={isModalOpen}
  setIsModalOpen={setIsModalOpen} 
  defaultValues={defaultValuesForEdit}
   onCreate={onCreate}
   />
  </div>
    
    
    </div>}
    </>
  )
}

export default DailyIssueReport