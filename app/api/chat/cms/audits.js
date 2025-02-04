import ApiHelper from "@/util/cms/api.helper";

export const fetchAuditsPromoDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchAuditsPromoDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}