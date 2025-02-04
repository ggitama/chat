export const initialState = {
  IS_SHOW_FILTER:false,
  IS_SHOW_MODAL_CREATE:false,
  IS_ON_LOADING:false,
  IS_ON_LOADING_TABLE:false,
  FORM_FILTER:[],
  DATA_FILTER:[],
  DATA_LIST:[],
  DATA_MENU:[],
  DATA_ROLE_OPTIONS:[],
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

  switch(actionType){
    case "LOAD_SUCCESS":
      let lookupMenu = action.data
      newState = {
        IS_ON_LOADING:false,
        DATA_LIST:[...state.DATA_LIST.map(row=>{
          let key = row.name
          row.isGranted = lookupMenu.includes(key) 
          return row
        })]
      }
      break;
    case "LOAD_START":
      newState = {
        IS_ON_LOADING:true,
      }
      break;
    case "INIT_DATA_MENU":
      let dataMenu = action.data.map(row=>{

        return {
          ...row,
          isGranted:null
        }
      })
      newState = {
        DATA_LIST:dataMenu
      }
      break;  
    default : 
  }
  

  return {
    ...state,
    ...newState
  }
}
