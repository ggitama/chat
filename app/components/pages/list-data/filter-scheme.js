export const formFilterScheme = () => [
  {
    label: "Input",
    type: "Input",
    field: "username",
    value: "",
    width: "25%",
    required: true
  },
  {
    label: "Search",
    type: "Search",
    field: "promo_id",
    searchTerm: "Promo",
    asParamFilters: false,
    value: "",
    width: "25%",
  },
  {
    label: "Search By Category",
    type: "SearchByCategory",
    field: "id",
    searchTerm: "flight",
    value: "",
    options: [
      { value: "flight", label: "Flight", },
      { value: "hotel", label: "Hotel" },
      { value: "tour", label: "Tour" },
    ],
    width: "30%",
  },
  {
    label: "Date Picker",
    type: "Date",
    value: new Date(),
    width: "20%",
  },
  {
    label: "Email",
    type: "Input",
    field: "email",
    value: "",
    width: "25%",
  },
  {
    label: "Select Multi and Create ",
    type: "SelectCreateMulti",
    value: "",
    placeHolder: "Hashtag",
    width: "25%",
  },
  {
    label: "Order Type",
    type: "Select",
    field: "doc_type_id",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "1", label: "Flight" },
      { value: "2", label: "Hotel" },
      { value: "3", label: "Tour" },
    ],
    width: "25%",
  },
  {
    label: "Search Creatable",
    type: "SearchCreatable",
    field: "promo_id",
    searchTerm: "Promo",
    asParamFilters: false,
    value: "",
    width: "25%",
  },
  {
    label: "Address",
    type: "Input",
    field: "address",
    value: "",
    width: "calc(100% - 110px)",
  },

  {
    label: "Apply Filter",
    type: "ButtonAction",
    disabled: false,
    width: "110px",
    style: "ant-btn gx-btn-secondary ",
  },
];

export const formFilterSchemeIntegrated = () => [
  {
    label: "Tour Name",
    type: "Input",
    field: "tourName",
    value: "",
    width: "25%",
  },
  {
    label: "Status Transaction",
    type: "Select",
    field: "ticketStatus",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "EXPIRED", label: "Expired" },
      { value: "TICKETED", label: "Ticketed" },
    ],
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

