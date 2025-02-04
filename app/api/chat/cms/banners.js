import ApiHelper from "@/util/cms/api.helper";

export const fetchBannerDatatable = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
            api: "fetchBannersDatatable", body
        });
    return ApiHelper.generalResponse(response)
}
  
export const manageBanner = async ( body ) =>{
    let response = await ApiHelper.handlePOSTRequest({
        api: "manageBanners", body
    });
    return ApiHelper.generalResponse(response)
}

export const deleteBanner = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
        api:"deleteBanners", body
    });
    return ApiHelper.generalResponse(response)
}
