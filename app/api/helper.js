import {
  fetchAdminDatatable,
  fetchFlightDatatable,
  fetchTourDatatable,
  fetchHotelDatatable,
  fetchFlightDetail,
  fetchTourDetail,
  fetchCustomerDatatable,
  fetchHotelDetail,
  fetchBookingManagementSummary,
  fetchFlightExport,
  fetchTourExport,
  fetchHotelExport,
  fetchCustomerSummary,
  fetchCustomerSubmitEdit,
  fetchAdminUpdate,
  fetchAuditsPromoDatatable,
  fetchAuditsUserDatatable,
  fetchAuditsBookingDatatable,
  fetchBankDatatable,
  manageBank,
  deleteBank,
  fetchAdminSubmit,
  fetchAdminReset,
  fetchSupportDatatable,
  fetchSupportSubmit,
  fetchVouchersDatatable,
  fetchVoucherNewUsersDatatable,
  manageVouchers,
  deleteVouchers,
  listVouchers,
  listVoucherAllTypes,
  fetchBannersDatatable,
  manageBanners,
  deleteBanners,
  resourceUpload,
  eventNotif,
  searchTour,
  searchRegion,
  searchAirport,
  searchAirline,
  searchHotel,
  fetchUserSummary,
  fetchVoucherSummary,
  fetchPopupsDatatable,
  managePopups,
  deletePopups,
  fetchCustomerList,
} from ".";
import Cookies from "js-cookie";
import {
  forceReload,
  redirectRouterPush,
  setExpiresCookies,
  setGlobalCookies,
} from "@/util/helper";

const generalResponse = (response)=>{
  let { result,error } = response
  let resultData = false
  let paging = false
  let isError = error?.message

  if(result){
    let isOkay = result.statusCode===200
    isError = (!isOkay) ? result.statusMessage : ""
    if(isOkay){
      resultData = result.responseData
      paging= result.paging
    }
  }
  return {
    resultData,
    pagination:paging,
    isError
  }
}
//IDENTITY
const generateRandomString = (length) => {
  const { floor, random } = Math;
  let text = "";
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i += 1)
    text += char.charAt(floor(random() * char.length));
  return text;
};

const getDeviceId = new Promise((resolve) => {
  const deviceId = generateRandomString(36);
  // if (window.requestIdleCallback) requestIdleCallback(() => resolve(deviceId));
  resolve(deviceId);
});

export const handleGenerateDeviceId = async () => {
  getDeviceId.then(async (result) => {
    setGlobalCookies("deviceId", result, {
      expires: setExpiresCookies("deviceId"),
      path: "/",
    });
  });
};

// VOUCHER
export const handleFetchVouchersDatatable = async (payload) => {
  const { result, error } = await fetchVouchersDatatable(payload);
  let resultData = [];
  let pagination = {};
  let isError = "";
  if (result) {
    if (result.statusCode === 200) {
      result.responseData.map((item) => {
        resultData.push(item);
      });
      pagination = result.paging;
    } else {
      isError = result.statusMessage;
    }
  } else {
    isError = error.message;
  }
  return { resultData, pagination, isError };
}

export const handleManageVouchers = async (payload) => {
  const { result, error } = await manageVouchers(payload);
  return { result, error };
}

export const handleDeleteVouchers = async (payload) => {
  const { result, error } = await deleteVouchers(payload);
  return { result, error };
}

export const handleVouchersList = async (payload) => {
  const { result, error } = await listVouchers(payload);
  return { result, error };
}

export const handleVouchersListAllType = async (payload) => {
  const { result, error } = await listVoucherAllTypes(payload);
  return { result, error };
}

export const handleVoucherSummary = async (payload) => {
  const { result, error } = await fetchVoucherSummary(payload);
  return { result, error };
}

export const handleResourceUpload = async (payload) => {
  const { result, error } = await resourceUpload(payload);
  return { result, error };
}

// BANK
export const handleFetchBankDatatable = async (payload) => {
  const { result, error } = await fetchBankDatatable(payload);
  let resultData = [];
  let pagination = {};
  let isError = "";
  if (result) {
    if (result.statusCode === 200) {
      result.responseData.map((item) => {
        resultData.push(item);
      });
      pagination = result.paging;
    } else {
      isError = result.statusMessage;
    }
  } else {
    isError = error.message;
  }
  return { resultData, pagination, isError };
}

