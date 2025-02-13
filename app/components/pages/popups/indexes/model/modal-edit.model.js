export const schemaModal = ()=>{
  return {
    name:{
      value: "",
      type: "Input",
      label: "Name",
      required: true,
      error: ""
    },
    type:{
      value: "",
      type: "Select",
      label:"Type",
      options:[
        { value:"",label:"Please Select"},
        { value: "private", label: "Private" },
        { value: "public", label: "Public" },
      ],
      required: true,
      error: "",
    },
    members: {
      value: [], // Nilai default sebagai array kosong
      type: "MultiSelect", // Menentukan bahwa ini adalah MultiSelect
      label: "Members", 
      options: [], // Akan diisi dengan data dari API
      required: true,
      error: "",
    },   
  }
}