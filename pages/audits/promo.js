import { 
  CmsCrumbs, 
  CmsFilter, 
  CmsLoader, CmsTable, CmsTableRow
} from "@/components/Cms"
import {  reducer,initialState, ModalViewContent, useModalViewHooks } from "@/components/pages/audits/booking"
import { 
  columnsTable,
  crumbItems,
  schemeFilterTable, 
  useEffectMains, 
  useMainHooks
} from "@/components/pages/audits/promo"
import { sharedTabModel } from "@/components/pages/audits/indexes"

import DataTableHelper from "@/util/cms/datatable.helper"
import { Tabs } from "antd"
import { useRouter } from "next/router"
import { useEffect, useReducer } from "react"
import { CmsModal } from "@/components/Cms/Modals"

const ScreenPage = (props)=>{
  const pageTitle = "Audits"
  const router = useRouter()

  const{screenHeight,screenWidth} = props
  const tableHeight = DataTableHelper.tableHeight(screenHeight)
  const tableConfig = DataTableHelper.tableConfig(tableHeight)

  const [state,dispatch] = useReducer(reducer,initialState)

  useEffect(()=>{
    dispatch({type:"FORM_FILTER",data:schemeFilterTable()})
  },[])

  useEffect(()=>{
    console.log("table loading change promo",state.IS_ON_LOADING_TABLE)
  },[state.IS_ON_LOADING_TABLE])

  const handler = useMainHooks(state,dispatch)

  useEffect(()=>{
    handler.handleGetListData()
  },[])

  useEffectMains(state,handler)

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
      pageSizeOptions={[10,25,50,100]}
    >
      <CmsTableRow key={"prepend"}>

        <Tabs 
          items={sharedTabModel()}
          defaultActiveKey={"promo"}
          onChange={(tabKey)=>{
            dispatch({type:"CHANGE_TAB"})
            router.push(`/audits/${tabKey}`)
          }}
        ></Tabs>

        <CmsFilter
          filterFormData={state.FORM_FILTER}
          props={{state,dispatch,handler}}
        />
      </CmsTableRow>

    </CmsTable>

    <CmsModal
      title={"View Audit Promo"}
      hasTitleKey={false}
      stateKey={"IS_SHOW_MODAL_VIEW"}
      props={{state,dispatch,handler}}
      modalHooks={useModalViewHooks}
      labelConfirm={false}
      labelClose={"Close"}
      onClickClose={(footerHandler)=>{
        footerHandler.handleClearFormData()
      }}
      onClickConfirm={(activeFormData,footerHandler)=>{
        footerHandler.handleModalEditSubmit(activeFormData,
          // passing callback so it's readble for the button action
          // execute after submit done
          ()=>{
            footerHandler.handleClearFormData()
          }
        )
      }}
    >
      <ModalViewContent></ModalViewContent>
    </CmsModal>
  </>
  )
}

export default ScreenPage