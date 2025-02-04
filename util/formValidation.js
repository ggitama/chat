export const checkPhoneNumber = (value) => {
  let isValid = true;
  if (value === "") {
    return true;
  } else {
    if (value.length > 0 && value.length <= 14) {
      if (value[0] !== "0") {
        const regexPhone = /^[0-9]+$/;
        const validatePhone = regexPhone.test(value);
        if (!validatePhone) {
          isValid = false;
          return isValid;
        } else {
          return isValid;
        }
      } else {
        return false;
      }
    }
  }
};

export const checkAlphaNumeric = (value) => {
  let isValid = true;
  const regexAlphanumeric = /^[A-Za-z0-9\s]+$/;
  const Alphanumeric = regexAlphanumeric.test(value && value);
  if (value !== "") {
    if (!Alphanumeric) {
      isValid = false;
      return isValid;
    } else {
      return isValid;
    }
  } else {
    return isValid;
  }
};

export const checkAlpha = (value) => {
  let isValid = true;
  const regexAlphanumeric = /^[A-Za-z]+$/;
  const Alphanumeric = regexAlphanumeric.test(value && value);
  if (!Alphanumeric) {
    isValid = false;
    return isValid;
  } else {
    return isValid;
  }
};

export const checkNumeric = (value) => {
  let isValid = true;
  const regexNumeric = /^[0-9]+$/;
  const Numeric = regexNumeric.test(value);
  if (!Numeric) {
    isValid = false;
    return isValid;
  } else {
    return isValid;
  }
};

export const checkEmail = (value) => {
  let isValid = true;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$/;
  const email = regexEmail.test(value);
  if (!email) {
    isValid = false;
    return isValid;
  } else {
    return isValid;
  }
};

export const checkBoolean = (value) => {
 return value === true || value === false;
};

export const formFieldValidation = (type, value) => {
  switch (type) {
    case "aplha":
      return checkAlpha(value);

    case "numeric":
      return checkNumeric(value);

    case "alphanumeric":
      return checkAlphaNumeric(value);

    case "phone":
      return checkPhoneNumber(value);

    case "email":
      return checkEmail(value);
    
    case "boolean":
      return checkBoolean(value);

    default:
      return true;
  }
};

export const formRequiredValidation = (data, onUpdate=false) => {
  let res = true
  let tempData = {...data}
  let message = 'field is required'
  let errors = {}
  let valueOnly = {}
  Object.keys(tempData).forEach(
    (key, index) => {
      if(tempData[key].required && (!tempData[key].value || tempData[key].value === null) && tempData[key].type != 'Switch'){
          tempData[key].error = message
          res = false
        }else{
          tempData[key].error = ''
        }
      errors[key] = tempData[key].error
      valueOnly[key] = tempData[key].value
    })
    return {
      result: res,
      formData: onUpdate? valueOnly : tempData,
      errors: errors
    }
}

export const setFormErrorField = (data, error) => {
  const tempData = data;
  const indexError = [];
  error.map((item, index) => {
    indexError.push(item.index);
  });
  data.map((item, index) => {
    if (indexError.includes(index)) {
      const findIndex = error.findIndex((x) => x.index === index);
      tempData[index].error = error[findIndex].message;
    } else {
      tempData[index].error = "";
    }
  });
  return tempData;
};

export const clearFormErrorField = (data) => {
  const tempData = data;
  data.map((item, index) => {
    tempData[index].error = "";
  });
  return tempData;
};
