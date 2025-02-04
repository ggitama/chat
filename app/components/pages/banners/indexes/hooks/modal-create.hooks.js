import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-edit.model"
import { PromoApi } from "app/api/helper"


const { useState, useEffect } = require("react")

export const useModalCreateHooks = (state,dispatch,stateKey)=>{
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

  const handleGetVoucherList = async(productType) => {
    
    const res = await PromoApi.listVoucher({
      productType: productType, includeId: 0});
    let temp = [
      { value: "", label: "Please Select"}
    ]

    res.resultData.map((rowData, index) => {
      temp.push({ value: rowData.id, label: rowData.promoCode})
    })

    let tempForm = {...formData};

    tempForm.promoId.options = temp
    tempForm.promoId.value = ""
    setFormData(tempForm)
  }

  const handleFormUpdate = (index, value, form = null) => {
    let tempDataForm = form ? {...form} : {...formData};

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

    if(index == 'productType'){
      if(value == 'tour') {
        // tempDataForm.urlType.options.push({ value: "internal_search", label: "Internal - Search" })
      } else { 
        // check exist data
        let dataOption = tempDataForm.urlType.options.filter((data) => data.value == 'internal_search')
        if(dataOption.length > 0){
          tempDataForm.urlType.options = tempDataForm.urlType.options.filter((data) => data.value != 'internal_search')
        }
      }
    }

    if(index == 'urlType'){
      tempDataForm.urlType.value = value == undefined ? 'none' : value

      // set default form -- BEGIN
      tempDataForm.productType.hidden = true
      tempDataForm.productType.required = false

      tempDataForm.urlTarget.hidden = true
      tempDataForm.urlTarget.required = false

      tempDataForm.urlLink.type = 'hidden'
      tempDataForm.urlLink.hidden = true
      tempDataForm.urlLink.required = false

      tempDataForm.promoId.hidden = true 
      // set default form -- END
      
      if(value == 'internal_promo'){
        tempDataForm.promoId.hidden = false
        tempDataForm.promoId.required = true

        tempDataForm.productType.hidden = false
        tempDataForm.productType.required = true    
        
        tempDataForm.urlTarget.hidden = false
        tempDataForm.urlTarget.required = true
      }else if (value == 'internal_search') {
        tempDataForm.productType.hidden = false
        tempDataForm.productType.required = true

        tempDataForm.urlTarget.hidden = false
        tempDataForm.urlTarget.required = true

        tempDataForm.urlLink.type = 'input'
        tempDataForm.urlLink.hidden = false
        tempDataForm.urlLink.required = true

        tempDataForm.promoId.required = false
      } else if (value == 'external') {
        tempDataForm.urlTarget.hidden = false
        tempDataForm.urlTarget.required = true

        tempDataForm.urlLink.type = 'input'
        tempDataForm.urlLink.hidden = false
        tempDataForm.urlLink.required = true

        tempDataForm.promoId.required = false
      }
    }

    tempDataForm.description.required = false
    tempDataForm.tnc.required = false
    tempDataForm.startDate.required = true
    tempDataForm.endDate.required = true

    if(index == 'productType'){
      handleGetVoucherList(value)
    }

    setFormData({...tempDataForm});
  };

  useEffect(()=>{
    if(stateValue && !stateValue.isPromise){
      let dataRow =stateValue.data 

      let modalForm = schemaModal()
      
      let status = dataRow?.status?.value == 'active' || dataRow?.status.value
      ModelHelper.setter(modalForm,"productType",dataRow?.productType?.value)
      ModelHelper.setter(modalForm,"title",dataRow?.title?.value)
      ModelHelper.setter(modalForm,"subtitle",dataRow?.subtitle?.value)
      ModelHelper.setter(modalForm,"homeImageUrl",dataRow?.homeImageUrl?.value)
      // ModelHelper.setter(modalForm,"detailsImageUrl",dataRow?.detailsImageUrl?.value)
      ModelHelper.setter(modalForm,"mobileImageUrl",dataRow?.mobileImageUrl?.value)
      ModelHelper.setter(modalForm,"promoId",dataRow?.promoId?.value)
      ModelHelper.setter(modalForm,"status",status)
      ModelHelper.setter(modalForm,"urlType",dataRow?.urlType?.value)
      ModelHelper.setter(modalForm,"urlTarget",dataRow?.urlTarget?.value)
      ModelHelper.setter(modalForm,"urlLink",dataRow?.urlLink?.value)
      ModelHelper.setter(modalForm,"tnc",dataRow?.tnc?.value)
      ModelHelper.setter(modalForm,"startDate",dataRow?.startDate?.value)
      ModelHelper.setter(modalForm,"endDate",dataRow?.endDate?.value)
      ModelHelper.setter(modalForm,"sortOrder",dataRow?.sortOrder?.value)
      ModelHelper.setter(modalForm,"description",dataRow?.description?.value)
      ModelHelper.setter(modalForm,"descriptionHTML",dataRow?.descriptionHTML?.value)
      
      ModelHelper.setter(modalForm,"productType",dataRow?.productType?.error, 'error')
      ModelHelper.setter(modalForm,"title",dataRow?.title?.error, 'error')
      ModelHelper.setter(modalForm,"subtitle",dataRow?.subtitle?.error, 'error')
      ModelHelper.setter(modalForm,"homeImageUrl",dataRow?.homeImageUrl?.error, 'error')
      // ModelHelper.setter(modalForm,"detailsImageUrl",dataRow?.detailsImageUrl?.error, 'error')
      ModelHelper.setter(modalForm,"mobileImageUrl",dataRow?.mobileImageUrl?.error, 'error')
      ModelHelper.setter(modalForm,"promoId",dataRow?.promoId?.error, 'error')
      ModelHelper.setter(modalForm,"status",dataRow?.status?.error, 'error')
      ModelHelper.setter(modalForm,"urlType",dataRow?.urlType?.error, 'error')
      ModelHelper.setter(modalForm,"urlTarget",dataRow?.urlTarget?.error, 'error')
      ModelHelper.setter(modalForm,"urlLink",dataRow?.urlLink?.error, 'error')
      ModelHelper.setter(modalForm,"tnc",dataRow?.tnc?.error, 'error')
      ModelHelper.setter(modalForm,"startDate",dataRow?.startDate?.error, 'error')
      ModelHelper.setter(modalForm,"endDate",dataRow?.endDate?.error, 'error')
      ModelHelper.setter(modalForm,"sortOrder",dataRow?.sortOrder?.error, 'error')
      ModelHelper.setter(modalForm,"description",dataRow?.description?.error, 'error')
      ModelHelper.setter(modalForm,"descriptionHTML",dataRow?.descriptionHTML?.error, 'error')

      setFormData({
        ...modalForm
      })
      handleFormUpdate('urlType', dataRow?.urlType.value, modalForm)
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

