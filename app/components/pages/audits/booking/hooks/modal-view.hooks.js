import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-view.model"

const { useState, useEffect } = require("react")

export const useModalViewHooks = (state,dispatch,stateKey)=>{
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
    if(stateValue && !stateValue.isPromise){
      let dataRow =stateValue.dataRow 

      let modalForm = schemaModal()
      ModelHelper.setter(modalForm,"eventType",dataRow?.eventType)
      ModelHelper.setter(modalForm,"eventName",dataRow?.eventName)
      ModelHelper.setter(modalForm,"eventDescription",dataRow?.eventDescription)
      ModelHelper.setter(modalForm,"eventDate",dataRow?.eventDateTime)
      ModelHelper.setter(modalForm,"objectName",dataRow?.objectName)
      ModelHelper.setter(modalForm,"objectId",dataRow?.objectId)
      ModelHelper.setter(modalForm,"userId",dataRow?.userId)
      console.log(modalForm)

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

