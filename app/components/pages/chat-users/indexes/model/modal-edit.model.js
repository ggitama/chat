export const schemaModal = ()=>{
  return {
    notificationName:{
      value: "",
      type: "Input",
      label: "Notification Name",
      required: true,
      error: ""
    },
    notificationType:{
      value: "",
      type: "Select",
      label:"Notification Type",
      options:[
        { value:"",label:"Please Select"},
        { value: "info", label: "Info" },
        { value: "promo", label: "Promo" },
      ],
      required: true,
      error: "",
    },
    platform:{
      value: "",
      type: "Select",
      label:"Platform",
      options:[
        { value:"",label:"Please Select"},
        { value: "All", label: "All" },
        { value: "android", label: "Android" },
        { value: "ios", label: "iOS" },
      ],
      required: true,
      error: "",
    },
    audience:{
      value: "",
      type: "Select",
      label:"Audience",
      options:[
        { value:"",label:"Please Select"},
        { value: "all_users", label: "All User" },
        { value: "registered_user", label: "User Antavaya" },
      ],
      required: true,
      error: "",
    },
    mobileImageUrl:{
      value: "",
      type: "Upload",
      label: "Mobile Image",
      required: false,
      error: "",
      // dimension: { width: 800, height: 800, }
    },
    sendNotificationDate:{
      value: "",
      type: "Date",
      label:"Send Notification Date",
      format: "YYYY-MM-DD HH:mm",
      showTime: { format: 'HH:mm' },
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
    description:{
      value: "",
      type: "InputArea",
      label:"Description",
      error: "",
      required: true,
    },
  }
}