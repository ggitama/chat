import { IdentityRoleManagement, PromoCmsAudits } from "app/api/helper"
import { NotificationManager } from "react-notifications"

const { useCallback } = require("react")

export const useMainHooks = (state,dispatch)=>{

  const handleGetMenus = useCallback(async(params={})=>{
    dispatch({type:"IS_ON_LOADING",data:true})

    let {
    } = params

    let payload = {
    }

    let {isError,pagination,resultData} = await IdentityRoleManagement.fetchRoleManagementMenus(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(isError){
      NotificationManager[methodNotif](message)
    }
    
    dispatch({type:"IS_ON_LOADING",data:false})
    dispatch({type:"INIT_DATA_MENU",data:resultData})
  },[])

  const handleGetRoles = useCallback(async(params={})=>{
    dispatch({type:"IS_ON_LOADING",data:true})

    let {
    } = params

    let payload = {
    }

    let {isError,pagination,resultData} = await IdentityRoleManagement.fetchRoleManagementRoles(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(isError){
      NotificationManager[methodNotif](message)
    }
    
    resultData = resultData.map(row=>{
      let rowName = row.name
      return {
        value:rowName,
        label:rowName
      }
    })
    dispatch({type:"IS_ON_LOADING",data:false})
    dispatch({type:"DATA_ROLE_OPTIONS",data:resultData})
  },[])

  const handleFetchRoleMenus = useCallback(async(params={})=>{
    dispatch({type:"LOAD_START"})

    let {
      role
    } = params

    let payload = {
      role
    }
    
    let {isError,pagination,resultData} = await IdentityRoleManagement.fetchRoleManagementRoleMenus(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(isError){
      NotificationManager[methodNotif](message)
    }
    
    resultData = resultData.map(row=>row.name)
    dispatch({type:"LOAD_SUCCESS",data:resultData})
  },[])


  return {
    handleGetMenus,
    handleFetchRoleMenus,
    handleGetRoles
  }
}

