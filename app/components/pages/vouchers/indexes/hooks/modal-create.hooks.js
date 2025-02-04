import ModelHelper from "@/util/cms/model.helper"
import { formFieldValidation } from "@/util/formValidation"
import { schemaModal } from "../model/modal-edit.model"

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

  console.log(formData)
  const handleFormUpdate = (index, value, form = null) => {
    let tempDataForm = form ? {...form} : {...formData};
    
    let inputType = tempDataForm[index].type
    let validationType = tempDataForm[index].validationType
    let numericIndex = ['quota', 'minimumTransaction', 'maximumDiscount', 'amount', 'percentageDiscount']

    if(index == 'productType'){

      tempDataForm.tourCode.hidden = true
      tempDataForm.tourCode.required = false

      tempDataForm.regionName.hidden = true
      tempDataForm.regionName.required = false

      tempDataForm.airlineCode.hidden = true
      tempDataForm.airlineCode.required = false

      tempDataForm.originCode.hidden = true
      tempDataForm.originCode.required = false

      tempDataForm.destinationCode.hidden = true
      tempDataForm.destinationCode.required = false

      tempDataForm.hotelCode.hidden = true
      tempDataForm.hotelCode.required = false

      if(value == 'tour') {
        tempDataForm.tourCode.hidden = false
        tempDataForm.tourCode.required = false
  
        tempDataForm.regionName.hidden = false
        tempDataForm.regionName.required = false
      } else if (value == 'flight') {
        tempDataForm.airlineCode.hidden = false
        tempDataForm.airlineCode.required = false
  
        tempDataForm.originCode.hidden = false
        tempDataForm.originCode.required = false

        tempDataForm.destinationCode.hidden = false
        tempDataForm.destinationCode.required = false
      } else if (value == 'hotel') {
        tempDataForm.hotelCode.hidden = false
        tempDataForm.hotelCode.required = false
      }

    }

    if(index == 'type'){
      if(value == 'percentage'){
        tempDataForm.amount.type = 'hidden'
        tempDataForm.percentageDiscount.type = 'Input'
        tempDataForm.maximumDiscount.type = 'Input'
        tempDataForm.amount.required = false
        tempDataForm.percentageDiscount.required = true
        tempDataForm.maximumDiscount.required = true
      }else if(value == 'amount'){
        tempDataForm.amount.type = 'Input'
        tempDataForm.percentageDiscount.type = 'hidden'
        tempDataForm.maximumDiscount.type = 'hidden'
        tempDataForm.amount.required = true
        tempDataForm.percentageDiscount.required = false
        tempDataForm.maximumDiscount.required = false
      }else{
        tempDataForm.amount.type = 'hidden'
        tempDataForm.percentageDiscount.type = 'hidden'
        tempDataForm.maximumDiscount.type = 'hidden'
        tempDataForm.amount.required = false
        tempDataForm.percentageDiscount.required = false
        tempDataForm.maximumDiscount.required = false
      }

    }

    switch (inputType) {
      case "Input":
        if(numericIndex.includes(index)){
          value = parseInt(value.replace(/[.]/g,''))
          tempDataForm[index].value = "";
        }
        if(value === ""){
          tempDataForm[index].value = value;
          break;
        }
        if (validationType !== "" && validationType && formFieldValidation(validationType, value)) {
          if(validationType == 'numeric'){
            tempDataForm[index].value = value.toLocaleString('id-ID');
          }else{
            tempDataForm[index].value = value;
          }
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
      ModelHelper.setter(modalForm,"productType",dataRow?.productType?.value)
      ModelHelper.setter(modalForm,"type",dataRow?.type?.value)
      ModelHelper.setter(modalForm,"platform",dataRow?.platform?.value)
      ModelHelper.setter(modalForm,"promoCode",dataRow?.promoCode?.value)
      ModelHelper.setter(modalForm,"promoName",dataRow?.promoName?.value)
      ModelHelper.setter(modalForm,"promoDescription",dataRow?.promoDescription?.value)
      ModelHelper.setter(modalForm,"tnc",dataRow?.tnc?.value)
      ModelHelper.setter(modalForm,"desktopImageUrl",dataRow?.desktopImageUrl?.value)
      ModelHelper.setter(modalForm,"mobileImageUrl",dataRow?.mobileImageUrl?.value)
      ModelHelper.setter(modalForm,"startDate",dataRow?.startDate?.value)
      ModelHelper.setter(modalForm,"endDate",dataRow?.endDate?.value)
      ModelHelper.setter(modalForm,"quota",dataRow?.quota?.value)
      ModelHelper.setter(modalForm,"minimumTransaction",dataRow?.minimumTransaction?.value)
      ModelHelper.setter(modalForm,"percentageDiscount",dataRow?.percentageDiscount?.value)
      ModelHelper.setter(modalForm,"maximumDiscount",dataRow?.maximumDiscount?.value)
      ModelHelper.setter(modalForm,"amount",dataRow?.amount?.value)
      ModelHelper.setter(modalForm,"isOncePerUser",dataRow?.isOncePerUser?.value)
      ModelHelper.setter(modalForm,"isForEmployee",dataRow?.isForEmployee?.value)
      ModelHelper.setter(modalForm,"isHidden",dataRow?.isHidden?.value)
      ModelHelper.setter(modalForm,"tourCode",null)
      ModelHelper.setter(modalForm,"regionName",null)
      ModelHelper.setter(modalForm,"airlineCode",null)
      ModelHelper.setter(modalForm,"originCode",null)
      ModelHelper.setter(modalForm,"destinationCode",null)
      ModelHelper.setter(modalForm,"hotelCode",null)
      
      ModelHelper.setter(modalForm,"productType",dataRow?.productType?.error, 'error')
      ModelHelper.setter(modalForm,"type",dataRow?.type?.error, 'error')
      ModelHelper.setter(modalForm,"platform",dataRow?.platform?.error, 'error')
      ModelHelper.setter(modalForm,"promoCode",dataRow?.promoCode?.error, 'error')
      ModelHelper.setter(modalForm,"promoName",dataRow?.promoName?.error, 'error')
      ModelHelper.setter(modalForm,"promoDescription",dataRow?.promoDescription?.error, 'error')
      ModelHelper.setter(modalForm,"tnc",dataRow?.tnc?.error, 'error')
      ModelHelper.setter(modalForm,"desktopImageUrl",dataRow?.desktopImageUrl?.error, 'error')
      ModelHelper.setter(modalForm,"mobileImageUrl",dataRow?.mobileImageUrl?.error, 'error')
      ModelHelper.setter(modalForm,"startDate",dataRow?.startDate?.error, 'error')
      ModelHelper.setter(modalForm,"endDate",dataRow?.endDate?.error, 'error')
      ModelHelper.setter(modalForm,"quota",dataRow?.quota?.error, 'error')
      ModelHelper.setter(modalForm,"minimumTransaction",dataRow?.minimumTransaction?.error, 'error')
      ModelHelper.setter(modalForm,"percentageDiscount",dataRow?.percentageDiscount?.error, 'error')
      ModelHelper.setter(modalForm,"maximumDiscount",dataRow?.maximumDiscount?.error, 'error')
      ModelHelper.setter(modalForm,"amount",dataRow?.amount?.error, 'error')
      ModelHelper.setter(modalForm,"isOncePerUser",dataRow?.isOncePerUser?.error, 'error')
      ModelHelper.setter(modalForm,"isForEmployee",dataRow?.isForEmployee?.error, 'error')
      ModelHelper.setter(modalForm,"tourCode",dataRow?.tourCode?.error, 'error')
      ModelHelper.setter(modalForm,"isHidden",dataRow?.isHidden?.error, 'error')
      ModelHelper.setter(modalForm,"regionName",dataRow?.regionName?.error, 'error')
      ModelHelper.setter(modalForm,"airlineCode",dataRow?.airlineCode?.error, 'error')
      ModelHelper.setter(modalForm,"originCode",dataRow?.originCode?.error, 'error')
      ModelHelper.setter(modalForm,"destinationCode",dataRow?.destinationCode?.error, 'error')
      ModelHelper.setter(modalForm,"hotelCode",dataRow?.hotelCode?.error, 'error')

      setFormData({
        ...modalForm
      })

      handleFormUpdate('type', dataRow?.type.value, modalForm)
      handleFormUpdate('productType', dataRow?.productType.value, modalForm)
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

