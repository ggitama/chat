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
      dataIndex: "key",
      key: "key",
      align: "center",
      width:"5%",
      render:(text,row,index)=>{
        let rowIndex = pageSize*(pageCurrentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title: "Menu",
      dataIndex: "label",
      key: "label",
      width: "200",
    },
  ];

  return columns
}