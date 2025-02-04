import { formFieldValidation } from "@/util/formValidation"
import { schemaModalCreate } from "../schemas/modal-create.schema"

const { useState } = require("react")

export const useModalCreateHooks = (state,dispatch)=>{
  // only-single using useState instead of reducer
  const [formData,setFormData] = useState({...schemaModalCreate()})

  const handleClearFormData = ()=>{
    Object.keys(formData).map(formKey=>{
      formData[formKey].value=""
      return formKey
    })
    setFormData({...formData})
  }

  const handleFormUpdate = (index, value) => {
    const tempDataForm = {...formData};
    
    switch (tempDataForm[index].type) {
      case "Input":
        let validationType = tempDataForm[index].validationType
        if (validationType && formFieldValidation(validationType, value)) {
          tempDataForm[index].value = value;
        }else if(!validationType){
          tempDataForm[index].value = value;
        }

        break;
    case "Select":
        tempDataForm[index].value = value;
      break;        

      default:
        break;
    }

    setFormData({...tempDataForm});
  };

  const handleConfirmPasswordMatch = (index, value) => {
    const tempDataForm = {...formData};

    const confirmInput = tempDataForm[index]
    let validationType = confirmInput.validationType
    if (validationType && formFieldValidation(validationType, value)) {
      confirmInput.value = value;
    }else if(!validationType){
      confirmInput.value = value;
    }

    const passwordInput = tempDataForm.password
    tempDataForm[index].error = ""
    if(passwordInput && confirmInput && passwordInput.value!=value){
      tempDataForm[index].error = "missmatch"
    }

    setFormData({...tempDataForm});
  };

  return [
    {formData},
    {setFormData},
    {
      handleClearFormData,
      handleFormUpdate,
      handleConfirmPasswordMatch
    }
  ]
}

