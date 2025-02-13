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
      
      ModelHelper.setter(modalForm,"name",dataRow?.name?.value)
      ModelHelper.setter(modalForm,"type",dataRow?.type?.value)
      ModelHelper.setter(modalForm,"members",dataRow?.members?.value)
      
      ModelHelper.setter(modalForm,"name",dataRow?.name?.error, 'error')
      ModelHelper.setter(modalForm,"type",dataRow?.type?.error, 'error')
      ModelHelper.setter(modalForm,"members",dataRow?.members?.error, 'error')

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

