export const schemaModal = ()=>{
  return {
    name:{
      value: "",
      type: "Input",
      label: "Name",
      required: true,
      error: ""
    },
    codes:{
      value: "",
      type: "Input",
      label: "Source",
      required: true,
      error: ""
    },
    logo:{
      value: "",
      type: "Upload",
      label: "Logo",
      required: true,
      error: ""
    }
  }
}