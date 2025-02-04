import { CmsCrumbs, CmsFilter, CmsLoader, CmsTable, CmsTableRow } from "@/components/Cms"
import { 
  columnsTable, crumbItems, initialState, 
  ModalEdit, 
  reducer, useMainHooks 
} from "@/components/pages/customer-support/indexes"
import DataTableHelper from "@/util/cms/datatable.helper"
import { useEffect, useReducer } from "react"

const ScreenPage = (props)=>{
  const pageTitle = "Customer Supports"

  const{screenHeight,screenWidth} = props
  const tableHeight = DataTableHelper.tableHeight(screenHeight)
  const tableConfig = DataTableHelper.tableConfig(tableHeight)

  const [state,dispatch] = useReducer(reducer,initialState)

  const handler = useMainHooks(state,dispatch)

  useEffect(()=>{
    handler.handleGetListData()
  },[handler.handleGetListData])

  if(state.IS_ON_LOADING && !state.DATA_LIST?.length){
    return (<CmsLoader customHeight={tableHeight} text="Loading"/>)
  }

  return (
  <>
    <CmsCrumbs
      items={crumbItems()}
    />

    <CmsTable
      title={pageTitle}
      tableConfig={tableConfig}
      columnsTable={columnsTable}
      listData={state?.DATA_LIST}
      props={{state,dispatch,handler}}
      pageSizeOptions={false}
    />

    <ModalEdit
      props={{state,dispatch,handler}}
    ></ModalEdit>
  </>
  )
}

export default ScreenPage