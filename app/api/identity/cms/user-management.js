import ApiHelper from "@/util/cms/api.helper";
export const fetchUserSummary = async (body) =>{
  let response = await ApiHelper.handleGETRequest({
    api:"fetchUserSummary",
    query:body  
  })
  return ApiHelper.generalResponse(response)
}