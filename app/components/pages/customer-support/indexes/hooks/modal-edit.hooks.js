import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-edit.model"
import ModelHelper from "@/util/cms/model.helper"

const { useState, useEffect } = require("react")

export const useModalHooks = (state,dispatch)=>{
  // only-single using useState instead of reducer
  const [formData,setFormData] = useState({})
  const stateValue = state.IS_SHOW_MODAL_EDIT

  const handleClearFormData = ()=>{
    Object.keys(formData).map(formKey=>{
      formData[formKey].value=""
      return formKey
    })
    setFormData({...formData})
  }

  const handleFormUpdate = (index, value) => {
    let tempDataForm = {...formData};
    
    let inputType = tempDataForm[index].type
    let validationType = tempDataForm[index].validationType
    switch (inputType) {
      case "Input":
        if (validationType && validationType && formFieldValidation(validationType, value)) {
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
    if(state.IS_SHOW_MODAL_EDIT && !state.IS_SHOW_MODAL_EDIT.isPromise){
      let dataRow =state.IS_SHOW_MODAL_EDIT?.dataRow 

      let modalForm = schemaModal()
      modalForm.name.value = dataRow?.name || modalForm?.name?.value
      modalForm.description.value = dataRow?.description || modalForm?.description?.value
      modalForm.value1.value = dataRow?.value1 || modalForm?.value1?.value
      modalForm.value2.value = dataRow?.value2 || modalForm?.value2?.value

      if('errors' in stateValue){
        let errors = stateValue.errors
        ModelHelper.setter(modalForm,"value1",errors.value1, 'error')
        ModelHelper.setter(modalForm,"value2",errors.value2, 'error')
      } 
      
      setFormData({
        ...modalForm
      })
    }
  },[state.IS_SHOW_MODAL_EDIT])

  return [
    {formData},
    {setFormData},
    {
      handleClearFormData,
      handleFormUpdate,
    }
  ]
}

