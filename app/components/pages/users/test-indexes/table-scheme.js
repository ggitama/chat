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
      dataIndex: "userRoleId",
      key: "userRoleId",
      align: "center",
      width:15,
      fixed: true,
      render:(text,row,index)=>{
        let rowIndex = pageSize*(pageCurrentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
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
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
      width:"20%"
    },
    {
      title: "Action",
      dataIndex: "userRoleId",
      key: "userRoleId",
      width:"20%",
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