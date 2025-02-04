export const initialState = {
  IS_SHOW_FILTER:false,
  IS_SHOW_MODAL_CREATE:false,
  IS_SHOW_MODAL_VIEW:false,
  IS_SHOW_MODAL_EDIT:false,
  IS_ON_LOADING:false,
  IS_ON_LOADING_TABLE:false,
  FORM_FILTER:[],
  DATA_FILTER:[],
  DATA_LIST:[],
  messages:{
    errorFilter:""
  },
  pagination:{
    currentPage:0,
    pageSize:10
  },
  TOTAL_DATA:0
}

export const reducer = (state,action)=>{
  let newState = {}
  let actionType = action.type
  

  // default state appended
  let hasDefaultHandler = typeof initialState[actionType]!= "undefined"
  if(hasDefaultHandler){
    newState[actionType] = action.data
  }

  let pagination = {
    currentPage:action?.data?.currentPage || state.pagination.currentPage,
    pageSize:action?.data?.pageSize || state.pagination.pageSize
  }

  switch(actionType){
    case "LOAD_SUCCESS":
      newState = {
        IS_ON_LOADING:false,
        DATA_LIST:action.data,
        pagination
      }
      break;
    case "LOAD_START":
      newState = {
        IS_ON_LOADING:true,
        // DATA_LIST:[],
        // pagination
      }
      break;
    default :
      break;
  }
  

  let updateStated = {
    ...state,
    ...newState
  }
  
  return updateStated
}
