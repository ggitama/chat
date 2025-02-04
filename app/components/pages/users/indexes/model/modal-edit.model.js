export const schemaModal = ()=>{
  return {
    userRoleId:{
      label:"User Id",
      disabled:true,
      required: false,
      value: "",
      error: "",
    },
    email:{
      label:"Email",
      disabled:true,
      required: false,
      value: "",
      error: "",
    },
    phoneNumber:{
      label:"Phone Number",
      type:"Input",
      disabled:false,
      required: false,
      value: "",
      error: "",
    },
    role:{
      label:"Role",
      type:"Select",
      options:[
      ],
      disabled:false,
      required: false,
      value: "",
      error: "",
    },    
  }
}