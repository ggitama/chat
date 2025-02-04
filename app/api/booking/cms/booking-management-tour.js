import ApiHelper from "@/util/cms/api.helper";

export const fetchTourDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchTourDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchTourExport = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchTourExport",
    body  
  })
  return ApiHelper.generalResponse(response)
}