import { Divider } from "antd";
import { blue, green, red } from "@ant-design/colors";

export const columnsTable = ({props}) => {
  const [
    {pageSize,currentPage:pageCurrentPage},
    {
      setIsModalEditShown,setIsModalViewShown
    }
  ] = props

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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width:"20%"
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width:"20%"
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
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
              setIsModalEditShown({ isLoadingPromise: false, data: record })
            }
          >
            Edit
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
    label: "Email",
    type: "Input",
    field: "email",
    value: "",
    width: "25%"
  },

  {
    label: "Name",
    type: "Input",
    field: "name",
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