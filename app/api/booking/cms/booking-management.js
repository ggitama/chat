import ApiHelper from "@/util/cms/api.helper";

export const fetchBookingManagementSummary = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchBookingManagementSummary",
    body  
  })
  return ApiHelper.generalResponse(response)
}