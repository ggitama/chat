export const schemaModal = ()=>{
  return {
    newPassword:{
      label:"New Password",
      type:"input",
      disabled:false,
      required: false,
      value: "",
      error: "",
    },
    confirmPassword:{
      label:"Confirm Password",
      type:"input",
      disabled:false,
      required: false,
      value: "",
      error: "",
    },
  }
}