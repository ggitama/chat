import FilterHelper from "@/util/cms/filter.helper"
import FormHelper from "@/util/cms/form.helper"
import { formRequiredValidation } from "@/util/formValidation"
import { PromoApi,BookingApi } from "app/api/helper"
import { useCallback } from "react"
import { NotificationManager } from "react-notifications"
import { schemeFilterTable } from "../model/filter.model"

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
            orders:orderArray,
            pageNumber:newCurrentPage || state?.pagination?.currentPage,
            pageSize:pageSize
        }
        let { isError, pagination, resultData } = await PromoApi.fetchBannerDatatable(payload)
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
          id: state.IS_SHOW_MODAL_DELETE.dataRow.id
        }
        dispatch( { type: "IS_SHOW_MODAL_DELETE", data: {
          isPromise: true,
          data: formData,
          dataRow: formData
        }})
        const { resultData, isError } = await PromoApi.deleteBanner(
          payload
        );
        let methodNotif = ( isError ) ? "error" : "success"
        let message = ( isError ) ? isError : "Success delete banner"

        NotificationManager[methodNotif](message)
        
        callback()
        dispatch( {type: "IS_SHOW_MODAL_DELETE", data: false} )
        handleGetListData()
    }
    
    const handleModalEditSubmit = async( formData, callback ) => {
        try{
            let formRequired = formRequiredValidation(formData, true);
            if(!formRequired.result){
              formRequired.formData.id = state.IS_SHOW_MODAL_EDIT?.dataRow.id
              formRequired.formData.status = payload.status ? 'active' : 'inactive'
              dispatch({
                type: "IS_SHOW_MODAL_EDIT", data: {
                  isPromise: false,
                  dataRow: formRequired.formData,
                  errors: formRequired.errors
                }
              })
              
              return;
            }
            formRequired.formData.id = state.IS_SHOW_MODAL_EDIT?.dataRow.id

            dispatch( { type: "IS_SHOW_MODAL_EDIT", data: {
                isPromise: true,
                data: formData
            }})

            let dataFromState = state.IS_SHOW_MODAL_EDIT?.dataRow
            let formPayload = FormHelper.formDataValueOnly(formData)
            
            if(formPayload.homeImageUrl.includes('http')){
              delete formPayload.homeImageUrl
            }else{
              formPayload.homeImageUrl = await handleUploadImage(formPayload.homeImageUrl)
            }

            // if(formPayload.detailsImageUrl.includes('http')){
            //   delete formPayload.detailsImageUrl
            // }else{
            //   formPayload.detailsImageUrl = await handleUploadImage(formPayload.detailsImageUrl)
            // }

            if(formPayload.mobileImageUrl.includes('http')){
              delete formPayload.mobileImageUrl
            }else{
              formPayload.mobileImageUrl = await handleUploadImage(formPayload.mobileImageUrl)
            }
            let payload = {
                ...formPayload,
                id: dataFromState.id
            }
            
            payload.status = payload.status ? 'active' : 'inactive'
            payload.sortOrder = payload.sortOrder ? payload.sortOrder : 99
            let { isError, resultData } = await PromoApi.manageBanner(payload)
            let methodNotif = ( isError ) ? "error" : "success"
            let message = ( isError ) ? isError : "Success edit banner"
            
            if(isError){
              // payload.status.value = payload.status == 'active' ? true : false
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
            

            formPayload.homeImageUrl = await handleUploadImage(formPayload.homeImageUrl)
            // formPayload.detailsImageUrl = await handleUploadImage(formPayload.detailsImageUrl)
            formPayload.mobileImageUrl = await handleUploadImage(formPayload.mobileImageUrl)
            let payload = {
                ...formPayload
            }

            payload.status = payload.status ? 'active' : 'inactive'
            payload.sortOrder = payload.sortOrder ? payload.sortOrder : 99
            let { isError, resultData } = await PromoApi.manageBanner(payload)
            let methodNotif = ( isError ) ? "error" : "success"
            let message = ( isError ) ? isError : "Success create banner"

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
            handleGetListData()
        } catch(error) {
            dispatch( {type: "IS_MODAL_CREATE", data:formData} )
        }
    }

    const resetSortAndFilter = async() => {
      dispatch({ type:"DATA_SORT",data:[] })
      dispatch({ type:"FORM_FILTER",data:schemeFilterTable() })
      dispatch({ type:"DATA_FILTER",data:[] })
      dispatch({ type:"CHANGE_PAGESIZE", data: 10  })
    }

    let handleUploadImage = async(data) => {
      let payload = {
        data: data,
        path: 'banner'
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