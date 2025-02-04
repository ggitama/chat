
export const schemeFilterTable = () => [
  {
    label: "Popup Title",
    type: "Input",
    field: "popupTitle",
    value: "",
    width: "25%"
  },
  {
    label: "Status",
    type: "Select",
    field: "status",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    width: "25%",
    height: "150px"
  },  
  {
    label: "Start Date",
    type: "Date",
    field: "startDate",
    value: "",
    width: "25%",
  },
  {
    label: "End Date",
    type: "Date",
    field: "endDate",
    value: "",
    width: "25%",
  },
  {
    label: "Apply Filter",
    type: "ButtonAction",
    disabled: false,
    width: "110px",
    style: "ant-btn gx-btn-secondary ",
  },
];