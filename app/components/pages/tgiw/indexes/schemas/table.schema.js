import { Divider } from "antd";
import { blue, green, red } from "@ant-design/colors";
import DataTableHelper from "@/util/cms/datatable.helper";

export const crumbItems = ()=>{
  return [
    {
      breadcrumbName: 'Home',
      path:"/"
    },
    {
      breadcrumbName: 'TGIW',
      path:"/TGIW"
    },
    {
      breadcrumbName: 'datatable',
    }
  ]
}

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
      fixed: true,
      render:(text,row,index)=>{
        return DataTableHelper.rowNumber(index,{
          currentPage:state?.pagination?.currentPage,
          pageSize:state?.pagination?.pageSize
        })
      }
    },
    {
      title: "Description",
      dataIndex: "name",
      key: "name",
      weight:6,
    },
    {
      title: "Action",
      dataIndex: "name",
      key: "name",
      weight:3,
    },
  ];

  columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}