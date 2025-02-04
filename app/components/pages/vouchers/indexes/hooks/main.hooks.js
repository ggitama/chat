import FilterHelper from "@/util/cms/filter.helper"
import FormHelper from "@/util/cms/form.helper"
import { formRequiredValidation } from "@/util/formValidation"
import { BookingApi, PromoApi } from "app/api/helper"
import { useCallback } from "react"
import { NotificationManager } from "react-notifications"
import { schemeFilterTable } from "../model/filter.model"
import * as moment from "moment-timezone"

export const useMainHooks = ( state, dispatch ) => {
    const handleGetListData = useCallback( async(params={}) => {
        dispatch({ type: "LOAD_START"})

        let {
            currentPage:newCurrentPage,
            pageSize:newPageSize,
            filter,
            orderBy:newOrderArray
        } = params

        let filterInputDataValue = filter || state.DATA_FILTER
        let pageSize = newPageSize || state?.pagination?.pageSize
        let orderArray = newOrderArray || state?.DATA_SORT
        
        if(orderArray.length == 0){
          orderArray.push({ key: "createdAt", value: "DESC" })
        } else if(orderArray.length > 1){
          orderArray = orderArray.filter(function( obj ) {
            return obj.key !== 'createdAt';
          });
        }
        
        let payload = {
            columns:filterInputDataValue,
            orders: orderArray,
            pageNumber:newCurrentPage || state?.pagination?.currentPage,
            pageSize:pageSize
        }
        let { isError, pagination, resultData } = await PromoApi.fetchVoucherDatatable(payload)
        let methodNotif = ( isError ) ? "error" : "success"
        let message = ( isError ) ? isError : ""

        if(isError) NotificationManager[methodNotif](message)

        dispatch( { type: "LOAD_SUCCESS", data: resultData, pagination} )
    }, [] )

    const handleChangePagination = async({
        type:eventType,
        pageSize,
        currentPage,
        state
      })=>{
        
        let {isError, updatedDataFilters: filter} = FilterHelper.handlerFilterValidate(state.DATA_FILTER)
        let orderBy = state.DATA_SORT
        switch (eventType) {
          case 'pageSize':
            if (state?.pagination?.pageSize == pageSize) return
            dispatch({
              type: "CHANGE_PAGESIZE", data: {
                pageSize
              }
            })
            handleGetListData({ pageSize, filter, orderBy })
            break;
          case 'currentPage':
            if (state?.pagination?.currentPage == currentPage) return
            dispatch({
              type: "CHANGE_CURRENTPAGE", data: {
                currentPage
              }
            })
            handleGetListData({ pageSize : state.pagination.pageSize, currentPage, filter, orderBy })
            break;
        }
      }

    const sortableOnChange = async(dataSort)=>{
      let validatedFilter = FilterHelper.handlerFilterValidate(state.FORM_FILTER)
      let {isError,updatedDataFilters} = validatedFilter
  
      dispatch({type:"DATA_SORT",data:dataSort})
      handleGetListData({
        currentPage: state?.pagination?.currentPage,
        filter:updatedDataFilters,
        orderBy:dataSort
      })
    }

    const handleModalDeleteSubmit = async( formData, callback )=> {
        let alert = "";
        let payload = {
          uuid: state.IS_SHOW_MODAL_DELETE.dataRow.uuid
        }
        dispatch( { type: "IS_SHOW_MODAL_DELETE", data: {
          isPromise: true,
          data: formData,
          dataRow: formData
        }})
        const { resultData, isError } = await PromoApi.deleteVoucher(
          payload
        );
        let methodNotif = ( isError ) ? "error" : "success"
        let message = ( isError ) ? isError : "Success delete voucher"

        NotificationManager[methodNotif](message)

        callback()
        dispatch( {type: "IS_SHOW_MODAL_DELETE", data: false} )
    }
    
    const handleModalEditSubmit = async( formData, callback ) => {
        try{
            let formRequired = formRequiredValidation(formData, true);

            if(!formRequired.result){
              formRequired.formData.uuid = state.IS_SHOW_MODAL_EDIT?.dataRow.uuid
              dispatch({
                type: "IS_SHOW_MODAL_EDIT", data: {
                  isPromise: false,
                  dataRow: formRequired.formData,
                  errors: formRequired.errors
                }
              })
              
              return;
            }
            
            dispatch( { type: "IS_SHOW_MODAL_EDIT", data: {
                isPromise: true,
                data: formData
            }})

            let dataFromState = state.IS_SHOW_MODAL_EDIT?.dataRow
            let formPayload = FormHelper.formDataValueOnly(formData)
            if(formPayload.desktopImageUrl.includes('http')){
              delete formPayload.desktopImageUrl
            }else{
              formPayload.desktopImageUrl = await handleUploadImage(formPayload.desktopImageUrl)
            }

            if(formPayload.mobileImageUrl.includes('http')){
              delete formPayload.mobileImageUrl
            }else{
              formPayload.mobileImageUrl = await handleUploadImage(formPayload.mobileImageUrl)
            }

            let numericIndex = ['quota', 'minimumTransaction', 'maximumDiscount', 'amount', 'percentageDiscount']
            for(const index of numericIndex){
              if(typeof formPayload[index] == 'string'){
                formPayload[index] = parseFloat(formPayload[index].replace(/[.]/g,''));
              }
            }

            let formatDate = 'DD-MM-YYYY HH:mm'
            formPayload.startDate = moment
                                      .tz(formPayload.startDate, formatDate, moment.tz.guess())
                                      .utc()
                                      .format(formatDate);
            formPayload.endDate = moment
                                      .tz(formPayload.endDate, formatDate, moment.tz.guess())
                                      .utc()
                                      .format(formatDate);
            formPayload.isForEmployee = formPayload.isForEmployee === null ? false : formPayload.isForEmployee
            formPayload.isOncePerUser = formPayload.isOncePerUser === null ? false : formPayload.isOncePerUser
            formPayload.isHidden = formPayload.isHidden === null ? false : formPayload.isHidden
            let payload = {
                ...formPayload,
                uuid: dataFromState.uuid
            }
            let { isError, resultData } = await PromoApi.manageVoucher(payload)
            let methodNotif = ( isError ) ? "error" : "success"
            let message = ( isError ) ? isError : "Success edit voucher"

            if(isError){
              NotificationManager[methodNotif](message)
              dispatch( { type: "IS_SHOW_MODAL_EDIT", data: {
                isPromise: false,
                dataRow: formRequired.formData
              }})
              return
            }else{
              NotificationManager[methodNotif](message)
            }

            callback()
            dispatch( {type: "IS_SHOW_MODAL_EDIT", data: false} )
            resetSortAndFilter()
            handleGetListData()
        } catch(error) {
            dispatch( {type: "IS_MODAL_EDIT", data:formData} )
        }
    }

    const resetSortAndFilter = async() => {
      dispatch({ type:"DATA_SORT",data:[] })
      dispatch({ type:"FORM_FILTER",data:schemeFilterTable() })
      dispatch({ type:"DATA_FILTER",data:[] })
      dispatch({ type:"CHANGE_PAGESIZE", data: 10  })
    }

    const handleModalCreateSubmit = async( formData, callback ) => {
        try{

            let formRequired = formRequiredValidation(formData);

            if(!formRequired.result){
              dispatch({
                type: "IS_SHOW_MODAL_CREATE", data: {
                  isPromise: false,
                  data: formRequired.formData
                }
              })
      
              return;
            }

            dispatch( { type: "IS_SHOW_MODAL_CREATE", data: {
                isPromise: true,
                data: formData
            }})

            let dataFromState = state.IS_SHOW_MODAL_EDIT?.dataRow
            let formPayload = FormHelper.formDataValueOnly(formData)
            formPayload.desktopImageUrl = await handleUploadImage(formPayload.desktopImageUrl)
            formPayload.mobileImageUrl = await handleUploadImage(formPayload.mobileImageUrl)

            let numericIndex = ['quota', 'minimumTransaction', 'maximumDiscount', 'amount', 'percentageDiscount']
            for(const index of numericIndex){
              if(typeof formPayload[index] == 'string'){
                formPayload[index] = parseFloat(formPayload[index].replace(/[.]/g,''));
              }
            }
            
            let formatDate = 'DD-MM-YYYY HH:mm'
            formPayload.startDate = moment
                                      .tz(formPayload.startDate, formatDate, moment.tz.guess())
                                      .utc()
                                      .format(formatDate);
            formPayload.endDate = moment
                                      .tz(formPayload.endDate, formatDate, moment.tz.guess())
                                      .utc()
                                      .format(formatDate);
            formPayload.isForEmployee = formPayload.isForEmployee === null || formPayload.isForEmployee === undefined ? false : formPayload.isForEmployee
            formPayload.isOncePerUser = formPayload.isOncePerUser === null || formPayload.isOncePerUser === undefined ? false : formPayload.isOncePerUser
            formPayload.isHidden = formPayload.isHidden === null || formPayload.isHidden === undefined ? false : formPayload.isHidden
            let payload = {
                ...formPayload
            }

            console.log({formRequired, formData, formPayload, payload})

            let { isError, resultData } = await PromoApi.manageVoucher(payload)
            let methodNotif = ( isError ) ? "error" : "success"
            let message = ( isError ) ? isError : "Success create voucher"

            if(isError){
              NotificationManager[methodNotif](message)
              dispatch( { type: "IS_SHOW_MODAL_CREATE", data: {
                isPromise: false,
                data: formRequired.formData
              }})
              return
            }else{
              NotificationManager[methodNotif](message)
            }

            callback()
            dispatch( {type: "IS_SHOW_MODAL_CREATE", data: false} )
            resetSortAndFilter()
        } catch(error) {
            dispatch( {type: "IS_MODAL_CREATE", data:formData} )
        }
    }

    let handleUploadImage = async(data) => {
      let payload = {
        data: data,
        path: 'voucher'
      }
      const { resultData, error } = await BookingApi.uploadToCloud(payload);
      return resultData.path;
    }

    const filterEvent = FilterHelper.handlerFilterEvents
    const filterOnChange = async(data)=>{
      dispatch({type:"DATA_FILTER",data})
    }

    const filterOnSubmit = async()=>{
      let validatedFilter = FilterHelper.handlerFilterValidate(state.FORM_FILTER)
      let {isError,updatedDataFilters} = validatedFilter
      if(isError.length>0){
        let errorMessage = `${isError.join(",")} can't be empty`
        dispatch({type:"HAS_ERROR",data:errorMessage})
        return
      }

      dispatch({type:"HAS_ERROR",data:false})
      dispatch({ type:"CHANGE_PAGESIZE", data: 10  })
      handleGetListData({
        currentPage:1,
        pageSize:state.pagination.pageSize,
        filter:updatedDataFilters
      })
    }

    return {
        handleGetListData,
        handleModalEditSubmit,
        handleModalCreateSubmit,
        handleModalDeleteSubmit,
        handleChangePagination,
        sortableOnChange,
        filterOnChange,
        filterOnSubmit,
        filterEvent
    }
}