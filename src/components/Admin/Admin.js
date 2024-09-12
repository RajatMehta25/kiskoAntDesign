import { Button, Table, Tag } from "antd";
import React, { useState } from "react";
import { FaPen } from "react-icons/fa6";
import CustomAdminModal from "../RedX/CustomModal/CustomAdminModal";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultValuesForEdit, setDefaultValuesForEdit] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCreate = (values) => {
    console.log("modal values", values);
    setIsModalOpen(false);
  };

  const userListData = [
    { id: 1, user: "john@kysco.com", use_case: ["Zedx"], modules_screens: ["redx_sales_report"] },
    { id: 2, user: "bill@kysco.com", use_case: ["Admin"], modules_screens: ["redx_sales_report", "redx_daily_issue_report"] },
  ];

  const Columns = [
    {
      title: (
        <div
        // style={{width:"2rem",display:"flex",justifyContent:"space-between"}}
        >
          User
          {/* {sortingValuesLocal.depot===undefined||sortingValuesLocal?.depot==="descend"
      ?
      <CaretUpOutlined  style={{color:sortingValuesLocal?.depot?'#1677ff':'rgba(0, 0, 0, 0.29)',cursor:"pointer"}}  
      onClick={()=>customSort("depot","ascend")} />
      :
      sortingValuesLocal?.depot==="ascend"
      ?
      <CaretDownOutlined  style={{color:sortingValuesLocal?.depot?'#1677ff':'rgba(0, 0, 0, 0.29)',cursor:"pointer"}}  
      onClick={()=>customSort("depot","descend")} 
      />
    :
    false
    } */}
        </div>
      ),
      dataIndex: "user",
      key: "user",
      render: (text) => (text ? text : "-"),
      // ...getColumnSearchProps('depot'),
    },
    {
      title: (
        <div
        // style={{width:"2rem",display:"flex",justifyContent:"space-between"}}
        >
          Use Case
          {/* {sortingValuesLocal.depot===undefined||sortingValuesLocal?.depot==="descend"
      ?
      <CaretUpOutlined  style={{color:sortingValuesLocal?.depot?'#1677ff':'rgba(0, 0, 0, 0.29)',cursor:"pointer"}}  
      onClick={()=>customSort("depot","ascend")} />
      :
      sortingValuesLocal?.depot==="ascend"
      ?
      <CaretDownOutlined  style={{color:sortingValuesLocal?.depot?'#1677ff':'rgba(0, 0, 0, 0.29)',cursor:"pointer"}}  
      onClick={()=>customSort("depot","descend")} 
      />
    :
    false
    } */}
        </div>
      ),
      dataIndex: "use_case",
      key: "use_case",
      render: (text) => (text ? text : "-"),
      // ...getColumnSearchProps('depot'),
    },
    {
      title: (
        <div
        // style={{width:"2rem",display:"flex",justifyContent:"space-between"}}
        >
          Module Access
          {/* {sortingValuesLocal.depot===undefined||sortingValuesLocal?.depot==="descend"
      ?
      <CaretUpOutlined  style={{color:sortingValuesLocal?.depot?'#1677ff':'rgba(0, 0, 0, 0.29)',cursor:"pointer"}}  
       onClick={()=>customSort("depot","ascend")} 
      />
      :
      sortingValuesLocal?.depot==="ascend"
      ?
      <CaretDownOutlined  style={{color:sortingValuesLocal?.depot?'#1677ff':'rgba(0, 0, 0, 0.29)',cursor:"pointer"}}  
       onClick={()=>customSort("depot","descend")} 
      />
    :
    false
    } */}
        </div>
      ),
      dataIndex: "modules_screens",
      key: "modules_screens",
      render: (text) => (text ? text.map((ele, i) => <Tag key={i}>{ele}</Tag>) : "-"),

      // ...getColumnSearchProps('depot'),
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
            onClick={() => {
              setDefaultValuesForEdit(record);

              // dispatch(setDefaultValuesForEdit(record))
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

  return (
    <div>
      <div>
        <Button color="primary" onClick={showModal}>
          Add
        </Button>
      </div>

      <Table
        size="small"
        columns={Columns}
        dataSource={userListData}
        scroll={{
          x: 1500,
        }}
      />
      <div>{/* <CustomAdminModal open={isModalOpen}  setIsModalOpen={setIsModalOpen}  onCreate={onCreate}/> */}</div>
      <div>
        <CustomAdminModal
          open={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          defaultValues={defaultValuesForEdit}
          onCreate={onCreate}
        />
      </div>
    </div>
  );
};

export default Admin;
