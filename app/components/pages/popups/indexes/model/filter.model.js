
export const schemeFilterTable = () => [
  {
    label: "Notification Name",
    type: "Input",
    field: "notificationName",
    value: "",
    width: "25%"
  },
  {
    label: "Notification Type",
    type: "Select",
    field: "notificationType",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "info", label: "Info" },
      { value: "promo", label: "Promo" },
    ],
    width: "25%",
    height: "150px"
  },  
  {
    label: "Platform",
    type: "Select",
    field: "platform",
    value: "",
    options: [
      { value: "", label: "All" },
      { value: "android", label: "Android" },
      { value: "ios", label: "iOS" },
    ],
    width: "25%",
    height: "150px"
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
    label: "Send Notification Date",
    type: "Date",
    field: "sendNotificationDate",
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