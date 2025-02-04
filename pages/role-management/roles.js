import { CmsCrumbs, CmsFilter, CmsLoader, CmsTable } from "@/components/Cms"
import { columnsTable, crumbItems, initialState, reducer, useMainHooks } from "@/components/pages/role-management/roles"
import DataTableHelper from "@/util/cms/datatable.helper"
import { useCallback, useEffect, useReducer, useState } from "react"

const ScreenPage = (props)=>{
  const pageTitle = "Roles"

  const{screenHeight,screenWidth} = props
  const tableHeight = DataTableHelper.tableHeight(screenHeight)
  const tableConfig = DataTableHelper.tableConfig(tableHeight)

  const [state,dispatch] = useReducer(reducer,initialState)

  const handler = useMainHooks(state,dispatch)

  useEffect(() => {
    dispatch({type:"LOAD_START",data:{
      currentPage:1,
    }})
    handler.handleGetListData();
  }, [handler.handleGetListData]);

  if(state.IS_ON_LOADING && !state.DATA_LIST?.length){
    return (<CmsLoader customHeight={tableHeight} text="Loading"/>)
  }

  return (
  <>
    <CmsCrumbs
      items={crumbItems()}
    />
    
    <CmsFilter
      filterFormData={state.FORM_FILTER}
      props={{state,dispatch}}
    />

    <CmsTable
      title={pageTitle}
      tableConfig={tableConfig}
      columnsTable={columnsTable}
      listData={state?.DATA_LIST}
      props={{state,dispatch,handler}}
      pageSizeOptions={false}
    />
  </>
  )
}

export default ScreenPage