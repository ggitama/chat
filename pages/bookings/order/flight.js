import { 
  CmsCrumbs, 
  CmsFilter, 
  CmsLoader, CmsTable, CmsTableRow, 
} from "@/components/Cms"
import { 
  columnsTable,
  crumbItems, initialState, reducer, 
  schemeFilterTable, 
  useEffectMains, 
  useMainHooks
} from "@/components/pages/bookings/order/flight"
import { CardSummary, sharedTabModel } from "@/components/pages/bookings/order/indexes"

import DataTableHelper from "@/util/cms/datatable.helper"
import { Col, Divider, Row, Tabs } from "antd"
import { useRouter } from "next/router"
import { useEffect, useReducer } from "react"

const ScreenPage = (props)=>{
  const pageTitle = "Booking Management Order"
  const router = useRouter()

  const{screenHeight,screenWidth} = props
  const tableHeight = DataTableHelper.tableHeight(screenHeight)
  const tableConfig = DataTableHelper.tableConfig(tableHeight)

  const [state,dispatch] = useReducer(reducer,initialState)

  // document on ready
  useEffect(()=>{
    dispatch({type:"FORM_FILTER",data:schemeFilterTable()})
  },[])

  const handler = useMainHooks(state,dispatch)

  // document on ready
  useEffect(()=>{
    handler.handleGetSummariesData("flight")
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
          defaultActiveKey={"flight"}
          onChange={(tabKey)=>{
            dispatch({type:"CHANGE_TAB"})
            router.push(`/bookings/order/${tabKey}`)
          }}
        ></Tabs>

        <Divider orientation="left" orientationMargin="0">
          <h5>Summary</h5>
        </Divider>
        <CardSummary props={{state}}/>

        <Divider orientation="left" orientationMargin="0">
          <h5>Flight Order(s)</h5>
        </Divider>
        <CmsFilter
          filterFormData={state.FORM_FILTER}
          props={{state,dispatch,handler}}
        />
        {console.log({
          state,dispatch,handler
        })}
      </CmsTableRow>

    </CmsTable>

  </>
  )
}

export default ScreenPage