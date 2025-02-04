export const initialState = {
  IS_SHOW_FILTER:false,
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
  TOTAL_DATA:0,
  DATA_SORT:[],
  IS_READY:false,
  IS_APPLY_FILTER:0,
  IS_SHOW_MODAL_VIEW:false
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
    currentPage:action?.data?.currentPage || action?.pagination?.currentPage || state.pagination.currentPage,
    pageSize:action?.data?.pageSize || action?.pagination?.pageSize || state.pagination.pageSize
  }

  switch(actionType){
    case "LOAD_SUCCESS":
      newState = {
        IS_ON_LOADING:false,
        IS_ON_LOADING_TABLE:false,
        DATA_LIST:action.data,
        pagination,
        TOTAL_DATA:action?.pagination?.totalData || 0
      }
      break;
    case "LOAD_START":
      newState = {
        IS_ON_LOADING:true,
        IS_ON_LOADING_TABLE:true,
      }
      break; 
    case "CHANGE_PAGESIZE":
        pagination.currentPage = 1
  
        newState = {
          IS_ON_LOADING_TABLE:true,
          // DATA_LIST:[],
          pagination
        }
        break;
    case "CHANGE_CURRENTPAGE":
      
      newState = {
        IS_ON_LOADING_TABLE:true,
        // DATA_LIST:[],
        pagination
      }

      break;
    case "FORM_FILTER":
      newState = {
        FORM_FILTER:action.data
      }
      break;      
    case "CHANGE_TAB":
      newState = {
        IS_ON_LOADING_TABLE:true,
        DATA_LIST:[],
      }
      break;  
    case "APPLY_FILTER":
      newState = {
        DATA_FILTER:action.data,
        pagination,
        IS_APPLY_FILTER:true
      }
      break;           
    default : 
  }
  

  return {
    ...state,
    ...newState
  }
}
