export const initialState = {
    IS_SHOW_FILTER:false,
    IS_SHOW_MODAL_CREATE:false,
    IS_SHOW_MODAL_VIEW:false,
    IS_SHOW_MODAL_EDIT:false,
    IS_SHOW_MODAL_DELETE:false,
    IS_ON_LOADING:false,
    IS_ON_LOADING_TABLE:false,
    DATA_SORT:[],
    FORM_FILTER:[],
    DATA_FILTER:[],
    DATA_LIST:[],
    messages:{
      errorFilter:""
    },
    pagination:{
      currentPage:1,
      pageSize:10
    },
    TOTAL_DATA:0
  }

export const reducer = ( state, action ) => {
  let newState = {}
  let actionType = action.type

  let hasDefaultHandler = typeof initialState[actionType] != "undefined"
  if(hasDefaultHandler) newState[actionType] = action.data

  let pagination = {
    currentPage: action?.data?.currentPage || state.pagination.currentPage,
    pageSize: action?.data?.pageSize || state.pagination.pageSize,
    DATA_SORT: state.DATA_SORT
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
        IS_ON_LOADING: true
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
    case "DATA_SORT":
      
      newState = {
        IS_ON_LOADING_TABLE:true,
        // DATA_LIST:[],
        pagination,
        DATA_SORT: action.data
      }

      break;
    case "FORM_FILTER":
      newState = {
        FORM_FILTER:action.data
      }
      break;      
    default:
      break
  }

  let updateStated = {
    ...state,
    ...newState
  }

  return updateStated
}