
import DataTableHelper from "@/util/cms/datatable.helper";
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
        return DataTableHelper.rowNumber(index,{
          currentPage:state?.pagination?.currentPage,
          pageSize:state?.pagination?.pageSize
        })
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      weight:6,
    }
  ];

  columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}