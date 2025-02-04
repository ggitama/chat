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
  switch (action.type) {
    case "SET_DATA_LIST":
      return {
        ...state,
        DATA_LIST: action.data, // Pastikan DATA_LIST di-set dengan data yang benar
      };
    // Tambahkan case lain jika diperlukan
    default:
      return state;
  }
};
