import ApiHelper from "@/util/cms/api.helper";

export const fetchAdminDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchAdminDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchAdminUpdate = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchAdminUpdate",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchAdminReset = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchAdminReset",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchAdminSubmit = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchAdminSubmit",
    body  
  })
  return ApiHelper.generalResponse(response)
}