import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import Axios from "axios"
import { schemaModal } from "../model/modal-edit.model"

const { useState, useEffect } = require("react")

export const useModalCreateHooks = (state,dispatch,stateKey)=>{
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
      let dataRow =stateValue.data 

      let modalForm = schemaModal()
      ModelHelper.setter(modalForm,"name",dataRow?.name?.value)
      ModelHelper.setter(modalForm,"name",dataRow?.name.error, 'error')
      ModelHelper.setter(modalForm,"codes",dataRow?.codes?.value)
      ModelHelper.setter(modalForm,"codes",dataRow?.codes.error, 'error')
      ModelHelper.setter(modalForm,"logo",dataRow?.logo?.value)
      ModelHelper.setter(modalForm,"logo",dataRow?.logo.error, 'error')

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

