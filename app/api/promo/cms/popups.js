import ApiHelper from "@/util/cms/api.helper";

export const fetchPopupsDatatable = async ( body ) => {
    let response = await ApiHelper.handleGETChatsRequest({
            api: "fetchPopupsDatatable", body
        });
    return ApiHelper.generalResponse(response)
}
  