import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-edit.model"
import { PromoApi } from "app/api/helper"


const { useState, useEffect } = require("react")

export const useModalCreateHooks = (state,dispatch,stateKey)=>{
  // only-single using useState instead of reducer
  const [formData,setFormData] = useState({})

  // listening to state.IS_SHOW_MODAL_VIEW value
  const stateValue = state[stateKey]

  const handleClearFormData = ()=>{
    Object.keys(formData).map(formKey=>{
      formData[formKey].value=""
      return formKey
    })
    setFormData({...formData})
  }

  const handleFormUpdate = (index, value, form = null) => {
    let tempDataForm = form ? {...form} : {...formData};

    let inputType = tempDataForm[index].type
    let validationType = tempDataForm[index].validationType
    switch (inputType) {
      case "Input":
        if (validationType && validationType && formFieldValidation(validationType, value)) {
          tempDataForm[index].value = value;
        }else{
          tempDataForm[index].value = value;
        }
        break;
      default:
        tempDataForm[index].value = value;
        break;
    }
    setFormData({...tempDataForm});
  };

  useEffect(()=>{
    if(stateValue && !stateValue.isPromise){
      let dataRow =stateValue.data 

      let modalForm = schemaModal()
      
      let status = dataRow?.status?.value == 'active' || dataRow?.status.value
      ModelHelper.setter(modalForm,"notificationName",dataRow?.notificationName?.value)
      ModelHelper.setter(modalForm,"notificationType",dataRow?.notificationType?.value)
      ModelHelper.setter(modalForm,"mobileImageUrl",dataRow?.mobileImageUrl?.value)
      ModelHelper.setter(modalForm,"status",status)
      ModelHelper.setter(modalForm,"audience",dataRow?.audience)
      ModelHelper.setter(modalForm,"sendNotificationDate",dataRow?.sendNotificationDate?.value)
      ModelHelper.setter(modalForm,"description",dataRow?.description?.value)
      ModelHelper.setter(modalForm,"platform",dataRow?.platform?.value)
      
      ModelHelper.setter(modalForm,"notificationName",dataRow?.notificationName?.error, 'error')
      ModelHelper.setter(modalForm,"notificationType",dataRow?.notificationType?.error, 'error')
      ModelHelper.setter(modalForm,"mobileImageUrl",dataRow?.mobileImageUrl?.error, 'error')
      ModelHelper.setter(modalForm,"status",dataRow?.status?.error, 'error')
      ModelHelper.setter(modalForm,"audience",dataRow?.audience?.error, 'error')
      ModelHelper.setter(modalForm,"allAudience",dataRow?.allAudience?.error, 'error')
      ModelHelper.setter(modalForm,"sendNotificationDate",dataRow?.sendNotificationDate?.error, 'error')
      ModelHelper.setter(modalForm,"description",dataRow?.description?.error, 'error')
      ModelHelper.setter(modalForm,"platform",dataRow?.description?.error, 'error')

      setFormData({
        ...modalForm
      })
      handleFormUpdate('notificationType', dataRow?.notificationType?.value, modalForm)
    }
  },[stateValue])

  return [
    {formData},
    {setFormData},
    {
      handleClearFormData,
      handleFormUpdate
    }
  ]
}

