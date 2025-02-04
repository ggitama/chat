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

      ModelHelper.setter(modalForm, "status", status)
      ModelHelper.setter(modalForm, "notificationName", dataRow?.notificationName)
      ModelHelper.setter(modalForm, "notificationType", dataRow?.notificationType)
      ModelHelper.setter(modalForm, "mobileImageUrl", dataRow?.mobileImageUrl)
      ModelHelper.setter(modalForm, "audience", dataRow?.audience)
      ModelHelper.setter(modalForm, "sendNotificationDate", reformatDate(dataRow?.sendNotificationDate))
      ModelHelper.setter(modalForm, "description", dataRow?.description)
      ModelHelper.setter(modalForm, "platform", dataRow?.platform)

      if ('errors' in stateValue) {
        let errors = stateValue.errors
        ModelHelper.setter(modalForm, "status", errors.status, 'error')
        ModelHelper.setter(modalForm, "notificationName", errors.notificationName, 'error')
        ModelHelper.setter(modalForm, "notificationType", errors.notificationType, 'error')
        ModelHelper.setter(modalForm, "mobileImageUrl", errors.mobileImageUrl, 'error')
        ModelHelper.setter(modalForm, "audience", errors.audience, 'error')
        ModelHelper.setter(modalForm, "sendNotificationDate", errors.sendNotificationDate, 'error')
        ModelHelper.setter(modalForm, "description", errors.description, 'error')
        ModelHelper.setter(modalForm, "platform", errors.platform, 'error')
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
