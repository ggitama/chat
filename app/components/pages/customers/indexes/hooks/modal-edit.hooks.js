import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-view.model"

const { useState, useEffect } = require("react")

export const useModalEditHooks = (state,dispatch,stateKey)=>{
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
    let whichValue = event?.target?.value || event
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

    console.log(tempDataForm)
    setFormData({...tempDataForm});
  };

  useEffect(()=>{
    if(stateValue && !stateValue.isPromise){
      let dataRow =stateValue.dataRow 

      let modalForm = schemaModal()
      ModelHelper.setter(modalForm,"uuid",dataRow?.uuid)
      ModelHelper.setter(modalForm,"email",dataRow?.email)
      // ModelHelper.setter(modalForm,"phoneNumber",dataRow?.phoneNumber)
      ModelHelper.setter(modalForm,"title",dataRow?.title)
      ModelHelper.setter(modalForm,"firstName",dataRow?.firstName)
      ModelHelper.setter(modalForm,"lastName",dataRow?.lastName)
      // ModelHelper.setter(modalForm,"address",dataRow?.address)
      // ModelHelper.setter(modalForm,"dob",dataRow?.dob)
      // ModelHelper.setter(modalForm,"age",dataRow?.age)
      ModelHelper.setter(modalForm,"createdAt",dataRow?.createdAt)

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

