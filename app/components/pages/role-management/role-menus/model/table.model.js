
import { Typography } from "antd";
import { CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";
import DataTableHelper from "@/util/cms/datatable.helper";

const { Text } = Typography;

export const columnsTable = (
  props
) => {
  const {
    state
  } = props
  
  let columns = [
    {
      title: "#",
      dataIndex: "name",
      key: "name",
      align: "center",
      weight:1,
      render:(text,row,index)=>{
        return index+1
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      weight:7,
    },
    {
      title: "Is Granted",
      dataIndex: "isGranted",
      key: "isGranted",
      align: "center",
      weight:2,
      render:(value,row)=>{
        if(value==null) return null

        let textType = "danger"
        let icon = <CloseSquareOutlined/>
        if(value){
          textType = "success"
          icon = <CheckSquareOutlined/>
        }

        return (
          <Text type={textType}>{icon}</Text>
        )
      }
    }
  ];

  columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}