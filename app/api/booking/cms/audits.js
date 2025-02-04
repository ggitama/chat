import ApiHelper from "@/util/cms/api.helper";

export const fetchAuditsBookingDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchAuditsBookingDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}