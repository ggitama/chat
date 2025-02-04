import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-add-user.model"

const { useState, useEffect } = require("react")

export const userModalAddUserHooks = (state,dispatch,stateKey)=>{
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

      console.log('datarow', dataRow)
      let modalForm = schemaModal()
      ModelHelper.setter(modalForm, 'email', dataRow?.email.value)
      ModelHelper.setter(modalForm, 'role', dataRow?.role.value)
      ModelHelper.setter(modalForm, 'password', dataRow?.password.value)
      ModelHelper.setter(modalForm, 'confirmPassword', dataRow?.confirmPassword.value)
      
      ModelHelper.setter(modalForm, 'email', dataRow?.email.error, 'error')
      ModelHelper.setter(modalForm, 'role', dataRow?.role.error, 'error')
      ModelHelper.setter(modalForm, 'password', dataRow?.password.error, 'error')
      ModelHelper.setter(modalForm, 'confirmPassword', dataRow?.confirmPassword.error, 'error')


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

