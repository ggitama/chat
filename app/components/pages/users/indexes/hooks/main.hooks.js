import FilterHelper from "@/util/cms/filter.helper"
import FormHelper from "@/util/cms/form.helper"
import { formRequiredValidation } from "@/util/formValidation"
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
    
    if(orderArray.length == 0){
        orderArray.push({ key: "createdAt", value: "DESC" })
    } else if(orderArray.length > 1){
      orderArray = orderArray.filter(function( obj ) {
        return obj.key !== 'createdAt';
      });
    }
    
    let payload = {
      columns:filterInputDataValue,
      orders:orderArray,
      pageSize,
      pageNumber
    }

    let {isError,pagination,resultData} = await IdentityApi.fetchAdminDatatable(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }
    
    dispatch({type:"LOAD_SUCCESS",data:resultData,pagination})
    dispatch({type:"IS_READY",data:true})
  },[])

  const handleGetRoleList = useCallback(async(params={})=>{
    let {isError,pagination,resultData} = await IdentityApi.fetchRoleManagementRoles()
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }

    resultData = resultData.map(row=>{
      return {
        label:row.name,
        value:row.name
      }
    })
    dispatch({type:"INIT_ROLES",data:resultData})
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
        // ...formPayload,
        role:formPayload.role,
        email:formPayload.email,
        uuid:dataFromState.uuid
      }
      let response = await IdentityApi.fetchAdminUpdate(payload)
      let {isError,resultData} = response

      let methodNotif = (isError) ? "error" : "success"
      let message = (isError) ? isError : "User Updated"
  
      NotificationManager[methodNotif](message)

      callback()
      dispatch({type:"IS_SHOW_MODAL_EDIT",dataRow:false})
      handleGetListData()
    } catch (error) {
      console.log(error)
      dispatch({type:"IS_SHOW_MODAL_EDIT",data:{
        isPromise:false,
        dataRow:dataFromState
      }})
    }
  }

  const validateResetPassword = async ()=>{
    // validate existing password
    return false
  }

  const handleResetPassword = async(formData,callback)=>{
    let dataFromState = state.IS_SHOW_MODAL_RESET?.dataRow
    let dataRow = dataFromState

    try {
      let formPayload = FormHelper.formDataValueOnly(formData)
      dataRow = {
        ...dataRow,
        ...formPayload
      }

      let isValid = validateResetPassword(formData)
      if(isValid==false) throw "error"

      dispatch({type:"IS_SHOW_MODAL_RESET",data:{
        isPromise:true,
        dataRow
      }})

      let payload = {
        // ...formPayload,
        uuid:dataFromState.uuid,
        newPassword:formPayload.newPassword,
        confirmPassword:formPayload.confirmPassword
      }

      let response = await IdentityApi.fetchAdminReset(payload)
      let {isError,resultData} = response

      let methodNotif = (isError) ? "error" : "success"
      let message = (isError) ? isError : "User password has been reset"
  
      NotificationManager[methodNotif](message)
      if(isError) throw message 

      callback()
      dispatch({type:"IS_SHOW_MODAL_RESET",dataRow:false})
      handleGetListData()
    } catch (error) {
      dispatch({type:"IS_SHOW_MODAL_RESET",data:{
        isPromise:false,
        dataRow
      }})
    }
  }

  const handleModalAddSubmit = async(formData,callback)=>{
    let stateKey = "IS_SHOW_MODAL_CREATE"
    let dataFromState = state[stateKey]?.dataRow

    try {
      console.log('data',formData)
      let formRequired = formRequiredValidation(formData);
      console.log('reqiored', formRequired)

      if(!formRequired.result){
        dispatch({
          type: stateKey, data: {
            isPromise: false,
            dataRow: formRequired.formData
          }
        })

        return;
      }

      let formPayload = FormHelper.formDataValueOnly(formData)

      dispatch({type:stateKey,
        data:{
          isPromise:true,
          dataRow:dataFromState
        }
      })

      let payload = {
        role:formPayload.role,
        email:formPayload.email,
        password:formPayload.password,
        confirmPassword:formPayload.confirmPassword,
      }
      let response = await IdentityApi.fetchAdminSubmit(payload)
      let {isError,resultData} = response

      let methodNotif = (isError) ? "error" : "success"
      let message = (isError) ? isError : "User Added"
  
      NotificationManager[methodNotif](message)
      if(isError){
        dispatch({type:stateKey,
          data:{
            isPromise:false,
            dataRow:formData
          }
        })
        return
      }

      callback()
      dispatch({type:stateKey,dataRow:false})
      handleGetListData()
    } catch (error) {
      console.log(error)
      dispatch({type:stateKey,data:{
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
    filterOnSubmit,
    filterOnChange,
    filterEvent,
    handleGetRoleList,
    handleModalEditSubmit,
    handleResetPassword,
    handleModalAddSubmit,
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
  },[state.IS_APPLY_FILTER])

}