export const handleManageBank = async (payload) => {
  const { result, error } = await manageBank(payload);
  return { result, error };
}

export const handleDeleteBank = async (payload) => {
  const { result, error } = await deleteBank(payload);

  return { result, error };

}

// BANNER
export const handleFetchBannersDatatable = async (payload) => {
  const { result, error } = await fetchBannersDatatable(payload);
  console.log({result,error});
  let resultData = [];
  let pagination = {};
  let isError = "";
  if (result) {
    if (result.statusCode === 200) {
      result.responseData.map((item) => {
        resultData.push(item);
      });
      pagination = result.paging;
    } else {
      isError = result.statusMessage;
    }
  } else {
    isError = error.message;
  }
  return { resultData, pagination, isError };
}

export const handleManageBanners = async (payload) => {
  const { result, error } = await manageBanners(payload);

  return { result, error };

}

export const handleDeleteBanners = async (payload) => {
  const { result, error } = await deleteBanners(payload);

  return { result, error };

}

export const handleFetchSupportDatatable = async (payload) => {
  const response = await fetchSupportDatatable(payload);
  return generalResponse(response)
}

export const handleFetchSupportSubmit = async (payload) => {
  const response = await fetchSupportSubmit(payload);
  return generalResponse(response)
}

// POPUP
export const handleFetchPopupsDatatable = async (payload) => {
  const { result, error } = await fetchPopupsDatatable(payload);
  let resultData = [];
  let pagination = [];
  let isError = "";

  if(result){
    if(result.statusCode == 200){
      result.responseData.map((item) => {
        resultData.push(item);
      });
      pagination = result.paging;
    }else{
      isError = result.statusMessage;
    }
    
  }else{
    isError = error.message;
  }

  return { resultData, pagination, isError};
}

export const handleManagePopups = async (payload) => {
  const { result, error } = await managePopups(payload);
  return { result, error };
}

export const handleDeletePopups = async (payload) => {
  const { result, error } = await deletePopups(payload);
  return { result, error };
}

// PUSH NOTIFICATION
export const handleFetchPushNotificationsDatatable = async (payload) => {
  const { result, error } = await fetchPushNotificationsDatatable(payload);
  let resultData = [];
  let pagination = [];
  let isError = "";

  if(result){
    if(result.statusCode == 200){
      result.responseData.map((item) => {
        resultData.push(item);
      });
      pagination = result.paging;
    }else{
      isError = result.statusMessage;
    }
    
  }else{
    isError = error.message;
  }

  return { resultData, pagination, isError};
}

export const handleManagePushNotifications = async (payload) => {
  const { result, error } = await managePushNotifications(payload);
  return { result, error };
}

export const handleDeletePushNotifications = async (payload) => {
  const { result, error } = await deletePushNotifications(payload);
  return { result, error };
}

//FLIGHT
export const handleFetchFlightDatatable = async (payload) => {
  const { result, error } = await fetchFlightDatatable(payload);
  let resultData = [];
  let pagination = {};
  let isError = "";
  if (result) {
    if (result.statusCode === 200) {
      result.responseData.map((item) => {
        resultData.push(item);
      });
      pagination = result.paging;
    } else {
      isError = result.statusMessage;
    }
  } else {
    isError = error.message;
  }
  return { resultData, pagination, isError };
};

export const handleFetchFlightDetail = async (query) => {
  const { result, error } = await fetchFlightDetail(query);
  let resultData = {};
  let isError = "";
  if (result) {
    if (result.statusCode === 200) {
      resultData = result.responseData;
    } else {
      isError = result.statusMessage;
    }
  } else {
    isError = error.message;
  }
  return { resultData, isError };
};

//TOUR
export const handleFetchTourDatatable = async (payload) => {
  const { result, error } = await fetchTourDatatable(payload);
  let resultData = [];
  let pagination = {};
  let isError = "";
  if (result) {
    if (result.statusCode === 200) {
      result.responseData.map((item) => {
        resultData.push(item);
      });
      pagination = result.paging;
    } else {
      isError = result.statusMessage;
    }
  } else {
    isError = error.message;
  }
  return { resultData, pagination, isError };
};

