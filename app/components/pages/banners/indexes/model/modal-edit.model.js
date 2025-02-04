export const schemaModal = ()=>{
  return {
    productType:{
      value: "",
      type: "Select",
      label:"Banner Type",
      options:[
        { value:"",label:"Please Select"},
        { value: "flight", label: "Flight" },
        { value: "hotel", label: "Hotel" },
        { value: "tour", label: "Tour" },
      ],
      required: true,
      error: "",
    },
    title:{
      value: "",
      type: "Input",
      label: "Banner Title",
      required: true,
      error: ""
    },
    subtitle:{
      value: "",
      type: "Input",
      label: "Banner Subtitle",
      required: true,
      error: ""
    },
    urlType:{
      value: "",
      type: "Select",
      label:"Url Type",
      options:[
        // { value:"",label:"Please Select"},
        { value: "none", label: "None" },
        { value: "internal_promo", label: "Internal - Promo" },
        { value: "internal_search", label: "Internal - Search" },
        { value: "free_text", label: "Free Text" },
        { value: "external", label: "External" },
      ],
      required: true,
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
    tnc:{
      value: "",
      type: "InputArea",
      label:"Term & Condition",
      required: true,
      error: "",
    },
    sortOrder:{
      value: "",
      type: "Input",
      label: "Sort Order",
      required: false,
      error: ""
    },
    status:{
      value: "",
      validationType:"boolean",
      type: "Switch",
      label:"Status",
      required: true,
      error: "",
    },
    description:{
      value: "",
      type: "InputArea",
      label:"Description",
      error: "",
    },
    descriptionHTML:{
      value: "",
      type: "InputArea",
      label:"Description",
      error: "",
    },
  }
}