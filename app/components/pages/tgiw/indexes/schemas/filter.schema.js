export const schemeFilterTable = ()=>{
  return [{
    label: "Email",
    type: "Input",
    field: "email",
    value: "",
    width: "25%"
  },

  {
    label: "Apply Filter",
    type: "ButtonAction",
    disabled: false,
    width: "110px",
    style: "ant-btn gx-btn-secondary",
  }
  ]
}