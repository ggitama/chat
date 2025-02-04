export const schemaModal = ()=>{
  return {
    email:{
      label:"Email",
      disabled:false,
      required: true,
      value: "",
      error: "",
    },
    role:{
      label:"Role",
      type:"Select",
      options:[
      ],
      disabled:false,
      required: true,
      value: "",
      error: "",
    },
    password:{
      label:"Password",
      type:"Input",
      disabled:false,
      required: true,
      value: "",
      error: "",
    },
    confirmPassword:{
      label:"Confirm Password",
      type:"Input",
      disabled:false,
      required: true,
      value: "",
      error: "",
    },
  }
}