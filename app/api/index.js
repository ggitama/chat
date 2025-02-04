import MainService from "./base";
import FormData from "form-data";

const convertToFormData = (formData, data, previousKey) => {
  if (data instanceof Object) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value instanceof Blob && !Array.isArray(value)) {
        formData.append(key, value, getFilename(value.name));
      }

      if (value instanceof Object && !Array.isArray(value)) {
        return convertToFormData(formData, value, key);
      }
      if (previousKey) {
        key = `${previousKey}[${key}]`;
      }
      if (Array.isArray(value)) {
        value.forEach((val) => {
          formData.append(`${key}[]`, val);
        });
      } else {
        formData.append(key, value);
      }
    });
  }
};

const handleGeneralError = (error) => console.log("General Error", error);
const handleGETRequest = async (
  api,
  { ...param },
  { ...query },
  noAuth = false
) => {
  // let lang = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : process.env.REACT_APP_DEFAULT_LANG;
  const {
    result: { body: bodyResult },
  } = await MainService(api)
    .doRequest({ params: { ...param }, query: { ...query }, noAuth })
    .then((res) => res)
    .catch((errorGeneral) => {
      handleGeneralError(errorGeneral);
      return {
        result: { result: bodyResult },
        errorJS: errorGeneral,
      };
    });

  return { result: bodyResult };
};

// const handlePOSTRequest = async (
//   api,
//   body,
//   asFormData = false,
//   noAuth = false
// ) => {
//   const formData = new FormData();
//   let actualBody = { ...body };

//   if (asFormData) {
//     // https://stackoverflow.com/a/43101878
//     convertToFormData(formData, body);
//     actualBody = formData;
//   }

//   const {
//     result: {
//       body: { data, error, code },
//     },
//   } = await MainService(api)
//     .doRequest({
//       body: actualBody,
//       hooks: {
//         before({ payload, next }) {
//           const newPayload = { ...payload };
//           if (asFormData) delete newPayload.headers["Content-Type"];
//           next(newPayload);
//         },
//       },
//       noAuth,
//     })
//     .then((result) => result)
//     .catch((errorGeneral) => {
//       handleGeneralError(errorGeneral);
//       return {
//         result: {
//           body: { data: null, error: null },
//         },
//         errorJS: errorGeneral,
//       };
//     });

//   if (error) console.log(error);

//   return {
//     code,
//     data,
//     error,
//   };
// };

const handlePOSTRequest = async (
  api,
  body,
  param,
  asFormData = false,
  noAuth = false
) => {
  // console.log(api, param, query);
  // let lang = localStorage.getItem("i18nextLng")
  //   ? localStorage.getItem("i18nextLng")
  //   : process.env.REACT_APP_DEFAULT_LANG;

  const formData = new FormData();
  let actualBody = { ...body };

  if (asFormData) {
    // eslint-disable-next-line
    for (const key in body) {
      formData.append(key, body[key]);
    }
    actualBody = formData;
  }

  const response = await MainService(api)
    .doRequest({
      noAuth,
      params: { ...param },
      body: actualBody,
      headers: {
        "Content-Type": "application/json",
        // "accept-language": lang,
      },
      hooks: {
        before({ payload, next }) {
          const newPayload = { ...payload };
          if (asFormData) delete newPayload.headers["Content-Type"];
          next(newPayload);
        },
      },
    })
    .then((res) => res)
    .catch((errorGeneral) => {
      handleGeneralError(errorGeneral);
      return {
        result: { result: bodyResult },
        errorJS: errorGeneral,
      };
    });
  
  const {
    result: { body: bodyResult },
  } = response

  return { result: bodyResult , error:response.errorJS};
};

//BOOKING
export const fetchTourDatatable = (body) =>
  handlePOSTRequest("fetchTourDatatable", body);

export const fetchTourExport = (body) =>
  handlePOSTRequest("fetchTourExport", body);

export const fetchFlightDatatable = (body) =>
  handlePOSTRequest("fetchFlightDatatable", body);

export const fetchFlightExport = (body) =>
  handlePOSTRequest("fetchFlightExport", body);

export const fetchHotelDatatable = (body) =>
  handlePOSTRequest("fetchHotelDatatable", body);  

export const fetchHotelExport = (body) =>
  handlePOSTRequest("fetchHotelExport", body); 

export const fetchTourDetail = (query) =>
  handleGETRequest("fetchTourDetail", false, query);

export const fetchFlightDetail = (query) =>
  handleGETRequest("fetchFlightDetail", false, query);

export const fetchHotelDetail = (query) =>
  handleGETRequest("fetchHotelDetail", false, query);

export const fetchBookingManagementSummary = (body) =>
  handlePOSTRequest("fetchBookingManagementSummary", body);

