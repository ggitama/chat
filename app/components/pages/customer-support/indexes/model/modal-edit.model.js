export const schemaModal = ()=>{
  return {
    name:{
      label:"Name",
      disabled:true,
      required: false,
      value: "",
      error: "",
    },
    description:{
      label:"Description",
      disabled:true,
      required: false,
      value: "",
      error: "",
    },
    value1:{
      label:"Config Value 1",
      disabled:false,
      required: true,
      value: "",
      error: "",
    },
    value2:{
      label:"Config Value 2",
      disabled:false,
      required: true,
      value: "",
      error: "",
    }
  }
}