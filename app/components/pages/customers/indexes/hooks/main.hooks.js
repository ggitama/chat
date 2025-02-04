import FilterHelper from "@/util/cms/filter.helper"
import FormHelper from "@/util/cms/form.helper"
import { IdentityApi } from "app/api/helper"
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

    let {isError,pagination,resultData} = await IdentityApi.fetchCustomerDatatable(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }
    
    dispatch({type:"LOAD_SUCCESS",data:resultData,pagination})
    dispatch({type:"IS_READY",data:true})
  },[])

  const handleGetSummary = useCallback(async(options={})=>{
    dispatch({type:"LOAD_SUMMARY_START",data:false})
    let {
      filter:filterPayload=[]
    } = options

    let query = {}
    filterPayload.map(row=>{
      if(row.data 
        && typeof row.search.value!="undefined" 
        && row.search.value!==""){
        query[row.data] = row.search.value
      }
      
      return row
    })

    let {isError,pagination,resultData} = await IdentityApi.fetchCustomerSummary(query)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }
    dispatch({type:"LOAD_SUMMARY",data:resultData})
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
        // handleGetListData({pageSize})
        break;
      case 'currentPage':
        if(state?.pagination?.currentPage == currentPage) return
        dispatch({type:"CHANGE_CURRENTPAGE",data:{
          currentPage
        }})
        // handleGetListData({currentPage})
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

  const handleModalEditSubmit = async(formData,callback)=>{
    let dataFromState = state.IS_SHOW_MODAL_EDIT?.dataRow

    try {
      let formPayload = FormHelper.formDataValueOnly(formData)

      dispatch({type:"IS_SHOW_MODAL_EDIT",data:{
        isPromise:true,
        dataRow:dataFromState
      }})

      let payload = {
        ...formPayload,
        uuid:dataFromState.uuid
      }
      let response = await IdentityApi.fetchSubmitEdit(payload)
      let {isError,resultData} = response

      let methodNotif = (isError) ? "error" : "success"
      let message = (isError) ? isError : "Customer updated"
  
      NotificationManager[methodNotif](message)

      callback()
      dispatch({type:"IS_SHOW_MODAL_EDIT",dataRow:false})
      handleGetListData()
    } catch (error) {
      dispatch({type:"IS_SHOW_MODAL_EDIT",data:{
        isPromise:false,
        dataRow:dataFromState
      }})
    }
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
    handleGetSummary,
    filterOnSubmit,
    filterOnChange,
    filterEvent,
    handleModalEditSubmit,
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
    if(!state.IS_READY) return 
    if(!state.IS_APPLY_FILTER) return
    console.log("on change, filter submit")
    handler.handleGetListData({
      currentPage:1,
      pageSize:state.pagination.pageSize,
      filter:state.DATA_FILTER,
      orderBy:state.DATA_SORT
    })

    handler.handleGetSummary({
      filter:state.DATA_FILTER
    })
  },[state.IS_APPLY_FILTER])

}
