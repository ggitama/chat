import ApiHelper from "@/util/cms/api.helper";

export const fetchVoucherDatatable = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
            api: "fetchVoucherDatatable", body
        });
    return ApiHelper.generalResponse(response)
}
  
export const manageVoucher = async ( body ) =>{
    let response = await ApiHelper.handlePOSTRequest({
        api: "manageVoucher", body
    });
    return ApiHelper.generalResponse(response)
}

export const deleteVoucher = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
        api:"deleteVoucher", body
    });
    return ApiHelper.generalResponse(response)
}

export const listVoucher = async ( query ) => {
    let response = await ApiHelper.handleGETRequest({
        api:"listVoucher", query
    });
    return ApiHelper.generalResponse(response)
}

export const listVoucherAllType = async ( query ) => {
    let response = await ApiHelper.handleGETRequest({
        api:"listVoucherAllType", query
    });
    return ApiHelper.generalResponse(response)
}

export const resourceUpload = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
        api:"resourceUpload", body
    });
    return ApiHelper.generalResponse(response)
}