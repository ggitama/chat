export const schemaModal = ()=>{
  return {
    displayName:{
      value: "",
      type: "Input",
      label: "Name",
      required: true,
      error: ""
    },
    email:{
      value: "",
      type: "Input",
      label: "Email",
      required: true,
      error: ""
    },
    status:{
      value: "",
      type: "Select",
      label:"Status",
      options:[
        { value:"",label:"Please Select"},
        { value: "TL", label: "Tour Leader" },
        { value: "User", label: "User" },
      ],
      required: true,
      error: "",
    },
    phoneNumber:{
      value: "",
      type: "Input",
      label: "Phone Number",
      required: true,
      error: ""
    },
    // photoURL:{
    //   value: "",
    //   type: "Upload",
    //   label: "Profil Image",
    //   required: false,
    //   error: "",
    //   // dimension: { width: 800, height: 800, }
    // },
  }
}