export const schemeFilter = () => [
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
        label: "Platform",
        type: "Select",
        field: "platform",
        value: "",
        options: [
            { value: "All", label: "All" },
            { value: "Web", label: "Web" },
            { value: "App", label: "App" },
        ],
        width: "25%"
    },
    {
        label: "Promo Code",
        type: "Input",
        field: "promoCode",
        value: "",
        width: "25%",
    },
    {
        label: "Promo Name",
        type: "Input",
        field: "promoName",
        value: "",
        width: "25%",
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
        label: "Is Hidden",
        type: "Select",
        field: "isHidden",
        value: null,
        options: [
            { value: null, label: "All" },
            { value: "1", label: "True" },
            { value: "0", label: "False" },
        ],
        width: "25%"
    },
    {
        label: "Apply Filter",
        type: "ButtonAction",
        disabled: false,
        width: "110px",
        style: "ant-btn gx-btn-secondary ",
    },
];