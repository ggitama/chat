import ApiHelper from "@/util/cms/api.helper";

export const fetchSalesHotelDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSalesHotelDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchSalesHotelExport = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSalesHotelExport",
    body  
  })
  return ApiHelper.generalResponse(response)
}