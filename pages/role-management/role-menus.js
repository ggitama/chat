import { CmsCrumbs, CmsFilter, CmsLoader, CmsTable, CmsTableRow } from "@/components/Cms"
import { CmsSelect } from "@/components/Cms/Form"
import { 
  columnsTable, crumbItems, initialState, 
  reducer, useMainHooks 
} from "@/components/pages/role-management/role-menus"
import DataTableHelper from "@/util/cms/datatable.helper"
import { useCallback, useEffect, useReducer, useState } from "react"

const ScreenPage = (props)=>{
  const pageTitle = "Role Menus"

  const{screenHeight,screenWidth} = props
  const tableHeight = DataTableHelper.tableHeight(screenHeight)
  const tableConfig = DataTableHelper.tableConfig(tableHeight)

  const [state,dispatch] = useReducer(reducer,initialState)

  const handler = useMainHooks(state,dispatch)

  if(state.IS_ON_LOADING && !state.DATA_LIST?.length){
    return (<CmsLoader customHeight={tableHeight} text="Loading"/>)
  }

  useEffect(()=>{
    handler.handleGetMenus()
    handler.handleGetRoles()
  },[state.DATA_MENU])

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
    >

      <CmsTableRow key="prepend">
        <CmsSelect
          label={"Role"}
          className={"gx-w-25"}
          isSingleLine={true}
          placeholder={"Please select role"}
          onChange={(selectedValue)=>{
            handler.handleFetchRoleMenus({role:selectedValue})
          }}
          options={[
            {value:"user",label:"User"},
            {value:"admin",label:"Admin"},
            {value:"superadmin",label:"Superadmin"},
          ]}
        />
      </CmsTableRow>

    </CmsTable>
  </>
  )
}

export default ScreenPage