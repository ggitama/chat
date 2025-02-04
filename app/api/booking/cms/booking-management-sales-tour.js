import ApiHelper from "@/util/cms/api.helper";

export const fetchSalesTourDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSalesTourDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchSalesTourExport = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSalesTourExport",
    body  
  })
  return ApiHelper.generalResponse(response)
}