import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import Axios from "axios"
import { schemaModal } from "../model/modal-edit.model"

const { useState, useEffect } = require("react")

export const useModalEditHooks = (state,dispatch,stateKey)=>{
  // only-single using useState instead of reducer
  const [formData,setFormData] = useState({})
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [formImageLink, setFormImageLink] = useState();
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
      let dataRow =stateValue.dataRow

      let modalForm = schemaModal()
      ModelHelper.setter(modalForm,"name",dataRow?.name)
      ModelHelper.setter(modalForm,"codes",dataRow?.codes)
      ModelHelper.setter(modalForm,"logo",dataRow?.logo)

      if('errors' in stateValue){
        let errors = stateValue.errors
        ModelHelper.setter(modalForm,"codes",errors.codes, 'error')
        ModelHelper.setter(modalForm,"name",errors.name, 'error')
        ModelHelper.setter(modalForm,"logo",errors.logo, 'error')
      } 

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
      handleFormUpdate
    }
  ]
}

