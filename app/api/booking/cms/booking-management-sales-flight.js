import ApiHelper from "@/util/cms/api.helper";

export const fetchSalesFlightDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSalesFlightDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchSalesFlightExport = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSalesFlightExport",
    body  
  })
  return ApiHelper.generalResponse(response)
}