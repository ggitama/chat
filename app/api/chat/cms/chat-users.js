import ApiHelper from "@/util/cms/api.helper";

export const fetchChatUsersDatatable = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
            api: "fetchChatUsersDatatable", body
        });
    return ApiHelper.generalResponse(response)
}
  
// export const managePushNotifications = async ( body ) =>{
//     let response = await ApiHelper.handlePOSTRequest({
//         api: "managePushNotifications", body
//     });
//     return ApiHelper.generalResponse(response)
// }

// export const deletePushNotifications = async ( body ) => {
//     let response = await ApiHelper.handlePOSTRequest({
//         api:"deletePushNotifications", body
//     });
//     return ApiHelper.generalResponse(response)
// }

// export const detailPushNotifications = async ( query ) => {
//     let response = await ApiHelper.handleGETRequest({
//         api:"detailPushNotifications", query
//     })

//     return ApiHelper.generalResponse(response)
// }