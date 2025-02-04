export const schemaModalCreate = ()=>{
  return {
    email:{
      value: "",
      type: "Input",
      label:"Email",
      required: true,
      error: "",
    },
    role:{
      value: "",
      type: "Select",
      label:"Role",
      options:[
        { value:"",label:"Please Select"},
        { value:"admin",label:"Admin"},
        { value:"user",label:"User"},
        { value:"superadmin",label:"Superadmin"}
      ],
      required: true,
      error: "",
    },
    password:{
      value: "",
      validationType:"alphanumeric",
      type: "Input",
      label:"Password",
      required: true,
      error: "",
    },
    confirmPassword:{
      value: "",
      type: "Input",
      validationType:"alphanumeric",
      label:"Confirm Password",
      required: true,
      error: "",
    },
  }
}