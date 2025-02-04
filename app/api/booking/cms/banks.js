import ApiHelper from "@/util/cms/api.helper";

export const fetchBankDatatable = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
            api: "fetchBankDatatable", body
        });
    return ApiHelper.generalResponse(response)
}
  
export const manageBank = async ( body ) =>{
    let response = await ApiHelper.handlePOSTRequest({
        api: "manageBank", body
    });
    return ApiHelper.generalResponse(response)
}

export const deleteBank = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
        api:"deleteBank", body
    });
    return ApiHelper.generalResponse(response)
}