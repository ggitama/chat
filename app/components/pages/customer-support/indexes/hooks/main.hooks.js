import FormHelper from "@/util/cms/form.helper"
import { formRequiredValidation } from "@/util/formValidation"
import { BookingApi, IdentityRoleManagement, PromoCmsAudits } from "app/api/helper"
import { NotificationManager } from "react-notifications"

const { useCallback } = require("react")

export const useMainHooks = (state,dispatch)=>{

  const handleGetListData = useCallback(async(params={})=>{
    dispatch({type:"LOAD_START"})

    let {
    } = params

    let payload = {
      columns:[],
      orders:[],
      pageNumber:0,
      pageSize:100
    }
    
    let {isError,pagination,resultData} = await BookingApi.fetchCmsSupports(payload)
    let methodNotif = (isError) ? "error" : "success"
    let message = (isError) ? isError : ""

    if(isError){
      NotificationManager[methodNotif](message)
    }
    
    dispatch({type:"LOAD_SUCCESS",data:resultData})
  },[state.DATA_FILTER])

  const handleModalEditSubmit = async(formData,callback)=>{
    try {
      let formRequired = formRequiredValidation(formData, true);

      if(!formRequired.result){
        formRequired.formData.uuid = state.IS_SHOW_MODAL_EDIT?.dataRow.uuid
        dispatch({
          type: "IS_SHOW_MODAL_EDIT", data: {
            isPromise: false,
            dataRow: formRequired.formData,
            errors: formRequired.errors
          }
        })
        
        return;
      }

      dispatch({type:"IS_SHOW_MODAL_EDIT",data:{
        isPromise:true,
        data:formData
      }})
     
      let dataFromState = state.IS_SHOW_MODAL_EDIT?.dataRow

      let formPayload = FormHelper.formDataValueOnly(formData)
      let payload = {
        ...formPayload,
        uuid:dataFromState.uuid
      }
      let response = await BookingApi.fetchCmsSupportSubmit(payload)
      let {isError,resultData} = response

      let methodNotif = (isError) ? "error" : "success"
      let message = (isError) ? isError : "Success Edit"
  
      NotificationManager[methodNotif](message)
      if(isError){
        dispatch({
          type: "IS_SHOW_MODAL_EDIT", data: {
            isPromise: false,
            dataRow: {...payload}
          }
        })
        return
      }

      callback()
      dispatch({type:"IS_SHOW_MODAL_EDIT",data:false})
      handleGetListData()
    } catch (error) {
      dispatch({type:"IS_SHOW_MODAL_EDIT",data:formData})
    }
  }

  return {
    handleGetListData,
    handleModalEditSubmit
  }
}

