const FormHelper = {
  formDataValueOnly:(formData)=>{
    let inputValues = {}
    Object.keys(formData).map(formKey=>{
      inputValues[formKey] = formData[formKey].value
    })
    return inputValues
  }
}

// alias so it's shorter 
// and more readble in circular access
const _this = FormHelper
export default FormHelper