import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-edit.model"
import moment from "moment"
import { PromoApi } from "app/api/helper"


const { useState, useEffect } = require("react")

export const useModalEditHooks = (state, dispatch, stateKey) => {
  // only-single using useState instead of reducer
  const [formData, setFormData] = useState({})

  // listening to state.IS_SHOW_MODAL_VIEW value
  const stateValue = state[stateKey]

  const handleClearFormData = () => {
    Object.keys(formData).map(formKey => {
      formData[formKey].value = ""
      return formKey
    })
    setFormData({ ...formData })
  }

  const handleFormUpdate = (index, value, form = null) => {
    let tempDataForm = form ? { ...form } : { ...formData };

    let inputType = tempDataForm[index].type
    let validationType = tempDataForm[index].validationType
    switch (inputType) {
      case "Input":
        if (validationType && validationType && formFieldValidation(validationType, value)) {
          tempDataForm[index].value = value;
        } else {
          tempDataForm[index].value = value;
        }
        break;
      default:
        tempDataForm[index].value = value;
        break;
    }

    setFormData({ ...tempDataForm });
  };

  useEffect(() => {
    if (stateValue && !stateValue.isPromise) {
      let dataRow = stateValue.dataRow

      let status = dataRow?.status == 'active' || dataRow?.status === true
      let modalForm = schemaModal()

      ModelHelper.setter(modalForm, "displayName", dataRow?.displayName)
      ModelHelper.setter(modalForm, "email", dataRow?.email)
      ModelHelper.setter(modalForm, "status", dataRow?.status)
      ModelHelper.setter(modalForm, "phoneNumber", dataRow?.phoneNumber)
      ModelHelper.setter(modalForm, "photoURL", dataRow?.photoURL)

      if ('errors' in stateValue) {
        let errors = stateValue.errors
        ModelHelper.setter(modalForm, "displayName", errors.displayName, 'error')
        ModelHelper.setter(modalForm, "email", errors.email, 'error')
        ModelHelper.setter(modalForm, "status", errors.status, 'error')
        ModelHelper.setter(modalForm, "phoneNumber", errors.phoneNumber, 'error')
        ModelHelper.setter(modalForm, "photoURL", errors.photoURL, 'error')
      }

      setFormData({
        ...modalForm
      })
    }
  }, [stateValue])

  function reformatDate(dateString) {
      // Pisahkan tanggal dan waktu
      let [datePart, timePart] = dateString.split(' ');

      // Pisahkan hari, bulan, dan tahun
      let [day, month, year] = datePart.split('-');

      // Format ulang menjadi YYYY-MM-DD HH:mm
      return `${year}-${month}-${day} ${timePart}`;
  }

  return [
    { formData },
    { setFormData },
    {
      handleClearFormData,
      handleFormUpdate
    }
  ]
}
