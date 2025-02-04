import { Divider } from "antd";
import { blue, green, red } from "@ant-design/colors";
import Link from "next/link";

export const columnsTable = ({props}) => {
  let [
    {
      pageSize,currentPage:pageCurrentPage,
    },
    {
      setIsModalViewShown 
    }
  ] = props
  
  let columns = [
    {
      title: "#",
      dataIndex: "_rawId",
      key: "_rawId",
      align: "center",
      width:45,
      fixed: true,
      render:(text,row,index)=>{
        let rowIndex = pageSize*(pageCurrentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title: "Event Type",
      dataIndex: "eventType",
      key: "eventType",
      width: 100,
      fixed: true,
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      width: 150,
    },
    {
      title: "Event Description",
      dataIndex: "eventDescription",
      key: "eventDescription",
      width: 300,
    },
    {
      title: "Event Date",
      dataIndex: "eventDate",
      key: "eventDate",
      width: 150,
    },
    {
      title: "Object Name",
      dataIndex: "objectName",
      key: "objectName",
      width: 100,
    },
    {
      title: "Object ID",
      dataIndex: "objectId",
      key: "objectId",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "uuid",
      key: "uuid",
      width:100,
      render:(text,record)=>{
        return(
        <div>
          <button
            className="gx-mb-0 gx-btn-clear"
            style={{ color: red[5] }}
            onClick={() =>
              setIsModalViewShown({ isLoadingPromise: false, data: record })
            }
          >
            View
          </button>
        </div>
        )
      }
    },
  ];

  return columns
}

export const schemeFilterTable = () => [
  {
    label: "Search By Table Name",
    type: "Input",
    field: "objectName",
    value: "",
    width: "25%",
  },

  {
    label: "Apply Filter",
    type: "ButtonAction",
    disabled: false,
    width: "110px",
    style: "ant-btn gx-btn-secondary ",
  },
];