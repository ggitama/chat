import { 
  CmsCrumbs, CmsFilter, CmsLoader, CmsTable 
} from "@/components/Cms"
import { CmsButton } from "@/components/Cms/Buttons"
import { CmsModal } from "@/components/Cms/Modals"

import { 
  initialState, 
  reducer, 
  useTgiwHooks,
  schemeFilterTable, 
  crumbItems,
  columnsTable,
  useModalHooks,
  ModalCreate,
} from "@/components/pages/tgiw/indexes"
import DataTableHelper from "@/util/cms/datatable.helper"
import { useEffect, useReducer } from "react"

const ScreenPage = (props)=>{
  const pageTitle = "Datatables"
  const [state,dispatch] = useReducer(reducer,initialState)
  const{screenHeight,screenWidth} = props
  const tableHeight = DataTableHelper.tableHeight(screenHeight)
  const tableConfig = DataTableHelper.tableConfig(tableHeight)

  useEffect(()=>{
    dispatch({type:"FORM_FILTER",data:schemeFilterTable()})
  },[])

  const {
    handleGetListData,
    handleChangePagination,
    handlerNewSubmit
  } = useTgiwHooks(state,dispatch)

  useEffect(() => {
    dispatch({type:"LOAD_START",data:{
      currentPage:1,
    }})
    handleGetListData();
  }, [handleGetListData]);


  if(state.IS_ON_LOADING && !state.DATA_LIST?.length){
    return (<CmsLoader customHeight={tableHeight} text="Loading"/>)
  }

  const handler = {
    handleChangePagination,
    handlerNewSubmit
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
        title={"Datatable Sample"}
        tableConfig={tableConfig}
        columnsTable={columnsTable}
        listData={state?.DATA_LIST}
        props={{state,dispatch,handler}}
        pageSizeOptions={[10,25,50,100]}
        btnActions={(
          <CmsButton title="New Data" onClick={()=>{
            dispatch({type:"IS_SHOW_MODAL_CREATE",data:{
              isPromise:false
            }})
            return 
          }}/>
        )}
      />

      <ModalCreate
        props={{
          state,
          dispatch,
          handler
        }}
      />
    </>
  )
}

export default ScreenPage