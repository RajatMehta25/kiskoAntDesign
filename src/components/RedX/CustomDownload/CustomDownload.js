import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { Button } from "antd";
import { FaFileArrowDown } from "react-icons/fa6";

const CustomDownload = ({ selectedData, tableData, headers, csvData, searchFormValues }) => {
  const [downloadURL, setDownloadURL] = useState();
  const [activePage, setActivePage] = useState();

  useEffect(() => {
    CurrentUrl();
  }, [window.location.pathname, selectedData]);

  const exportRef = useRef(null);

  // http://127.0.0.1:2000/app_redx/download_sales_report/1,2,3,5,6,7/
  // http://127.0.0.1:2000/app_redx/download_sales_report/All/
  // http://127.0.0.1:2000/app_redx/daily_issue_download/All
  // http://127.0.0.1:2000/app_redx/daily_issue_download/1,2,3,4,5/

  // const headers=[
  //     {label:"Cus Name",key:"Cus Name"},
  //     {label:"ID",key:"ID"}
  //   ]
  const CurrentUrl = () => {
    switch (window.location.pathname) {
      case "/RedXSalesReport":
        if ((selectedData.length === 0 || selectedData === undefined) && !Object.values(searchFormValues).every((ele) => ele)) {
          setDownloadURL(`${process.env.REACT_APP_BASE_URL}` + `app_redx/download_sales_report/All`);
        } else if (
          (selectedData.length === 0 || selectedData === undefined) &&
          Object.values(searchFormValues).some((ele) => ele)
        ) {
          setDownloadURL(`${process.env.REACT_APP_BASE_URL}` + `app_redx/download_sales_report/AllSearch`);
        } else {
          // console.log("downloadSelectedd",selectedData?.join(","))
          const selectedDataString = selectedData?.join(",");
          setDownloadURL(`${process.env.REACT_APP_BASE_URL}` + `app_redx/download_sales_report/` + selectedDataString);
        }
        break;
      case "/RedXDailyIssueReport":
        if ((selectedData.length === 0 || selectedData === undefined) && Object.values(searchFormValues).length === 0) {
          setDownloadURL(`${process.env.REACT_APP_BASE_URL}` + `app_redx/daily_issue_download/All`);
        } else if ((selectedData.length === 0 || selectedData === undefined) && Object.values(searchFormValues).length > 0) {
          setDownloadURL(`${process.env.REACT_APP_BASE_URL}` + `app_redx/daily_issue_download/SearchAll`);
        } else {
          // console.log("downloadSelectedd",selectedData?.join(","))
          const selectedDataString = selectedData?.join(",");
          setDownloadURL(`${process.env.REACT_APP_BASE_URL}` + `app_redx/daily_issue_download/` + selectedDataString);
        }
        break;

      default:
        setDownloadURL("#");
        break;
    }
  };
  const csvLink = {
    filename: "Data.csv",
    headers: headers,
    data: csvData,
  };
  console.log("activeeeepAge", activePage);
  console.log("downloadURL", downloadURL);

  return (
    <div>
      {/* <Button 
    style={{
        minWidth: 190,
        }}
    icon={<FaFileArrowDown/>} type='link'   onClick={()=>{
      exportRef.current.link.click();
    }}>
      Download</Button>
 
    <CSVLink
    ref={exportRef}
  {...csvLink}
  hidden
  >Export</CSVLink> */}

      <Button
        icon={<FaFileArrowDown />}
        type="link"
        href={downloadURL ? downloadURL : "#"}
        download={`Download.csv`}
        target="_blank"
      >
        {`Download ${
          selectedData.length > 0
            ? "Selected Data"
            : Object.values(searchFormValues).length > 0
            ? "All Search Data"
            : "All Data"
        }`}
      </Button>
    </div>
  );
};

export default CustomDownload;
