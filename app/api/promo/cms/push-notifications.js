import ApiHelper from "@/util/cms/api.helper";

export const fetchPushNotificationsDatatable = async ( body ) => {
    let response = await ApiHelper.handleGETRequest({
            api: "fetchPushNotificationsDatatable", body
        });
    return ApiHelper.generalResponse(response)
}
  
export const managePushNotifications = async ( body ) =>{
    let response = await ApiHelper.handlePOSTRequest({
        api: "managePushNotifications", body
    });
    return ApiHelper.generalResponse(response)
}

export const deletePushNotifications = async ( formData ) => {
    let response = await ApiHelper.handleDELRequest({
        api:"deletePushNotifications", formData
    });
    return ApiHelper.generalResponse(response)
}
