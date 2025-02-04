import ApiHelper from "@/util/cms/api.helper";

export const fetchAuditsPromoDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchAuditsUserDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}