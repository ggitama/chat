
export const schemeFilterTable = () => [
  {
    label: "Product Type",
    type: "Select",
    field: "productType",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "flight", label: "Flight" },
      { value: "hotel", label: "Hotel" },
      { value: "tour", label: "Tour" },
    ],
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
    width: "25%"
  },  
  {
    label: "Banner Title",
    type: "Input",
    field: "title",
    value: "",
    width: "50%"
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