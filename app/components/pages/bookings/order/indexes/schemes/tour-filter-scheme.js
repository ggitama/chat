export const formFilterScheme = () => [
  {
    label: "Order ID",
    type: "Input",
    field: "orderId",
    value: "",
    width: "25%",
  },
  {
    label: "Promo Code",
    type: "Input",
    field: "promoCode",
    value: "",
    width: "25%",
  },
  {
    label: "Departure Date",
    type: "Date",
    value: "",
    width: "20%",
  },
  {
    label: "Tour Name",
    type: "Input",
    field: "tourName",
    value: "",
    width: "25%",
  },
  {
    label: "Promo Type",
    type: "Select",
    field: "promoType",
    value: "",
    options: [
      { value: "", label: "All" },
    ],
    width: "25%",
  },
  {
    label: "Order Source",
    type: "Select",
    field: "source",
    value: "",
    options: [
      { value: "", label: "All" },
    ],
    width: "25%",
  },
  {
    label: "Start Date (Booking Date)",
    type: "Date",
    value: "",
    width: "20%",
  },
  {
    label: "End Date (Booking Date)",
    type: "Date",
    value: "",
    width: "20%",
  },
  {
    label: "Ticket Status",
    type: "Select",
    field: "ticketStatus",
    value: "",
    options: [
      { value: "", label: "All" },
    ],
    width: "25%",
  }, 
  {
    label: "Order Status",
    type: "Select",
    field: "orderStatus",
    value: "",
    options: [
      { value: "", label: "All" },
    ],
    width: "25%",
  },   
  {
    label: "Payment Method",
    type: "Select",
    field: "paymentMethod",
    value: "",
    options: [
      { value: "", label: "All" },
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

