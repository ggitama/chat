import MainService from "app/api/base"
import axios from "axios";

const ApiHelper = {
  generalResponse: (response) => {
    if (response.success) {
      return {
        isError: false,
        resultData: response.data,
      };
    }
    return {
      isError: response.error,
      resultData: [],
    };
  },
  handleGeneralError:(error) =>{
    console.log("General Error", error)
  },
  handlePOSTRequest:async ({
    api,
    body,
    param,
    asFormData=false,
    noAuth=false
  }) => {
  
    const formData = new FormData();
    let actualBody = { ...body };
  
    if (asFormData) {
      // eslint-disable-next-line
      for (const key in body) {
        formData.append(key, body[key]);
      }
      actualBody = formData;
    }
    
    const {
      result: { body: bodyResult },
      errorJS=null
    }  = await MainService(api)
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

        _this.handleGeneralError(errorGeneral);
        return _this._catchErrorResponse(bodyResult,errorGeneral)
      });
  
    return _this._returnDefaultResponse(bodyResult,errorJS)
  },
  handleGETRequest: async ({ api, body }) => {
    try {
      // Map API endpoint
      const apiEndpoints = {
        fetchPushNotificationsDatatable: 'http://localhost:3030/users',
      };

      const apiUrl = apiEndpoints[api];

      if (!apiUrl) throw new Error('Invalid API endpoint');

      // Request dengan query parameters dari body
      const response = await axios.get(apiUrl, { params: body });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
  handleGETChatsRequest: async ({ api, body }) => {
    try {
      // Map API endpoint
      const apiEndpoints = {
        fetchPopupsDatatable: 'http://localhost:3030/chats',
      };

      const apiUrl = apiEndpoints[api];

      if (!apiUrl) throw new Error('Invalid API endpoint');

      // Request dengan query parameters dari body
      const response = await axios.get(apiUrl, { params: body });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
  handleDELRequest: async (
    param, body, formData
  ) => {
    try {
      // Map API endpoints
      const apiEndpoints = {
        deletePushNotifications: `http://localhost:3030/usersdelete/${formData.uuid}`,
      };
  
      console.log(body);
      const apiUrl = apiEndpoints[api];
  
      if (!apiUrl) throw new Error("Invalid API endpoint");
  
      const {
        result: { body: bodyResult },
        errorJS = null,
      } = await axios.delete(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res)
      .catch((errorGeneral) => {
        _this.handleGeneralError(errorGeneral);
        return _this._catchErrorResponse(bodyResult, errorGeneral);
      });
  
      return _this._returnDefaultResponse(bodyResult, errorJS);
    } catch (error) {
      return { isError: true, message: error.message };
    }
  }
  

}

const _this = ApiHelper
export default ApiHelper