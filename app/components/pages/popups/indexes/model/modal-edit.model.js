export const schemaModal = ()=>{
  return {
    popupTitle:{
      value: "",
      type: "Input",
      label: "Popup Title",
      required: true,
      error: ""
    },
    popupSubtitle:{
      value: "",
      type: "Input",
      label: "Popup Subtitle",
      required: true,
      error: ""
    },
    platform:{
      value: "",
      type: "Select",
      label:"Platform",
      options:[
        { value:"",label:"Please Select"},
        { value: "All", label: "All" },
        { value: "Web", label: "Web" },
        { value: "App", label: "App" },
      ],
      required: true,
      error: "",
    },
    urlType:{
      value: "",
      type: "Select",
      label:"Url Type",
      options:[
        { value: "none", label: "None" },
        { value: "internal_promo", label: "Internal - Promo" },
        { value: "external", label: "External" },
      ],
      required: true,
      error: "",
    },
    promoId:{
      value: "",
      type: "Select",
      hidden: true,
      label:"Promo Code",
      options:[
        { value:"",label:"Please select Promo Type first"}
      ],
      error: "",
    },
    urlLink:{
      value: "",
      type: "hidden",
      label: "Url Link",
      required: false,
      error: ""
    },
    urlTarget:{
      value: "",
      hidden: true,
      type: "Select",
      label:"Url Target",
      options:[
        { value:"",label:"Please Select"},
        { value: "own_tab", label: "Own Tab" },
        { value: "new_tab", label: "New Tab" },
      ],
      required: true,
      error: "",
    },
    homeImageUrl:{
      value: "",
      type: "Upload",
      label: "Home Page Image",
      required: true,
      error: "",
      dimension: { width: 1920, height: 400, validate: false}
    },
    mobileImageUrl:{
      value: "",
      type: "Upload",
      label: "Mobile Image",
      required: true,
      error: "",
      dimension: { width: 800, height: 800, validate: false }
    },
    startDate:{
      value: "",
      type: "Date",
      label:"Start Date",
      required: true,
      error: "",
    },
    endDate:{
      value: "",
      type: "Date",
      label:"End Date",
      required: true,
      error: "",
    },
    status:{
      value: "",
      validationType:"boolean",
      type: "Switch",
      label:"Status",
      required: true,
      error: "",
    },
    popupDescription:{
      value: "",
      type: "InputArea",
      label:"Description",
      error: "",
    },
  }
}