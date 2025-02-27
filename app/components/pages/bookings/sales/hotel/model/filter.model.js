
export const schemeFilterTable = () => [
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
      { value: "booked", label: "BOOKED" },
      { value: "unpaid", label: "UNPAID" },
      { value: "expired", label: "EXPIRED" },
      { value: "paid", label: "PAID" },
      { value: "cancelled", label: "CANCELLED" },
      { value: "completed", label: "COMPLETED" }
      // { value: "booked", label: "Transaksi dipesan" },
      // { value: "unpaid", label: "Transaksi menunggu pembayaran" },
      // { value: "expired", label: "Transaksi lewat jatuh tempo" },
      // { value: "paid", label: "Transaksi berhasil terbayar" },
      // { value: "cancelled", label: "Transaksi dibatalkan" },
      // { value: "completed", label: "Transaksi selesai" }
    ],
    width: "25%",
  },
  // {
  //   label: "Order Source",
  //   type: "Input",
  //   field: "orderSource",
  //   value: "",
  //   width: "25%",
  // },
  {
    label: "Promo Code",
    type: "Input",
    field: "promoCode",
    value: "",
    width: "25%",
  },
  {
    label: "Payment Method",
    type: "Select",
    field: "paymentMethod",
    value: "",
    width: "25%",
    options: [
      { value: "", label: "All" },
      { value: "allopoint", label: "Allo Point" },
      { value: "allopay", label: "Allo Pay" },
      { value: "allopaylater", label: "Allo Paylater" },
      { value: "briva", label: "Bank BRI VA" },
      { value: "bniva", label: "Bank BNI VA" },
      { value: "bankmega", label: "Bank Mega" },
      { value: "megacc", label: "Bank Mega CC" },
      { value: "megadc", label: "Bang Mega DC" },
      { value: "megava", label: "Bank Mega VA" },
      { value: "mandiriva", label: "Mandiri VA" },
    ],
  },  
  {
    label: "Promo Type",
    type: "Input",
    field: "promoType",
    value: "",
    width: "25%",
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
    label: "Check In Date",
    type: "Date",
    field: "checkInDate",
    value: "",
    width: "25%",
  },
  {
    label: "Check Out Date",
    type: "Date",
    field: "checkOutDate",
    value: "",
    width: "25%",
  },
  {
    label: "Start Date",
    type: "Date",
    field: "dateStart",
    value: "",
    width: "25%",
  },
  {
    label: "End Date",
    type: "Date",
    field: "dateEnd",
    value: "",
    width: "25%",
  },
  {
    label: "Voucher ID",
    type: "Input",
    field: "voucherId",
    value: "",
    width: "25%",
  },
  {
    label: "Voucher Status",
    type: "Select",
    field: "voucherStatus",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "BOOKED", label: "BOOKED" },
      { value: "COMPLETED", label: "COMPLETED" },
      { value: "CANCELLED", label: "CANCELLED" },
      { value: "EXPIRED", label: "EXPIRED" },
      { value: "TICKETED", label: "TICKETED" },
      { value: "PAID", label: "PAID" },
      { value: "REFUNDED", label: "REFUNDED" },
      { value: "NEED REVIEW", label: "NEED REVIEW" },
      { value: "UNPAID", label: "UNPAID" }, 
    ],
    width: "25%",
  },
  {
    label: "Platform",
    type: "Select",
    field: "platform",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "web", label: "Website" },
      { value: "ios", label: "iOS" },
      { value: "android", label: "Android" },
    ],
    width: "25%",
  },

  {
    label: "Apply Filter",
    type: "ButtonAction",
    disabled: false,
    width: "110px",
    style: "ant-btn",
  },

  {
    label: "Export Excel",
    type: "ButtonDownload",
    disabled: false,
    width: "110px",
    style: "ant-btn",
  },
];