export const fetchAuditsBookingDatatable = (body) =>
  handlePOSTRequest("fetchAuditsBookingDatatable", body);
  
export const fetchVouchersDatatable = ( body ) =>
  handlePOSTRequest("fetchVoucherDatatable", body);

export const fetchVoucherNewUsersDatatable = ( body ) =>
  handlePOSTRequest("fetchVoucherNewUserDatatable", body);

export const manageVouchers = ( body ) =>
  handlePOSTRequest("manageVoucher", body);

export const deleteVouchers = ( body ) =>
handlePOSTRequest("deleteVoucher", body);

export const listVouchers = ( query ) =>
handleGETRequest("listVoucher", false, query);

export const listVoucherAllTypes = ( query ) =>
handleGETRequest("listVoucherAllType", false, query);

export const resourceUpload = ( body ) =>
handlePOSTRequest("resourceUpload", body);

export const fetchBannersDatatable = ( body ) =>
  handlePOSTRequest("fetchBannersDatatable", body);

export const manageBanners = ( body ) =>
  handlePOSTRequest("manageBanners", body);

export const deleteBanners = ( body ) =>
handlePOSTRequest("deleteBanners", body);

export const fetchBankDatatable = ( body ) =>
  handlePOSTRequest("fetchBankDatatable", body);

export const manageBank = ( body ) =>
  handlePOSTRequest("manageBank", body);

export const deleteBank = ( body ) =>
  handlePOSTRequest("deleteBank", body);

export const fetchSupportDatatable = ( body ) =>
  handlePOSTRequest("fetchSupportDatatable", body);

export const fetchSupportSubmit = ( body ) =>
  handlePOSTRequest("fetchSupportSubmit", body);

export const searchTour = ( body ) =>
  handlePOSTRequest("searchTour", body);

export const searchRegion = (query) =>
  handleGETRequest("searchRegion", false, query);

export const searchAirport = (query) =>
  handleGETRequest("searchAirport", false, query);
  
export const searchAirline = (query) => 
  handleGETRequest("searchAirline", false, query);
  
export const searchHotel = (query) => 
  handleGETRequest("searchHotel", false, query);
  
//IDENTITY
export const fetchAdminDatatable = (body) =>
  handlePOSTRequest("fetchAdminDatatable", body);

export const fetchAdminUpdate = (body) =>
  handlePOSTRequest("fetchAdminUpdate", body);

export const fetchAdminSubmit = (body) =>
  handlePOSTRequest("fetchAdminSubmit", body);  

export const fetchAdminReset = (body) =>
  handlePOSTRequest("fetchAdminReset", body);  

export const fetchCustomerDatatable = (body) =>
  handlePOSTRequest("fetchCustomerDatatable", body);

export const fetchCustomerSummary = (query) =>
  handleGETRequest("fetchCustomerSummary", false, query);

export const fetchUserSummary = (query) =>
  handleGETRequest("fetchUserSummary", false, query);
   
export const fetchVoucherSummary = (body) =>
  handlePOSTRequest("summaryVoucher", body); 

export const fetchCustomerSubmitEdit = (body) =>
  handlePOSTRequest("fetchSubmitEdit", body);   
  
export const fetchAuditsUserDatatable = (body) =>
  handlePOSTRequest("fetchAuditsUserDatatable", body);

export const fetchCustomerList = (query) =>
  handleGETRequest("fetchCustomerList", false, query);

// PROMO
export const fetchAuditsPromoDatatable = (body) =>
  handlePOSTRequest("fetchAuditsPromoDatatable", body);

// WEBHOOK NOTIF EMAIL
export const eventNotif = (body) =>
  handlePOSTRequest("eventNotif", body);

// POPUP
export const fetchPopupsDatatable = (body) =>
  handlePOSTRequest("fetchPopupsDatatable", body);

export const managePopups = (body) =>
  handlePOSTRequest("managePopups", body);

export const deletePopups = (body) =>
  handlePOSTRequest("deletePopups", body);

// PUSH NOTIFICATION
export const fetchPushNotificationsDatatable = (body) =>
  handlePOSTRequest("fetchPushNotificationsDatatable", body);

export const managePushNotifications = (body) =>
  handlePOSTRequest("managePushNotifications", body);

export const deletePushNotifications = (body) =>
  handlePOSTRequest("deletePushNotifications", body);

// CHAT USERS
export const fetchChatUsersDatatable = (body) =>
  handlePOSTRequest("fetchChatUsersDatatable", body);

//POST As Form Data
// export const fetchFlightDatatable = (body) =>
// handlePOSTRequest("fetchFlightDatatable", body, false, true);

// export const fetchTourDetail = (query) =>
//   handleGETRequest(
//     "fetchTourDetail",
//     { id: "123123" },
//     { ...query, status: "active" }
//   );
