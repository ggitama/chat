import { PromoCmsAudits } from "app/api/helper"
import { NotificationManager } from "react-notifications"

const { useCallback } = require("react")

export const useTgiwHooks = (state,dispatch)=>{

  const handleGetListData = useCallback(async(params={})=>{
    let {
      currentPage:newCurrentPage,
      pageSize:newPageSize
    } = params

    let pageSize = newPageSize || state?.pagination?.pageSize
    let payload = {
      columns:[],
      orders:[],
      pageSize,
      pageNumber:newCurrentPage || state?.pagination?.currentPage-1
    }

    let {isError,pagination,resultData} = await PromoCmsAudits.fetchAuditsPromoDatatable(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }
    
    dispatch({type:"LOAD_SUCCESS",data:resultData})
  },[state.DATA_FILTER])

  const handleChangePagination = async({
    type:eventType,
    pageSize,
    currentPage,
  })=>{
    
    switch(eventType){
      case 'pageSize':
        if(state?.pagination?.pageSize == pageSize) return
        dispatch({type:"CHANGE_PAGESIZE",data:{
          pageSize
        }})
        handleGetListData({pageSize})
        break;
      case 'currentPage':
        if(state?.pagination?.currentPage == currentPage) return
        dispatch({type:"CHANGE_CURRENTPAGE",data:{
          currentPage
        }})
        handleGetListData({currentPage})
        break;
      }
  }

  const handlerNewSubmit = async(editFormData,handleClearFormData)=>{
    const data = state?.IS_SHOW_MODAL_CREATE?.data
    dispatch({type:"IS_SHOW_MODAL_CREATE",data:{
      isPromise:true,
      data
    }})

    // api helper here
    setTimeout(() => {
      console.log("waiting")
      dispatch({type:"IS_SHOW_MODAL_CREATE",data:false})
      handleGetListData({pageNumber:1,pageSize:state?.pagination?.pageSize})
    }, 1200);

  }

  return {
    handleGetListData,
    handleChangePagination,
    handlerNewSubmit
  }
}

