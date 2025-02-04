import ApiHelper from "@/util/cms/api.helper";

export const fetchSalesBookingManagementSummary = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchSalesBookingManagementSummary",
    body  
  })
  return ApiHelper.generalResponse(response)
}