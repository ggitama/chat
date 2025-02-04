export const schemaModal = ()=>{
  return {
    uuid:{
      label:"ID",
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
    // phoneNumber:{
    //   label:"Phone Number",
    //   disabled:true,
    //   required:false,
    //   value: "",
    //   error: "",
    // },
    title:{
      label:"Title",
      type:"Select",
      disabled:false,
      required:false,
      value: "",
      error: "",
      options:[
        {value:"Mr",label:"Mr."},
        {value:"Mrs",label:"Mrs."},
        {value:"Ms",label:"Ms."},
      ]
    },
    firstName:{
      label:"First Name",
      disabled:true,
      required:false,
      value: "",
      error: "",
    },
    lastName:{
      label:"Last Name",
      disabled:true,
      required:false,
      value: "",
      error: "",
    },
    // address:{
    //   label:"Address",
    //   disabled:true,
    //   required:false,
    //   value: "",
    //   error: "",
    // },
    // dob:{
    //   label:"Date of Birth",
    //   disabled:true,
    //   required:false,
    //   value: "",
    //   error: "",
    // },
    // age:{
    //   label:"Age",
    //   disabled:true,
    //   required:false,
    //   value: "",
    //   error: "",
    // },
    createdAt:{
      label:"Created At",
      disabled:true,
      required:false,
      value: "",
      error: "",
    },
  }
}