import { Divider } from "antd";
import { blue, green, red } from "@ant-design/colors";

export const columnsTable = ({props}) => {
  let [
    {
      pageSize,
      currentPage:pageCurrentPage
    },
    {
      setIsModalViewShown,setIsModalEditShown
    }
  ] = props
  
  let columns = [
    {
      title: "#",
      dataIndex: "name",
      key: "name",
      align: "center",
      width:"5%",
      fixed: true,
      render:(text,row,index)=>{
        let rowIndex = pageSize*(pageCurrentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title: "Config Name",
      dataIndex: "name",
      key: "name",
      width: "200",
      fixed: true,
      render:(text,row,index)=>{
        return (
          <button
            className="gx-mb-0 gx-btn-clear"
            style={{ color: blue[5] }}
            onClick={() =>
              setIsModalViewShown({
                isLoadingPromise: false,
                data:row
              })
            }
          >
            <span> {text} </span>
          </button>
        )
      }
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width:"75"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width:"300"
    },
    {
      title: "Value 1",
      dataIndex: "value1",
      key: "value1",
      width:"75"
    },
    {
      title: "Value 2",
      dataIndex: "value2",
      key: "value2",
      width:"75"
    },
    {
      title: "Action",
      dataIndex: "name",
      key: "name",
      width:"15%",
      render:(text,record)=>{
        return(
        <div>
          <button
            className="gx-mb-0 gx-btn-clear"
            style={{ color: blue[5] }}
            onClick={() =>
              setIsModalEditShown({ isLoadingPromise: false, data: record })
            }
          >
            Edit
          </button>
          <Divider type="vertical" />
        </div>
        )
      }
    },
  ];

  return columns
}

export const schemeFilterTable = ()=>{
  return [{
    label: "Email",
    type: "Input",
    field: "email",
    value: "",
    width: "25%"
  },

  {
    label: "Apply Filter",
    type: "ButtonAction",
    disabled: false,
    width: "110px",
    style: "ant-btn gx-btn-secondary",
  }
  ]
}