export const handleFetchTourDetail = async (query) => {
  const { result, error } = await fetchTourDetail(query);
  let resultData = {};
  let isError = "";
  if (result) {
    if (result.statusCode === 200) {
      resultData = result.responseData;
    } else {
      isError = result.statusMessage;
    }
  } else {
    isError = error.message;
  }
  return { resultData, isError };
};

export const handleFetchHotelDetail = async (query) => {
  const response = await fetchHotelDetail(query);
  return generalResponse(response)
};

export const handleFetchAdminDatatable = async(query)=>{
  const response = await fetchAdminDatatable(query);
  return generalResponse(response)
}

export const handleFetchAdminUpdate = async(body)=>{
  const response = await fetchAdminUpdate(body);
  return generalResponse(response)
}

export const handleFetchAdminSubmit = async(body)=>{
  const response = await fetchAdminSubmit(body);
  return generalResponse(response)
}

export const handleFetchAdminReset = async(body)=>{
  const response = await fetchAdminReset(body);
  return generalResponse(response)
}

export const handleFetchCustomerDatatable = async(query)=>{
  const response = await fetchCustomerDatatable(query);
  return generalResponse(response)
}

export const handleFetchCustomerList = async(query)=>{
  const response = await fetchCustomerList(query);
  return generalResponse(response)
}

export const handleFetchBookingManagementDatatable = async(type,payload)=>{
  const mapMethod = {
    flight:fetchFlightDatatable,
    hotel:fetchHotelDatatable,
    tour:fetchTourDatatable,
  }
  const response = await mapMethod[type](payload).catch(error=>{
    return generalResponse({error})
  });
  return generalResponse(response)
}

export const handleFetchBookingManagementSummary = async(query)=>{
  const response = await fetchBookingManagementSummary(query);
  return generalResponse(response)
}

export const handleFetchBookingManagementExport = async(type,payload)=>{
  const mapMethod = {
    flight:fetchFlightExport,
    hotel:fetchHotelExport,
    tour:fetchTourExport,
  }
  const response = await mapMethod[type](payload).catch(error=>{
    return generalResponse({error})
  });
  return generalResponse(response)
}

export const handlerFetchCustomerManagementSummary = async (query) => {
  const response = await fetchCustomerSummary(query);
  return generalResponse(response)
};

export const handlerFetchUserManagementSummary = async (query) => {
  const response = await fetchUserSummary(query);
  return generalResponse(response)
};

export const handlerFetchCustomerSubmitEdit = async (body) => {
  const response = await fetchCustomerSubmitEdit(body);
  return generalResponse(response)
};

export const handlerFetchPromoAuditsDatatable = async (body) => {
  const response = await fetchAuditsPromoDatatable(body);
  return generalResponse(response)
};

export const handlerFetchUserAuditsDatatable = async (body) => {
  const response = await fetchAuditsUserDatatable(body);
  return generalResponse(response)
};

export const handlerFetchBookingAuditsDatatable = async (body) => {
  const response = await fetchAuditsBookingDatatable(body);
  return generalResponse(response)
};

export const handleWebhookEventNotif = async (payload) => {
  const { result, error } = await eventNotif(payload);
  return { result, error };
}

export const handleSearchTour = async (payload) => {
  const { result, error } = await searchTour(payload);
  return { result, error };
}

export const handleSearchRegion = async (query) => {
  const { result, error } = await searchRegion(query);
  return { result, error };
}

export const handleSearchAirline = async (query) => {
  const { result, error } = await searchAirline(query);
  return { result, error };
}

export const handleSearchAirport = async (query) => {
  const { result, error } = await searchAirport(query);
  return { result, error };
}

export const handleSearchHotel = async (query) => {
  const { result, error } = await searchHotel(query);
  return { result, error };
}

export const handleFetchVoucherManagementDatatable = async(type,payload)=>{
  const mapMethod = {
    voucher_antavaya:fetchVouchersDatatable,
    voucher_new_user:fetchVoucherNewUsersDatatable,
  }
  const response = await mapMethod[type](payload).catch(error=>{
    return generalResponse({error})
  });
  return generalResponse(response)
}

export * as PromoCmsAudits from "./promo/cms-audits"
export * as IdentityRoleManagement from "./identity/role-management"

export * as BookingApi from "./booking" 
export * as IdentityApi from "./identity"
export * as PromoApi from "./promo"
