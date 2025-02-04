import { 
  CmsCrumbs, 
  CmsFilter, 
  CmsLoader, CmsTable, CmsTableRow, 
} from "@/components/Cms"
import { CmsModal } from "@/components/Cms/Modals"
import { 
  columnsTable,
  crumbItems, initialState, ModalEditContent, ModalViewContent, reducer, 
  schemeFilterTable, 
  useEffectMains, 
  useMainHooks,
  useModalEditHooks,
  useModalViewHooks
} from "@/components/pages/customers/indexes"
import { CardSummary } from "@/components/pages/customers/indexes/CardSummary"

import DataTableHelper from "@/util/cms/datatable.helper"
import { Divider } from "antd"
import { useEffect, useReducer } from "react"

const ScreenPage = (props)=>{
  const pageTitle = "Customer Management"

  const{screenHeight,screenWidth} = props
  const tableHeight = DataTableHelper.tableHeight(screenHeight)
  const tableConfig = DataTableHelper.tableConfig(tableHeight)

  const [state,dispatch] = useReducer(reducer,initialState)

  useEffect(()=>{
    dispatch({type:"FORM_FILTER",data:schemeFilterTable()})
  },[])

  const handler = useMainHooks(state,dispatch)

  useEffect(()=>{
    handler.handleGetSummary()
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

        <Divider orientation="left" orientationMargin="0">
          <h5>Summary</h5>
        </Divider>
        <CardSummary props={{state}}/>

        <Divider orientation="left" orientationMargin="0">
          <h5>Customer(s)</h5>
        </Divider>
        <CmsFilter
          filterFormData={state.FORM_FILTER}
          props={{state,dispatch,handler}}
        />
      </CmsTableRow>

    </CmsTable>

    <CmsModal
      title={"Customer Detail"}
      hasTitleKey={false}
      stateKey={"IS_SHOW_MODAL_VIEW"}
      props={{state,dispatch,handler}}
      modalHooks={useModalViewHooks}
      labelConfirm={false}
      labelClose={"Close"}
      onClickClose={(footerHandler)=>{
        footerHandler.handleClearFormData()
      }}
    >
      <ModalViewContent></ModalViewContent>
    </CmsModal>

    <CmsModal
      title={"Customer Detail"}
      hasTitleKey={"email"}
      stateKey={"IS_SHOW_MODAL_EDIT"}
      props={{state,dispatch,handler}}
      modalHooks={useModalEditHooks}
      labelConfirm={"Update Customer"}
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
      <ModalEditContent></ModalEditContent>
    </CmsModal>
  </>
  )
}

export default ScreenPage