import ApiHelper from "@/util/cms/api.helper";

export const fetchFlightDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchFlightDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchFlightExport = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchFlightExport",
    body  
  })
  return ApiHelper.generalResponse(response)
}