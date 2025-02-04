import MainService from "app/api/base"

const ApiHelper = {
  generalResponse:(response)=>{
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
  handleGETRequest:async ({
    api,
    param:params={},
    query:query={},
    noAuth = false
  }) => {
    // let lang = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : process.env.REACT_APP_DEFAULT_LANG;
    
    const {
      result: { body: bodyResult },
      errorJS=null
    }  = await MainService(api)
      .doRequest({ 
        noAuth,
        params: { ...params }, 
        query: { ...query }, 
      })
      .then((res) => res)
      .catch((errorGeneral) => {
        _this.handleGeneralError(errorGeneral);
        return _this._catchErrorResponse(bodyResult,errorGeneral)
      });

    return _this._returnDefaultResponse(bodyResult,errorJS)

  },
  _catchErrorResponse:(bodyResult,error)=>{
    return {
      result: { result: bodyResult },
      errorJS: error,
    };
  },
  _returnDefaultResponse:(bodyResult,error=null)=>{
    return { result: bodyResult , error:error};
  }
}

// alias so it's shorter 
// and more readble in circular access
const _this = ApiHelper
export default ApiHelper