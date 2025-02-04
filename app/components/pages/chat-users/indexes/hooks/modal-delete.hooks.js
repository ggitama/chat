import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-edit.model"

const { useState, useEffect } = require("react")

export const useModalDeleteHooks = (state,dispatch,stateKey)=>{
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

  const handleFormUpdate = (index, event) => {
    let tempDataForm = {...formData};
    
    let inputType = tempDataForm[index].type
    let validationType = tempDataForm[index].validationType
    let whichValue = event?.target?.value
    switch (inputType) {
      case "Input":
        whichValue = event?.target?.value
        if (validationType && formFieldValidation(validationType, value)) {
          tempDataForm[index].value = whichValue;
        }else if(!validationType){
          tempDataForm[index].value = whichValue;
        }
        break;
      default:
        tempDataForm[index].value = whichValue;
        break;
    }

    setFormData({...tempDataForm});
  };

  useEffect(()=>{
    if(stateValue && !stateValue.isPromise){
      let dataRow =stateValue.dataRow 

      let modalForm = schemaModal()
      ModelHelper.setter(modalForm,"notificationName",dataRow?.notificationName)

      setFormData({
        ...modalForm
      })
    }
  },[stateValue])

  return [
    {formData},
    {setFormData},
    {
      handleClearFormData,
      handleFormUpdate,
    }
  ]
}

