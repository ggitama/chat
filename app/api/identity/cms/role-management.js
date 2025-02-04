import ApiHelper from "@/util/cms/api.helper";

export const fetchAuditsPromoDatatable = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchAuditsUserDatatable",
    body  
  })
  return ApiHelper.generalResponse(response)
}

export const fetchRoleManagementRoles = async () =>{
  let response = await ApiHelper.handleGETRequest({
    api:"fetchRoleManagementRoles",
  })
  return ApiHelper.generalResponse(response)
}

export const fetchRoleManagementMenus = async (body) =>{
  let response = await ApiHelper.handleGETRequest({
    api:"fetchRoleManagementMenus",
  })
  return ApiHelper.generalResponse(response)
}

export const fetchRoleManagementRoleMenus = async (body) =>{
  let response = await ApiHelper.handlePOSTRequest({
    api:"fetchRoleManagementRoleMenus",
    body  
  })
  return ApiHelper.generalResponse(response)
}