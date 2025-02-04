import ApiHelper from "@/util/cms/api.helper";

export const fetchPopupsDatatable = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
            api: "fetchPopupsDatatable", body
        });
    return ApiHelper.generalResponse(response)
}
  
export const managePopups = async ( body ) =>{
    let response = await ApiHelper.handlePOSTRequest({
        api: "managePopups", body
    });
    return ApiHelper.generalResponse(response)
}

export const deletePopups = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
        api:"deletePopups", body
    });
    return ApiHelper.generalResponse(response)
}

export const detailPopups = async ( query ) => {
    let response = await ApiHelper.handleGETRequest({
        api:"detailPopups", query
    })

    return ApiHelper.generalResponse(response)
}