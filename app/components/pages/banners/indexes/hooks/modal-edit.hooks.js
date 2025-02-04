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

  const handleGetVoucherList = async(data, productType, includedId = 0) => {
    
    const res = await PromoApi.listVoucher({
      productType: productType, includeId: includedId});
    let temp = [
      { value: "", label: "Please Select"}
    ]

    if(res.resultData){
      res.resultData.map((rowData, index) => {
        if(rowData.promoCode != null){
          temp.push({ value: rowData.id, label: rowData.promoCode})
        }
      })
    }

    let tempForm = {...data};
    
    tempForm.promoId.options = temp
    if(productType == stateValue.dataRow.productType){
      tempForm.promoId.value = stateValue.dataRow?.promoId
    }else{
      tempForm.promoId.value = ""
    }
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

    if(index == 'urlType'){
      tempDataForm.urlLink.type = 'hidden'
      tempDataForm.promoId.hidden = true
      tempDataForm.urlTarget.hidden = true
      tempDataForm.urlLink.required = false
      tempDataForm.promoId.required = false
      tempDataForm.urlTarget.required = false
      
      if(value == 'none' || value == 'free_text'){
        tempDataForm.urlTarget.hidden = true
        
        tempDataForm.productType.hidden = true
        tempDataForm.productType.required = false
      }else if(value == 'internal_promo'){
        tempDataForm.promoId.hidden = false
        tempDataForm.promoId.required = true

        tempDataForm.productType.hidden = false
        tempDataForm.productType.required = true

        tempDataForm.urlTarget.hidden = false
        tempDataForm.urlTarget.required = true
      }else if (value == 'internal_search') {
        tempDataForm.urlLink.type = 'input'
        tempDataForm.urlLink.required = true

        tempDataForm.promoId.hidden = true
        tempDataForm.promoId.required = false

        tempDataForm.productType.hidden = false
        tempDataForm.productType.required = true

        tempDataForm.urlTarget.hidden = false
        tempDataForm.urlTarget.required = true
      } else if(value == 'external'){
        tempDataForm.urlLink.type = 'input'
        tempDataForm.urlLink.required = true

        tempDataForm.urlTarget.hidden = false
        tempDataForm.urlTarget.required = true

        tempDataForm.productType.hidden = true
        tempDataForm.productType.required = false
      }
    }
    
    if(index == 'productType'){
      handleGetVoucherList(formData, value, stateValue.dataRow?.productType == value ? stateValue.dataRow?.promoId : 0)
    }

    tempDataForm.description.required = false
    tempDataForm.startDate.required = true
    tempDataForm.endDate.required = true
    tempDataForm.tnc.required = false

    setFormData({ ...tempDataForm });
  };

  useEffect(() => {
    if (stateValue && !stateValue.isPromise) {
      let dataRow = stateValue.dataRow

      // let startDate = moment(dataRow?.startDate).format('DD-MM-YYYY');
      // let endDate = moment(dataRow?.endDate).format('DD-MM-YYYY');
      let status = dataRow?.status == 'active' || dataRow?.status === true
      let modalForm = schemaModal()
      ModelHelper.setter(modalForm,"productType",dataRow?.productType)
      ModelHelper.setter(modalForm,"promoType",dataRow?.promoType)
      ModelHelper.setter(modalForm,"status",status) 
      ModelHelper.setter(modalForm,"title",dataRow?.title)
      ModelHelper.setter(modalForm,"subtitle",dataRow?.subtitle)
      ModelHelper.setter(modalForm,"homeImageUrl",dataRow?.homeImageUrl)
      // ModelHelper.setter(modalForm,"detailsImageUrl",dataRow?.detailsImageUrl)
      ModelHelper.setter(modalForm,"mobileImageUrl",dataRow?.mobileImageUrl)
      ModelHelper.setter(modalForm,"promoId",dataRow?.promoId)
      ModelHelper.setter(modalForm,"tnc",dataRow?.tnc)
      ModelHelper.setter(modalForm,"urlType",dataRow?.urlType)
      ModelHelper.setter(modalForm,"urlLink",dataRow?.urlLink)
      ModelHelper.setter(modalForm,"urlTarget",dataRow?.urlTarget)
      ModelHelper.setter(modalForm,"startDate",dataRow?.startDate)
      ModelHelper.setter(modalForm,"endDate",dataRow?.endDate)
      ModelHelper.setter(modalForm,"sortOrder",dataRow?.sortOrder)
      ModelHelper.setter(modalForm,"startDate",dataRow?.startDate)
      ModelHelper.setter(modalForm,"endDate",dataRow?.endDate)
      ModelHelper.setter(modalForm,"description",dataRow?.description)
      ModelHelper.setter(modalForm,"descriptionHTML",dataRow?.descriptionHTML)
      
      if('errors' in stateValue){
        let errors = stateValue.errors
        ModelHelper.setter(modalForm,"productType",errors.productType, 'error')
        ModelHelper.setter(modalForm,"promoType",errors.promoType, 'error')
        ModelHelper.setter(modalForm,"title",errors.title, 'error')
        ModelHelper.setter(modalForm,"subtitle",errors.subtitle, 'error')
        ModelHelper.setter(modalForm,"homeImageUrl",errors.homeImageUrl, 'error')
        // ModelHelper.setter(modalForm,"detailsImageUrl",errors.detailsImageUrl, 'error')
        ModelHelper.setter(modalForm,"mobileImageUrl",errors.mobileImageUrl, 'error')
        ModelHelper.setter(modalForm,"promoId",errors.promoId, 'error')
        ModelHelper.setter(modalForm,"status",errors.status, 'error') 
        ModelHelper.setter(modalForm,"urlType",errors.urlType, 'error')
        ModelHelper.setter(modalForm,"urlLink",errors.urlLink, 'error')
        ModelHelper.setter(modalForm,"urlTarget",errors.urlTarget, 'error')
        ModelHelper.setter(modalForm,"tnc",errors.tnc, 'error')
        ModelHelper.setter(modalForm,"startDate",errors.startDate, 'error')
        ModelHelper.setter(modalForm,"endDate",errors.endDate, 'error')
        ModelHelper.setter(modalForm,"sortOrder",errors.sortOrder, 'error')
        ModelHelper.setter(modalForm,"description",errors.description, 'error')
        ModelHelper.setter(modalForm,"descriptionHTML",errors.descriptionHTML, 'error')
      }

      setFormData({
        ...modalForm
      })
      handleGetVoucherList(modalForm, dataRow.productType, dataRow?.promoId)
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
