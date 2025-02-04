export const formFilterScheme = () => [
  {
    label: "Order ID",
    type: "Input",
    field: "orderId",
    value: "",
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
    label: "Voucher ID",
    type: "Input",
    field: "voucherNo",
    value: "",
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
    label: "Check In Date",
    type: "Date",
    value: "",
    width: "20%",
  },
  {
    label: "Check Out Date",
    type: "Date",
    value: "",
    width: "20%",
  },
  {
    label: "Customer Email",
    type: "Input",
    field: "customerEmail",
    value: "",
    width: "25%",
  },
  {
    label: "Customer Phone",
    type: "Input",
    field: "customerPhone",
    value: "",
    width: "25%",
  },
  {
    label: "Voucher Status",
    type: "Select",
    field: "transactionStatus",
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

