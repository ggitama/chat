export const initialState = {
  IS_SHOW_FILTER:false,
  IS_SHOW_MODAL_CREATE:false,
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
  if(newState[actionType]){
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
        TOTAL_DATA:action?.pagination?.total
      }
      break;
    case "LOAD_START":

      newState = {
        IS_ON_LOADING:true,
        // DATA_LIST:[],
        pagination
      }
      break;
    case "CHANGE_PAGESIZE":
      pagination.currentPage = 1

      newState = {
        IS_ON_LOADING:true,
        // DATA_LIST:[],
        pagination
      }
      break;
    case "CHANGE_CURRENTPAGE":
      
      newState = {
        IS_ON_LOADING:true,
        // DATA_LIST:[],
        pagination
      }

      break;
    default : 
  }
  

  return {
    ...state,
    ...newState
  }
}
