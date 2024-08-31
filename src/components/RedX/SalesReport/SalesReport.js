import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Button, Table, Input, Space, Checkbox, Pagination, notification, Collapse, DatePicker, Tooltip, message } from "antd";
import "./SalesReport.css";
import { get, multiply } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserList,
  postUserList,
  deleteUserRecord,
  updateUserRecord,
  setSelectedRecords,
  searchUserList,
  setSearchedPageSize,
  setSearchedCurrentPage,
  setSearchFormValues,
  setSearchlist,
  setFilterValues,
  setSortersRedux,
  setSortingValues,
} from "../../../ReduxToolkit/RedXSalesReportSlice";
import {
  setDefaultValuesForEdit,
  setSelectedRowKeys,
  removeSelectedRows,
  addSelectedRows,
  setPage,
  setPageSize,
} from "../../../ReduxToolkit/RedXSalesReportSlice";
import CustomSalesReportModal from "../CustomModal/CustomSalesReportModal";
import { FaPen, FaMagnifyingGlass } from "react-icons/fa6";
import CustomSalesReportSearch from "../CustomSearch/CustomSalesReportSearch";
import CustomDownload from "../CustomDownload/CustomDownload";
import dayjs from "dayjs";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { SalesReportHeaders } from "./SalesReportDownloadConfig";
import { checkErrorStatus } from "../../../utils/validator";
import moment from "moment";
import Loading from "../../Loading/Loading";
const SalesReport = ({ access }) => {
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
    searchedPageSize,
    searchedCurrentPage,
    searchFormValues,
    sortingValues,
  } = useSelector((state) => state.salesReportApi);
  console.log("list", list);

  const [searchFormValuesLocal, setSearchFormValuesLocal] = useState({});
  const [sortingValuesLocal, setSortingValuesLocal] = useState({});
  const [errorStatus, SetErrorStatus] = useState({});
  const [errorMessage, SetErrorMessage] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  // console.log("newSorters",sorters);

  // const [filters,setFilters]=useState({})
  console.log("selectedRecords", selectedRecords);
  console.log("selectedRowKeys", selectedRowKeys);

  // const userPostRes = useSelector((state) => state.salesReportApi.postRes)
  // const userDeleteRes = useSelector((state) => state.salesReportApi.deleteRes)
  // const userUpdateRes = useSelector((state) => state.salesReportApi.updateRes)

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if(!search){
  //     if(currentPage&&pageSize){
  //       dispatch(fetchUserList({page:currentPage,pageSize}))}
  //   }else{
  //     if(searchedCurrentPage&&searchedPageSize){
  //     dispatch(searchUserList({page:searchedCurrentPage,pageSize:searchedPageSize}))
  //   }
  // }

  // }, [currentPage,pageSize,search,searchedCurrentPage,searchedPageSize])

  useEffect(() => {
    setSortingValuesLocal(sortingValues);

    if (!Object.values(searchFormValues).some((ele) => ele)) {
      if (currentPage && pageSize) {
        dispatch(fetchUserList({ page: currentPage, pageSize, sortingValues: sortingValues }));
      }
    } else {
      setSearchFormValuesLocal(searchFormValues);
      // messageApi.open({
      //   type: 'success',
      //   content: 'This is a success message',
      // });
      // setFilters(filtersNew)
      // setSearchText(tableLocalSearchText);
      // setSearchedColumn(tableLocalSearchedColumn)
      if (searchedCurrentPage && searchedPageSize) {
        dispatch(
          searchUserList({
            page: searchedCurrentPage,
            pageSize: searchedPageSize,
            searchFormValues: searchFormValues,
            sortingValues: sortingValues,
          })
        );
      }
    }
  }, [currentPage, pageSize, searchedCurrentPage, searchedPageSize, searchFormValues, sortingValues]);

  console.log("useeefectt", sortingValues);
  const onSubmitEvent = async (e) => {
    e.preventDefault();
    dispatch(postUserList());
  };
  // Delete Event
  const deleteEvent = (item) => {
    dispatch(deleteUserRecord(item._id));
  };
  // Update Event
  const updateEvent = (item) => {
    setShow(true);

    // setEditData(obj)
  };
  //Update Api Event
  const updateRecordApi = () => {
    // dispatch(updateUserRecord(editData))
    setShow(false);
  };

  // Response handle
  // useEffect(() => {
  //   dispatch(fetchUserList())
  // }, [userPostRes || userDeleteRes || userUpdateRes])

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    // console.log("selectedKeysSearch",selectedKeys)
    // console.log("dataIndex",dataIndex)
    // const NumberTest=/^(?!0)\d+$/
    // switch (dataIndex) {
    //   case "id":
    //     if(NumberTest.test(searchFormValuesLocal.id)){
    //       confirm();
    //       dispatch(setSearchFormValues(searchFormValuesLocal))
    //     }
    //     else{
    //       SetErrorStatus({...errorStatus,[dataIndex]:"Number Required"})
    //     }
    //     break;

    //   default:
    //     break;
    // }

    confirm();
    dispatch(setSearchFormValues(searchFormValuesLocal));

    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);

    // dispatch(setTableLocalSearchText(selectedKeys[0]))
    // dispatch(setTableLocalSearchedColumn(dataIndex))
  };
  const handleReset = (clearFilters, dataIndex) => {
    clearFilters();
    setSearchText("");
    SetErrorStatus({ ...errorStatus, [dataIndex]: false });
    setSearchFormValuesLocal({ ...searchFormValuesLocal, [dataIndex]: null });
    dispatch(setSearchFormValues({ ...searchFormValuesLocal, [dataIndex]: null }));
  };
  // console.log("errorStatuss",errorStatus);
  const checkDate = (text) => {
    if (text.includes("date")) {
      return true;
    } else {
      return false;
    }
  };

  // const checkErrorStatus=(value,dataIndex,SetErrorStatus,errorStatus)=>{
  //      const NumberTest=/^(?!0)\d+$/
  // console.log("functionError",NumberTest.test(value))

  //   switch (dataIndex) {
  //     case "id":

  //       if(NumberTest.test(value)){
  //         SetErrorStatus({...errorStatus,id:false})
  //       }else{
  //         SetErrorStatus({...errorStatus,id:true})
  //   }
  //       break;

  //     default:
  //       break;
  //   }
  // }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {checkDate(dataIndex) ? (
          <DatePicker
            size="small"
            placeholder={`Search ${dataIndex}`}
            minDate={dayjs().subtract(14, "days")}
            maxDate={dayjs().add(7, "day")}
            format="MM/DD/YYYY"
            value={searchFormValuesLocal[dataIndex] ? dayjs(searchFormValuesLocal[dataIndex]) : false}
            inputReadOnly
            onChange={(e) => {
              // checkErrorStatus(e,dataIndex)
              // setSelectedKeys(e? [e.format("MM/DD/YYYY")] : []);
              setSearchFormValuesLocal({ ...searchFormValuesLocal, [dataIndex]: e.format("MM/DD/YYYY") });

              // setSearchFormValuesLocal({...searchFormValuesLocal,})
              // dispatch(setTableLocalSearchText(e.target.value ? [e.target.value] : []))
            }}
            // onChange={(e) => setTableLocalSearchText(e.target.value ? [e.target.value] : [])}

            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
        ) : (
          <>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              // value={selectedKeys[0]}
              // value={tableLocalSearchText}
              value={searchFormValuesLocal[dataIndex]}
              // value={selectedKeys[0]}

              status={errorStatus[dataIndex] ? "error" : false}
              onChange={(e) => {
                checkErrorStatus(e.target.value, dataIndex, SetErrorStatus, errorStatus, SetErrorMessage, errorMessage);

                // setSelectedKeys(e.target.value ? [e.target.value] : []);
                setSearchFormValuesLocal({ ...searchFormValuesLocal, [dataIndex]: e.target.value });

                // setSearchFormValuesLocal({...searchFormValuesLocal,})
                // dispatch(setTableLocalSearchText(e.target.value ? [e.target.value] : []))
              }}
              // onChange={(e) => setTableLocalSearchText(e.target.value ? [e.target.value] : [])}

              onPressEnter={() => (errorStatus[dataIndex] ? false : handleSearch(selectedKeys, confirm, dataIndex))}
              style={{
                marginBottom: 8,
                display: "block",
              }}
              size="small"
            />
            <div style={{ color: "red" }}>{errorStatus[dataIndex] ? errorMessage[dataIndex] : false}</div>
          </>
        )}
        <Space>
          <Button
            type="primary"
            onClick={() => (errorStatus[dataIndex] ? false : handleSearch(selectedKeys, confirm, dataIndex))}
            icon={<FaMagnifyingGlass />}
            size="small"
            style={{
              width: 90,
            }}
            // disabled={errorStatus[dataIndex]?true:false}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              if (clearFilters) {
                handleReset(clearFilters, dataIndex);
                confirm();
                // setSearchText(selectedKeys[0]);
                // setSearchedColumn(dataIndex);
                // dispatch(setFilterValues({...filters,[dataIndex]:null}))
                // dispatch(setTableLocalSearchText(selectedKeys[0]))
                // dispatch(setTableLocalSearchedColumn(dataIndex))

                // dispatch(setSearchFormValues({}))
              }
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            // dispatch(setSearchlist(false))
            // dispatch(setSearchFormValues({}))
            // setSearchText(selectedKeys[0]);
            dispatch(setTableLocalSearchText(selectedKeys[0]))
            // setSearchedColumn(dataIndex);
            dispatch(setTableLocalSearchedColumn(dataIndex))
          }}
        >
          Filter
        </Button> */}
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
          color: searchFormValuesLocal[dataIndex] ? "#1677ff" : undefined,
        }}
      />
    ),
    // onFilter: (value, record) =>
    //   // console.log("filtervaluee",record[dataIndex])
    // // console.log("record",value)
    // // dispatch(searchUserList({page:searchedCurrentPage,pageSize:searchedPageSize}));
    // record[dataIndex]? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()):null
    //   ,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    // searchedColumn === dataIndex ? (
    // <Highlighter
    //   highlightStyle={{
    //     backgroundColor: '#ffc069',
    //     padding: 0,
    //   }}
    //   searchWords={[tableLocalSearchText]}
    //   autoEscape
    //   textToHighlight={text ? text.toString() : '-'}
    // />
    // text
    // console.log("searchedText",text)
    // text

    // ) : (
    //   text?text:"-"
    // ),
  });
  // console.log("newwwwww",searchFormValuesLocal)
  // console.log("pathname",window.location.pathname.slice(1))

  // function sorter(a,b,sortOrder,dataIndex){

  //   if(!a||!b){
  //     return a?1:-1;
  //   }
  //   const sortFn=typeof a[dataIndex]==="string"?
  //   (a,b)=>(a?a:"").replace(/\n/g,"").localeCompare((b?b:"").replace(/\n/g,""),undefined,{numeric:true})
  //   :
  //   (a,b)=>a-b;
  //   return sortFn(a[dataIndex],b[dataIndex])* (sortOrder==='ascend'?1:-1);
  // }

  const customSort = (dataIndex, sortOrder) => {
    // console.log("sortOrder",sortOrder)
    // console.log("column",dataIndex)

    setSortingValuesLocal({ ...sortingValuesLocal, [dataIndex]: sortOrder });

    dispatch(setSortingValues({ ...sortingValuesLocal, [dataIndex]: sortOrder }));
  };

  const csvData = (selectedRecords.length === 0 ? list : selectedRecords)?.map((item) => ({
    id: get(item, "id", ""),
    depot: get(item, "depot", ""),
    material: get(item, "material", ""),
    material_description: get(item, "material_description", ""),
    delivery_date: get(item, "delivery_date", ""),
    red_x: get(item, "red_x", ""),
    total_LP1: get(item, "total_LP1", ""),
    stock_on_hand: get(item, "stock_on_hand", ""),
    purchasing_group: get(item, "purchasing_group", ""),
    MMPP_status: get(item, "MMPP_status", ""),
    sales_status: get(item, "sales_status", ""),
    material_group: get(item, "material_group", ""),
    hierarchy: get(item, "hierarchy", ""),
    hierarchy_name: get(item, "hierarchy_name", ""),
    customer: get(item, "customer", ""),
    customer_name: get(item, "customer_name", ""),
    order_number: get(item, "order_number", ""),
    MGC: get(item, "MGC", ""),
    TLC: get(item, "TLC", ""),
    postal_code: get(item, "postal_code", ""),
    Mini_group: get(item, "Mini_group", ""),
    sales_rep: get(item, "sales_rep", ""),
    sales_rep_name: get(item, "sales_rep_name", ""),
    sales_mgr: get(item, "sales_mgr", ""),
    Sales_mgr_name: get(item, "Sales_mgr_name", ""),
    comments: get(item, "comments", ""),
    transaction_date: get(item, "transaction_date", ""),
    insert_date: get(item, "insert_date", ""),
    insert_by: get(item, "insert_by", ""),
    update_date: get(item, "update_date", ""),
    update_by: get(item, "update_by", ""),
    assigned_to: get(item, "assigned_to", ""),
    re_assigned_to: get(item, "re_assigned_to", ""),
    action_status: get(item, "action_status", ""),

    // "date":moment(item.date).format("YYYY-MM-DD")
  }));

  console.log("sortingObject", sortingValuesLocal);

  const generateTitleDiv = useCallback(
    (sortingValuesLocal, column) => {
      // console.log('incoming data',sortingValuesLocal.column)
      let NewTitle = (
        <div
          style={{ width: "max-content" }}
          // style={{width:"2rem",display:"flex",justifyContent:"space-between"}}
        >
          {<span style={{ textTransform: "capitalize", padding: "0 0.5rem" }}>{column}</span>}
          {
            // sortingValuesLocal[column]===undefined||sortingValuesLocal[column]==="descend"
            sortingValuesLocal[column] === undefined || sortingValuesLocal[column] === "ascend" ? (
              <Tooltip title="Click to sort in Descending Order">
                <CaretDownOutlined
                  style={{
                    color:
                      // sortingValuesLocal[column]
                      // ?
                      // '#1677ff'
                      // :
                      "rgba(0, 0, 0, 0.29)",
                    cursor: "pointer",
                  }}
                  onClick={() => customSort(column, "descend")}
                />
              </Tooltip>
            ) : sortingValuesLocal[column] === "descend" ? (
              <Tooltip title="Click to sort in Ascending Order">
                <CaretUpOutlined
                  style={{
                    color:
                      // sortingValuesLocal[column]
                      // ?
                      // '#1677ff'
                      // :
                      "rgba(0, 0, 0, 0.29)",
                    cursor: "pointer",
                  }}
                  onClick={() => customSort(column, "ascend")}
                />
              </Tooltip>
            ) : (
              false
            )
          }
        </div>
      );
      return NewTitle;
    },
    [sortingValuesLocal]
  );

  // console.log("dateeeeeeeeeeeeeeeeeeeeeeeeee",dayjs("2023-06-17").format("MM/DD/YYYY"))

  const columns =
    // useMemo(()=>
    [
      {
        title: generateTitleDiv(sortingValuesLocal, "id"),
        dataIndex: "id",
        key: "id",

        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("id"),
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.id - b.id,

        // sorter : (a,b) =>sorter(a,b,'ascend','id')
        // sorter:(a,b,sortOrder)=>customSort(a,b,sortOrder,"id")
        // sorter:{
        //   compare:(a,b,sortOrder)=>customSort(a,b,sortOrder,"id"),

        // multiple:1
        // }
        // sorter:true,
        // sortOrder:sorters.find(sorter=>sorter.field==="id")?.order,
        // sortOrder:"descend"
        // multiple:true
        // sorter:{
        //   multiple:3
        // },
        // sortOrder:sorters.find(sorter=>sorter.field==="id")?.order,
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "depot"),

        // title: (<div
        // // style={{width:"2rem",display:"flex",justifyContent:"space-between"}}
        // >
        //   Depot
        //   {sortingValuesLocal.depot===undefined||sortingValuesLocal?.depot==="descend"
        //   ?
        //   <CaretUpOutlined  style={{color:sortingValuesLocal?.depot?'#1677ff':'rgba(0, 0, 0, 0.29)',cursor:"pointer"}}
        //   onClick={()=>customSort("depot","ascend")} />
        //   :
        //   sortingValuesLocal?.depot==="ascend"
        //   ?
        //   <CaretDownOutlined  style={{color:sortingValuesLocal?.depot?'#1677ff':'rgba(0, 0, 0, 0.29)',cursor:"pointer"}}
        //   onClick={()=>customSort("depot","descend")} />
        // :
        // false
        // }</div>),
        dataIndex: "depot",
        key: "depot",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("depot"),
        //  sortDirections: [ 'descend','ascend'],
        //     sorter: (a,b)=> a.depot.localeCompare(b.depot, undefined, {
        //   numeric: true,
        //   sensitivity: 'base'
        // }),

        // sorter : (a,b) =>sorter(a,b,'ascend','depot')
        // sorter:(a,b,sortOrder)=>customSort(a,b,sortOrder,"depot")

        // sorter:true,
        // sortOrder:sorters.find(sorter=>sorter.field==='depot')?.order,
        // sortOrder:"descend",
        // multiple:true

        // sorter:{
        //   multiple:1
        // },

        // sortOrder:sorters.find(sorter=>sorter.field==="depot")?.order,
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "material"),

        // title: 'Material',
        dataIndex: "material",
        key: "material",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("material"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.material - b.material,
        // sorter : (a,b,sortOrder) =>customSort(a,b,sortOrder,'material')
        // sorter:{
        //   multiple:2
        // },
        // sortOrder:sorters.find(sorter=>sorter.field==="material")?.order,
        // sortOrder:"ascend"
        // sortOrder:sorters.find(sorter=>sorter.field==="material")?.order,
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "material description"),

        // title: 'Material Description',
        dataIndex: "material_description",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("material_description"),
        //      sortDirections: [ 'descend','ascend'],
        //     sorter: (a,b)=> a.material_description.localeCompare(b.material_description, undefined, {
        //   numeric: true,
        //   sensitivity: 'base'
        // }),
        // sorter : (a,b) =>sorter(a,b,'ascend','material_description')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "delivery date"),

        // title: 'Delivery Date',
        dataIndex: "delivery_date",
        render: (text) =>
          // "hello",
          // console.log("dateeeeeeeeeeeeeeeeeeeeeeeeee",dayjs(text).format("MM/DD/YYYY")),
          text ? dayjs(text).format("MM/DD/YYYY") : "-",
        ...getColumnSearchProps("delivery_date"),
        //        sortDirections: [ 'descend','ascend'],
        //       sorter : (a, b)=> {
        //     a = a.delivery_date.split('-').reverse().join('');
        //     b = b.delivery_date.split('-').reverse().join('');
        //     return a > b ? 1 : a < b ? -1 : 0;
        // }
        // sorter : (a,b) =>sorter(a,b,'ascend','delivery_date')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "red x"),

        // title: 'Red X',
        dataIndex: "red_x",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("red_x"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.red_x - b.red_x,
        // sorter : (a,b) =>sorter(a,b,'ascend','red_x')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "total lp1"),

        // title: 'Total LP1',
        dataIndex: "total_LP1",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("total_LP1"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],
        // sorter: (a, b) => parseFloat(a.total_LP1) - parseFloat(b.total_LP1)
        // (a,b)=>console.log(a.total_LP1)
        // (a, b) => a.total_LP1.localeCompare(b.total_LP1),
        // sorter : (a,b) =>sorter(a,b,'ascend','total_LP1')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "stock on hand"),

        // title: 'Stock On Hand',
        dataIndex: "stock_on_hand",
        render: (text) => (text ? text : "-"),
        // sorter : (a,b) =>sorter(a,b,'ascend','stock_on_hand'),
        ...getColumnSearchProps("stock_on_hand"),
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "purchasing group"),

        // title: 'Purchasing group',
        dataIndex: "purchasing_group",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("purchasing_group"),
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
        title: generateTitleDiv(sortingValuesLocal, "mmpp status"),

        // title: 'MMPP Status',
        dataIndex: "MMPP_status",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("MMPP_status"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.MMPP_status - b.MMPP_status,
        // sorter : (a,b) =>sorter(a,b,'ascend','MMPP_status')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "sales status"),

        // title: 'Sales status',
        dataIndex: "sales_status",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("sales_status"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.sales_status - b.sales_status,
        // sorter : (a,b) =>sorter(a,b,'ascend','sales_status')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "material group"),

        // title: 'Material Group',
        dataIndex: "material_group",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("material_group"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.material_group - b.material_group,
        // sorter : (a,b) =>sorter(a,b,'ascend','material_group')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "hierarchy"),

        // title: 'Hierarchy',
        dataIndex: "hierarchy",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("hierarchy"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.hierarchy - b.hierarchy,
        // sorter : (a,b) =>sorter(a,b,'ascend','hierarchy')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "hierarchy name"),

        // title: 'Hierarchy Name',
        dataIndex: "hierarchy_name",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("hierarchy_name"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.hierarchy_name - b.hierarchy_name,
        // sorter : (a,b) =>sorter(a,b,'ascend','hierarchy_name')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "customer"),

        // title: 'Customer',
        dataIndex: "customer",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("customer"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.customer - b.customer,
        // sorter : (a,b) =>sorter(a,b,'ascend','customer')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "customer name"),

        // title: 'Customer Name',
        dataIndex: "customer_name",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("customer_name"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.customer_name - b.customer_name,
        // sorter : (a,b) =>sorter(a,b,'ascend','customer_name')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "order number"),

        // title: 'Order Number',
        dataIndex: "order_number",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("order_number"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.order_number - b.order_number,
        // sorter : (a,b) =>sorter(a,b,'ascend','order_number')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "MGC"),

        // title: 'MGC',
        dataIndex: "MGC",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("MGC"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.MGC - b.MGC,
        // sorter : (a,b) =>sorter(a,b,'ascend','MGC')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "TLC"),

        // title: 'TLC',
        dataIndex: "TLC",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("TLC"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.TLC - b.TLC,
        // sorter : (a,b) =>sorter(a,b,'ascend','TLC')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "postal code"),

        // title: 'Postal Code',
        dataIndex: "postal_code",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("postal_code"),
        //       sortDirections: [ 'descend','ascend'],
        //      sorter: (a,b)=> a.postal_code.localeCompare(b.postal_code, undefined, {
        //    numeric: true,
        //    sensitivity: 'base'
        //  }),
        // sorter : (a,b) =>sorter(a,b,'ascend','postal_code')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "mini group"),

        // title: 'Mini Group',
        dataIndex: "Mini_group",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("Mini_group"),
        //       sortDirections: [ 'descend','ascend'],
        //      sorter: (a,b)=> a.Mini_group.localeCompare(b.Mini_group, undefined, {
        //    numeric: true,
        //    sensitivity: 'base'
        //  }),
        // sorter : (a,b) =>sorter(a,b,'ascend','Mini_group')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "sales rep"),

        // title: 'Sales Rep',
        dataIndex: "sales_rep",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("sales_rep"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.sales_rep - b.sales_rep,
        // sorter : (a,b) =>sorter(a,b,'ascend','sales_rep')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "sales rep name"),

        // title: 'Sales Rep Name',
        dataIndex: "sales_rep_name",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("sales_rep_name"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.sales_rep_name - b.sales_rep_name,
        // sorter : (a,b) =>sorter(a,b,'ascend','sales_rep_name')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "sales mgr"),

        // title: 'Sales Mgr',
        dataIndex: "sales_mgr",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("sales_mgr"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.sales_mgr - b.sales_mgr,
        // sorter : (a,b) =>sorter(a,b,'ascend','sales_mgr')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "sales mgr name"),

        // title: 'Sales Mgr Name',.
        dataIndex: "Sales_mgr_name",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("Sales_mgr_name"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.Sales_mgr_name - b.Sales_mgr_name,
        // sorter : (a,b) =>sorter(a,b,'ascend','Sales_mgr_name')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "comments"),

        // title: 'Comments',
        dataIndex: "comments",
        render: (text) => <div style={{ whiteSpace: "pre" }}>{text ? text : "-"}</div>,
        ...getColumnSearchProps("comments"),
        // defaultSortOrder: 'ascend',
        // sortDirections: [ 'descend','ascend'],

        // sorter: (a, b) => a.comments - b.comments,
        // sorter : (a,b) =>sorter(a,b,'ascend','comments')
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "transaction date"),

        // title: 'Transaction Date',
        dataIndex: "transaction_date",
        render: (text) => (text ? dayjs(text).format("MM/DD/YYYY") : "-"),
        // sorter : (a,b) =>sorter(a,b,'ascend','transaction_date'),
        ...getColumnSearchProps("transaction_date"),
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "insert date"),

        // title: 'Insert Date',
        dataIndex: "insert_date",
        render: (text) => (text ? dayjs(text).format("MM/DD/YYYY") : "-"),
        // sortDirections: [ 'descend','ascend'],
        // sorter:(a, b) => moment(a.insert_date) - moment(b.insert_date)
        // sorter : (a,b) =>sorter(a,b,'ascend','insert_date'),
        ...getColumnSearchProps("insert_date"),
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "insert by"),

        // title: 'Insert By',
        dataIndex: "insert_by",
        render: (text) => (text ? text : "-"),
        // sorter : (a,b) =>sorter(a,b,'ascend','insert_by'),
        ...getColumnSearchProps("insert_by"),
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "update date"),

        // title: 'Update Date',
        dataIndex: "update_date",
        render: (text) => (text ? dayjs(text).format("MM/DD/YYYY") : "-"),
        ...getColumnSearchProps("update_date"),
        // sorter : (a,b) =>sorter(a,b,'ascend','update_date'),
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "update by"),

        // title: 'Update By',
        dataIndex: "update_by",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("update_by"),
        // sorter : (a,b) =>sorter(a,b,'ascend','update_by'),
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "assigned to"),

        // title: 'Action Status',
        dataIndex: "assigned_to",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("assigned_to"),
        // sorter : (a,b) =>sorter(a,b,'ascend','update_by'),
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "re assigned to"),

        // title: 'Action Status',
        dataIndex: "re_assigned_to",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("re_assigned_to"),
        // sorter : (a,b) =>sorter(a,b,'ascend','update_by'),
      },
      {
        title: generateTitleDiv(sortingValuesLocal, "action status"),

        // title: 'Action Status',
        dataIndex: "action_status",
        render: (text) => (text ? text : "-"),
        ...getColumnSearchProps("action_status"),
        // sorter : (a,b) =>sorter(a,b,'ascend','update_by'),
      },

      {
        title: "Action",
        // dataIndex: 'action_status',
        // key: 'x',
        render: (text, record, index) => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <div>{text?text:"-"}</div> */}
            <Button
              type="default"
              size="small"
              onClick={() => {
                dispatch(setDefaultValuesForEdit(record));
                showModal();
              }}
            >
              <FaPen />
            </Button>
          </div>
        ),
        // ...getColumnSearchProps('action_status'),
        // sorter : (a,b) =>sorter(a,b,'ascend','action_status'),
      },
    ];
  // ,[]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCreate = (values) => {
    console.log("modal values", values);
    setIsModalOpen(false);
  };

  const rowSelectionCustom =
    // useMemo(()=>(
    {
      selectedRowKeys,
      // onChange: (selectedRowKeys, selectedRecords) => {
      //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRecords);
      //   // dispatch(setSelectedRowKeys(selectedRowKeys))
      // },
      onSelect: (record, selected) => {
        if (selected) {
          dispatch(addSelectedRows([record]));
          // console.log("onselect",record);
          // console.log("onselect",selected);
        } else {
          dispatch(removeSelectedRows([record.key]));
        }
      },

      onSelectAll: (selected) => {
        if (selected) {
          // dispatch(setSelectedRowKeys(listWithKeys.map(row=>row.key)))
          // dispatch(setSelectedRecords(listWithKeys))

          console.log(
            "onselectUserList",
            list?.map((row) => row.key)
          );
          dispatch(setSelectedRowKeys(list?.map((row) => row.key)));
          dispatch(setSelectedRecords(list));
        } else {
          dispatch(setSelectedRecords([]));
        }
      },
    };
  // ),[selectedRowKeys,dispatch]);

  console.log("defaultValuesForEdit", defaultValuesForEdit);
  // console.log("keyssss",selectedRowKeys)

  const modifySearchFilterObject = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        newObj[key] = obj[key][0];
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };

  const handleTableChange =
    // useCallback(
    (pagination, filters, sorter) => {
      // setFilters(filters)
      // setSortingValuesLocal({...sorter})
      // const sortedInfo=Array.isArray(sorter)?sorter:[sorter]
      // const updatedSorters=sortedInfo.reduce((acc,currentSorter)=>{
      //   const existingSorterIndex=acc.findIndex(s=>s.field===currentSorter.field);
      //   if(existingSorterIndex>=0){
      //     acc[existingSorterIndex]=currentSorter
      //   }else{
      //     acc.push(currentSorter)
      //   }
      //   return acc;
      // },[...sorters])
      // setSorter(updatedSorters)
      // dispatch(setSortersRedux(JSON.stringify(updatedSorters)))
      // if(!search){
      if (!Object.values(searchFormValues).some((ele) => ele)) {
        // if (!Object.values(filters).some(ele=>ele)){

        if (pagination.current !== currentPage) {
          dispatch(setPage(pagination.current));
        }
        if (pagination.pageSize !== pageSize) {
          dispatch(setPageSize(pagination.pageSize));
        }
      } else {
        // dispatch(setFilterValues(filters))

        // if (Object.values(filters).some(ele=>ele)){
        // const newObject=modifySearchFilterObject(filters)
        // console.log("newObject",newObject);
        // dispatch(setSearchFormValues(newObject))
        // }
        if (pagination.current !== searchedCurrentPage) {
          dispatch(setSearchedCurrentPage(pagination.current));
        }
        if (pagination.pageSize !== searchedPageSize) {
          dispatch(setSearchedPageSize(pagination.pageSize));
        }
      }
      // dispatch(setPage(pagination.current));
      // dispatch(setPageSize(pagination.pageSize));
      // let newPage=pagination.current;
      // let newPageSize=pagination.pageSize
      // dispatch(fetchUserList({newPage,newPageSize}))
      // console.log(pagination.current)
      // console.log("filters",filters);
      // console.log("filters every",Object.values(searchFormValues));
      // console.log("sorting",sorter);

      // if (!Object.values(filters).every(ele=>ele)){
      // dispatch(setSearchlist(true))
      // }

      // if (!Object.values(filters).every(ele=>ele)){
      //   const newObject=modifySearchFilterObject(filters)
      //   console.log("newObject",newObject);
      //   dispatch(setSearchFormValues(newObject))
      //   }
    };
  // ,[currentPage,pageSize]);
  //  const listWithKeys=list.map((item,index)=>({...item,key:index+1}))
  //  console.log(listWithKeys);
  //  console.log(pageSize)
  const onChangePagination = (page, pageSize) => {
    // console.log(page);
    // dispatch(setPage(page));
    // dispatch(setPageSize(pageSize));

    if (!Object.values(searchFormValues).some((ele) => ele)) {
      if (page !== currentPage) {
        dispatch(setPage(page));
      }
      if (pageSize !== pageSize) {
        dispatch(setPageSize(pageSize));
      }
    } else {
      if (page !== searchedCurrentPage) {
        dispatch(setSearchedCurrentPage(page));
      }
      if (pageSize !== searchedPageSize) {
        dispatch(setSearchedPageSize(pageSize));
      }
    }

    // dispatch(fetchUserList({page,pageSize}))
  };

  const myArr = [
    { name: "Akshay", marks: 20 },
    { name: "Akshay", marks: 20 },
    { name: "Akshay", marks: 20 },
    { name: "Kisna", marks: 20 },
  ];

  const uniArr = myArr.filter((ele, i) => myArr.indexOf(ele.name) === i);
  console.log("uniArr", uniArr);

  return (
    <>
      {contextHolder}

      {isLoading ? (
        isError ? (
          <div>Error Occurred</div>
        ) : (
          // <div>Loading Data</div>
          <Loading />
        )
      ) : (
        // alert("loading")
        <div className="salesManagerContainer">
          {/* <Button variant="contained" onClick={()=>{localStorage.removeItem("user1");}}>Logout</Button> */}

          {/* <Collapse
    
      size="small"
      items={[{ key: '1', label: 'Search', children: <CustomSalesReportSearch /> }]}
    /> */}
          <CustomSalesReportSearch
            setSearchFormValuesLocal={setSearchFormValuesLocal}
            setSortingValuesLocal={setSortingValuesLocal}
          />
          {/* <Button onClick={()=>dispatch(setPage(2))}>2</Button> */}
          {
            // searchFormValues?

            //   <CustomDownload csvData={csvData} headers={SalesReportHeaders}/>

            // :

            //   <CustomDownload csvData={csvData} headers={SalesReportHeaders}/>
            <CustomDownload selectedData={selectedRowKeys} searchFormValues={searchFormValues} />
          }
          {/* <CustomDownload csvData={csvData} headers={headers}/>Page Range */}

          <div>
            <Table
              // rowKey={record=>record.id}
              size="small"
              rowSelection={rowSelectionCustom}
              columns={columns}
              dataSource={list}
              scroll={{
                x: 1500,
              }}
              pagination={
                Object.values(searchFormValues).some((ele) => ele)
                  ? { current: searchedCurrentPage, total, pageSize: searchedPageSize }
                  : { current: currentPage, total, pageSize }
              }
              onChange={handleTableChange}
              // rowKey='id'
              loading={isLoading}
              // pagination={false}
            />

            {/* <Pagination current={Object.values(searchFormValues).some(ele=>ele)?searchedCurrentPage:currentPage} onChange={onChangePagination}  total={total} pageSize={Object.values(searchFormValues).some(ele=>ele)?searchedPageSize:pageSize} /> */}
          </div>

          <div>
            <CustomSalesReportModal
              open={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              defaultValues={defaultValuesForEdit}
              onCreate={onCreate}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SalesReport;
