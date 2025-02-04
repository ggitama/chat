import { ButtonLabel } from "@/components/Cms/Buttons";
import ColorHelper from "@/util/cms/color.helper";
import DataTableHelper from "@/util/cms/datatable.helper";
import { Button } from "antd";

export const columnsTable = (
  props
) => {
  const {
    state,
    dispatch
  } = props
  
  let columns = [
    {
      title: "#",
      dataIndex: "name",
      key: "name",
      align: "center",
      width:"15",
      fixed: true,
      render:(text,row,index)=>{
        return index+1
      }
    },
    {
      title: "Config Name",
      dataIndex: "name",
      key: "name",
      width: "200",
      fixed: true,
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
      width:"10",
      render:(text,record)=>{
        return (
          <ButtonLabel
            label="Edit"
            onClick={(value)=>{
              dispatch({type:"IS_SHOW_MODAL_EDIT",data:{
                isPromise:false,
                dataRow:record
              }})
            }}
          />
        )
      }
    },
  ];

  // columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}