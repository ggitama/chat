import FilterHelper from "@/util/cms/filter.helper"
import { BookingApi } from "app/api/helper"
import { NotificationManager } from "react-notifications"

const { useCallback, useEffect } = require("react")

export const useMainHooks = (state,dispatch)=>{

  const handleGetListData = useCallback(async(params={})=>{
    let {
      currentPage:newCurrentPage,
      pageSize:newPageSize,
      filter,
      orderBy:newOrderArray,
    } = params

    let filterInputDataValue = filter || []
    let pageSize = newPageSize || 10
    let orderArray = newOrderArray || []
    let pageNumber = newCurrentPage || 0

    let payload = {
      columns:filterInputDataValue,
      orders:orderArray,
      pageSize,
      pageNumber
    }

    let {isError,pagination,resultData} = await BookingApi.fetchSalesTourDatatable(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }
    
    dispatch({type:"LOAD_SUCCESS",data:resultData,pagination})
    dispatch({type:"IS_READY",data:true})
  },[])

  const handleGetSummariesData = useCallback(async(activeTab,options={})=>{
    dispatch({type:"CARD_SUMMARIES_START",data:resultData,pagination})

    let payload = {
      type:activeTab,
      columns:options.filter || []
    }

    let {isError,pagination,resultData} = await BookingApi.fetchSalesBookingManagementSummary(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }

    dispatch({type:"CARD_SUMMARIES_LOADED",data:resultData,pagination})
  },[])

  const handleExportData = useCallback(async(params={})=>{
    let {
      filter
    } = params

    let payload = {
      columns:filter,
      orders:[]
    }

    let {isError,pagination,resultData} = await BookingApi.fetchSalesTourExport(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }

    window.open(resultData.path,"_blank")
  },[])

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
        break;
      case 'currentPage':
        if(state?.pagination?.currentPage == currentPage) return
        dispatch({type:"CHANGE_CURRENTPAGE",data:{
          currentPage
        }})
        break;
      }
  }

  const filterEvent = FilterHelper.handlerFilterEvents
  const filterOnChange = async(data)=>{
    dispatch({type:"DATA_FILTER",data})
    dispatch({type:"IS_APPLY_FILTER",data:false})
  }

  const filterOnSubmit = async()=>{
    let validatedFilter = FilterHelper.handlerFilterValidate(state.FORM_FILTER)
    let {isError,updatedDataFilters} = validatedFilter
    let dateFilter = FilterHelper.filterDateFormated([
      "dateStart",
      "dateEnd",
      "departureDate"
    ],updatedDataFilters)
    
    updatedDataFilters  = FilterHelper.filterMapDateFormated(dateFilter,updatedDataFilters)

    if(isError.length>0){
      let errorMessage = `${isError.join(",")} can't be empty`
      dispatch({type:"HAS_ERROR",data:errorMessage})
      return
    }

    dispatch({type:"HAS_ERROR",data:false})
    dispatch({type:"APPLY_FILTER",
      data:updatedDataFilters,
      pagination:{
        currentPage:1,
        pageSize:state.pagination.pageSize
      }
    })
  }

  const filterOnDownload = async()=>{
    let validatedFilter = FilterHelper.handlerFilterValidate(state.FORM_FILTER)
    let {isError,updatedDataFilters} = validatedFilter

    handleExportData({
      filter:updatedDataFilters
    })
  }

  const sortableOnChange = async(dataSort)=>{
    let validatedFilter = FilterHelper.handlerFilterValidate(state.FORM_FILTER)
    let {isError,updatedDataFilters} = validatedFilter

    dispatch({type:"IS_ON_LOADING_TABLE",data:true})
    dispatch({type:"DATA_SORT",data:dataSort})
  }  

  return {
    handleGetListData,
    handleChangePagination,
    handleGetSummariesData,
    filterOnSubmit,
    filterOnChange,
    filterEvent,
    filterOnDownload,
    sortableOnChange
  }
}

export const useEffectMains = (state,handler)=>{
  // on change current page
  useEffect(()=>{
    if(!state.IS_READY) return 
    console.log("on change, current page")
    handler.handleGetListData({
      currentPage:state.pagination?.currentPage,
      pageSize:state.pagination.pageSize,
      filter:state.DATA_FILTER,
      orderBy:state.DATA_SORT
    })
  },[state.pagination?.currentPage])

  // on change page size
  useEffect(()=>{
    if(!state.IS_READY) return 
    console.log("on change, page size")
    handler.handleGetListData({
      currentPage:1,
      pageSize:state.pagination.pageSize,
      filter:state.DATA_FILTER,
      orderBy:state.DATA_SORT
    })
  },[state.pagination?.pageSize])

  // on change sort
  useEffect(()=>{
    if(!state.IS_READY) return 
    console.log("on change, filter sort")
    handler.handleGetListData({
      currentPage:state.pagination?.currentPage,
      pageSize:state.pagination.pageSize,
      filter:state.DATA_FILTER,
      orderBy:state.DATA_SORT
    })
  },[state.DATA_SORT])

  // on change data filter
  useEffect(()=>{
    console.log("test")
    if(!state.IS_READY) return 
    if(!state.IS_APPLY_FILTER) return
    console.log("on change, filter submit")
    handler.handleGetListData({
      currentPage:1,
      pageSize:state.pagination.pageSize,
      filter:state.DATA_FILTER,
      orderBy:state.DATA_SORT
    })
    // handler.handleGetSummariesData("tour",{
    //   filter:state.DATA_FILTER,
    // })
  },[state.IS_APPLY_FILTER])

}


