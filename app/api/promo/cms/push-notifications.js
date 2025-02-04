import ApiHelper from "@/util/cms/api.helper";

export const fetchPushNotificationsDatatable = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
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

export const deletePushNotifications = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
        api:"deletePushNotifications", body
    });
    return ApiHelper.generalResponse(response)
}

export const detailPushNotifications = async ( query ) => {
    let response = await ApiHelper.handleGETRequest({
        api:"detailPushNotifications", query
    })

    return ApiHelper.generalResponse(response)
}