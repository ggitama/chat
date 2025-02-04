import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-reset-password.model"

const { useState, useEffect } = require("react")

export const useModalEditPasswordHooks = (state,dispatch,stateKey)=>{
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
    whichValue = typeof whichValue=="undefined" ? event : whichValue

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
      console.log(dataRow,modalForm)
      if(dataRow.newPassword) ModelHelper.setter(modalForm,"newPassword",dataRow?.newPassword)
      if(dataRow.confirmPassword) ModelHelper.setter(modalForm,"confirmPassword",dataRow?.confirmPassword)

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

