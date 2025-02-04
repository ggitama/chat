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

  const handleGetVoucherList = async(data) => {

    const res = await PromoApi.listVoucherAllType();
    let promoSelected;
    let promoCode;
    let temp = [
      { value: "", label: "Please Select"}
    ]

    console.log({data}) 
    if(res.resultData){
      res.resultData.map((rowData, index) => {
        if(rowData.promoCode != null){
          if(data.promoId.value == rowData.id){
            promoSelected = rowData;
            promoCode = rowData.id;
          }
          temp.push({ value: rowData.id, label: rowData.promoCode})
        }
      })
    }

    let tempForm = {...data};
    tempForm.promoId.options = temp
    tempForm.promoId.value = promoCode

    setFormData(tempForm)
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

    if (index == 'urlType') {
      tempDataForm.urlLink.type = 'hidden'
      tempDataForm.promoId.hidden = true
      tempDataForm.urlTarget.hidden = true
      tempDataForm.urlLink.required = false
      tempDataForm.promoId.required = false
      tempDataForm.urlTarget.required = false

      if (value == 'none') {
        tempDataForm.urlTarget.hidden = true

        // tempDataForm.productType.hidden = true
        // tempDataForm.productType.required = false
      } else if (value == 'internal_promo') {
        tempDataForm.promoId.hidden = false
        tempDataForm.promoId.required = true

        // tempDataForm.productType.hidden = false
        // tempDataForm.productType.required = true

        tempDataForm.urlTarget.hidden = false
        tempDataForm.urlTarget.required = true
      } else if (value == 'external') {
        tempDataForm.urlLink.type = 'input'
        tempDataForm.urlLink.required = true

        tempDataForm.urlTarget.hidden = false
        tempDataForm.urlTarget.required = true

        // tempDataForm.productType.hidden = true
        // tempDataForm.productType.required = false
      }
    }

    if (value == 'internal_promo') {
      handleGetVoucherList(tempDataForm)
    }

    tempDataForm.popupDescription.required = false
    tempDataForm.startDate.required = true
    tempDataForm.endDate.required = true

    setFormData({ ...tempDataForm });
  };

  useEffect(() => {
    if (stateValue && !stateValue.isPromise) {
      let dataRow = stateValue.dataRow

      let status = dataRow?.status == 'active' || dataRow?.status === true
      let modalForm = schemaModal()
      // dataRow.title = dataRow.popupTitle;
      // dataRow.subtitle = dataRow.popupSubtitle;
      // dataRow.description = dataRow.popupDescription;
      dataRow.homeImageUrl = dataRow.desktopImageUrl;

      ModelHelper.setter(modalForm, "status", status)
      ModelHelper.setter(modalForm, "popupTitle", dataRow?.popupTitle)
      ModelHelper.setter(modalForm, "popupSubtitle", dataRow?.popupSubtitle)
      ModelHelper.setter(modalForm, "homeImageUrl", dataRow?.homeImageUrl)
      ModelHelper.setter(modalForm, "mobileImageUrl", dataRow?.mobileImageUrl)
      ModelHelper.setter(modalForm, "promoId", dataRow?.promoId)
      ModelHelper.setter(modalForm, "urlType", dataRow?.urlType)
      ModelHelper.setter(modalForm, "urlLink", dataRow?.urlLink)
      ModelHelper.setter(modalForm, "urlTarget", dataRow?.urlTarget)
      ModelHelper.setter(modalForm, "startDate", dataRow?.startDate)
      ModelHelper.setter(modalForm, "endDate", dataRow?.endDate)
      ModelHelper.setter(modalForm, "popupDescription", dataRow?.popupDescription)
      ModelHelper.setter(modalForm, "platform", dataRow?.platform)

      if ('errors' in stateValue) {
        let errors = stateValue.errors
        ModelHelper.setter(modalForm, "popupTitle", errors.popupTitle, 'error')
        ModelHelper.setter(modalForm, "popupSubtitle", errors.popupSubtitle, 'error')
        ModelHelper.setter(modalForm, "homeImageUrl", errors.homeImageUrl, 'error')
        ModelHelper.setter(modalForm, "mobileImageUrl", errors.mobileImageUrl, 'error')
        ModelHelper.setter(modalForm, "promoId", errors.promoId, 'error')
        ModelHelper.setter(modalForm, "status", errors.status, 'error')
        ModelHelper.setter(modalForm, "urlType", errors.urlType, 'error')
        ModelHelper.setter(modalForm, "urlLink", errors.urlLink, 'error')
        ModelHelper.setter(modalForm, "urlTarget", errors.urlTarget, 'error')
        ModelHelper.setter(modalForm, "startDate", errors.startDate, 'error')
        ModelHelper.setter(modalForm, "endDate", errors.endDate, 'error')
        ModelHelper.setter(modalForm, "popupDescription", errors.popupDescription, 'error')
        ModelHelper.setter(modalForm, "platform", errors.platform, 'error')
      }

      setFormData({
        ...modalForm
      })
      handleGetVoucherList(modalForm)
      handleFormUpdate('urlType', dataRow?.urlType, modalForm)
    }
  }, [stateValue])

  return [
    { formData },
    { setFormData },
    {
      handleClearFormData,
      handleFormUpdate
    }
  ]
}
