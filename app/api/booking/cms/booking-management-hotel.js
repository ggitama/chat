import ApiHelper from "@/util/cms/api.helper";

export const fetchHotelDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchHotelDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchHotelExport = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchHotelExport",
    body  
  })
  return ApiHelper.generalResponse(response)
}