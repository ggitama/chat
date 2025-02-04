import { IdentityApi } from "app/api/helper"
import { NotificationManager } from "react-notifications"

const { useCallback, useEffect } = require("react")

export const useMainHooks = (state,dispatch)=>{

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

    let {isError,resultData} = await IdentityApi.fetchCustomerSummary(query)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(message){
      NotificationManager[methodNotif](message)
    }
    dispatch({type:"LOAD_SUMMARY",data:resultData})
  },[])

  return {
    handleGetSummary,
  }
}
