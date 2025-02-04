import ApiHelper from "@/util/cms/api.helper";

export const uploadToCloud = async ( body ) => {
    let response = await ApiHelper.handlePOSTRequest({
            api: "resourceUpload", body
        });
    return ApiHelper.generalResponse(response)
}