import ApiHelper from "@/util/cms/api.helper";

export const fetchCustomerDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchCustomerDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchCustomerSummary = async (body) =>{
  let response = await ApiHelper.handleGETRequest({
    api:"fetchCustomerSummary",
    query:body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchSubmitEdit = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSubmitEdit",
    body  
  })
  return ApiHelper.generalResponse(response)
}