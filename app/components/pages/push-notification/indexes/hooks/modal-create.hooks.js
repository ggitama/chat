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
      
      ModelHelper.setter(modalForm,"displayName",dataRow?.displayName?.value)
      ModelHelper.setter(modalForm,"email",dataRow?.email?.value)
      ModelHelper.setter(modalForm,"status",dataRow?.status?.value)
      ModelHelper.setter(modalForm,"phoneNumber",dataRow?.phoneNumber?.value)
      ModelHelper.setter(modalForm,"photoURL",dataRow?.photoURL?.value)
      
      ModelHelper.setter(modalForm,"displayName",dataRow?.displayName?.error, 'error')
      ModelHelper.setter(modalForm,"email",dataRow?.email?.error, 'error')
      ModelHelper.setter(modalForm,"status",dataRow?.status?.error, 'error')
      ModelHelper.setter(modalForm,"phoneNumber",dataRow?.phoneNumber?.error, 'error')
      ModelHelper.setter(modalForm,"photoURL",dataRow?.photoURL?.error, 'error')

      setFormData({
        ...modalForm
      })
      // handleFormUpdate('notificationType', dataRow?.notificationType?.value, modalForm)
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

