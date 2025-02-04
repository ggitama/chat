import ApiHelper from "@/util/cms/api.helper";

export const fetchCmsSupports = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSupportDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchCmsSupportSubmit = async(body)=>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSupportSubmit",
    body  
  })
  return ApiHelper.generalResponse(response)
}