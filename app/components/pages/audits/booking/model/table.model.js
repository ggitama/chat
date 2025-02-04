
import DataTableHelper from "@/util/cms/datatable.helper";
import {ButtonLabel} from "@/components/Cms/Buttons"
import * as moment from "moment-timezone"

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
      dataIndex: "_rawId",
      key: "_rawId",
      align: "center",
      width:45,
      fixed: true,
      render:(text,row,index)=>{
        return DataTableHelper.rowNumber(index,{
          currentPage:state?.pagination?.currentPage,
          pageSize:state?.pagination?.pageSize
        })
      }
    },
    {
      title: "Event Type",
      dataIndex: "eventType",
      key: "eventType",
      width: 100,
      fixed: true,
    },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      width: 150,
    },
    {
      title: "Event Description",
      dataIndex: "eventDescription",
      key: "eventDescription",
      width: 300,
    },
    {
      ...DataTableHelper.sortableAttr({
        title:"Event Date",
        dataIndex:"eventDateTime",
        props
      }),
      width: 150,
      render: (text, row, index) => {
        return row.eventDateTime ? moment.tz(row.eventDateTime, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-'
      },
    },
    {
      title: "Object Name",
      dataIndex: "objectName",
      key: "objectName",
      width: 100,
    },
    {
      title: "Object ID",
      dataIndex: "objectId",
      key: "objectId",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "uuid",
      key: "uuid",
      width:100,
      render:(value,row)=>{
        return <ButtonLabel label={"View"} onClick={()=>{
          dispatch({type:"IS_SHOW_MODAL_VIEW",data:{
            isPromise:false,
            dataRow:row
          }})
        }}/>
      }
    },
  ];

  // columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}