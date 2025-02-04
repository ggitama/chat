import { Divider } from "antd";
import { blue, green, red } from "@ant-design/colors";

export const dataTest = (dataPageSize)=>{
  let tempData = []
  for (let i = 1; i <= dataPageSize; i++) {
    tempData.push({
      key: i,
      userId: i,
      email: "Testeroke@mailinator.com",
      phoneNumber: `${i}2`,
      role: `New York No. ${i} Lake Park`,
    });
  }
  return tempData
}

export const columnsTable = ({
  setIsModalUpdateShow, 
  setIsModalEditShow,
  setIsModalCreateFormShow,
  pageCurrentPage=0,
  pageSize
}) => {
  
  let columns = [
    {
      title: "#",
      dataIndex: "uuid",
      key: "uuid",
      align: "center",
      width:25,
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
            onClick={() =>
              setIsModalCreateFormShow({
                isLoadingPromise: false,
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
      dataIndex: "uuid",
      key: "uuid",
      width:"20%",
      render:(text,record)=>{
        return(
        <div>
          <button
            className="gx-mb-0 gx-btn-clear"
            style={{ color: blue[5] }}
            onClick={() =>
              setIsModalEditShow({ isLoadingPromise: false, data: record })
            }
          >
            Edit
          </button>
          <Divider type="vertical" />
          <button
            className="gx-mb-0 gx-btn-clear"
            onClick={() =>
              setIsModalUpdateShow({ isLoadingPromise: false, data: record })
            }
            style={{ color: record.status === "Active" ? red[5] : green[5] }}
          >
            {record.status === "Active" ? "Inactivate" : "Activate"}
          </button>
        </div>
        )
      }
    },
  ];

  return columns
}

export const formFilterScheme = () => [
  {
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
    style: "ant-btn gx-btn-secondary ",
  },
];