
import { ButtonLabel } from "@/components/Cms/Buttons";
import DataTableHelper from "@/util/cms/datatable.helper";

export const columnsTable = (
  props
) => {
  const {
    state,dispatch
  } = props
  
  let columns = [
    {
      title: "#",
      dataIndex: "userRoleId",
      key: "userRoleId",
      align: "center",
      width:15,
      fixed: true,
      render:(text,row,index)=>{
        return DataTableHelper.rowNumber(index,{
          currentPage:state?.pagination?.currentPage,
          pageSize:state?.pagination?.pageSize
        })
      }
    },
    {
      ...DataTableHelper.sortableAttr({
        title: "Email",
        dataIndex: "email",
        props
      }),
      width: 150,
      fixed: true,
      render:(text,row,index)=>{
        return text
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
        return <ButtonLabel label={"Edit"} onClick={()=>{
          dispatch({type:"IS_SHOW_MODAL_EDIT",data:{
            isPromise:false,
            dataRow:record
          }})
        }}/>
      }
    },
  ];

  // columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}