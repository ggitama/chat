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
      title: "Role",
      dataIndex: "label",
      key: "label",
      width: "200",
      fixed: true
    },
  ];

  return columns
}