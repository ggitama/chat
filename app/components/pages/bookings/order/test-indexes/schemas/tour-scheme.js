import { Divider } from "antd";
import { blue, green, red } from "@ant-design/colors";
import Link from "next/link";

export const columnsTable = ({props}) => {
  let [
    {activeTab,isShowFilter,pageSize,currentPage:pageCurrentPage}
  ] = props

  let columns = [
    {
      title: "#",
      dataIndex: "transactionId",
      key: "transactionId",
      align: "center",
      width:45,
      fixed: true,
      render:(text,row,index)=>{
        let rowIndex = pageSize*(pageCurrentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title: "Order Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 150,
    },
    {
      title: "Order ID",
      dataIndex: "transactionCode",
      key: "transactionCode",
      width: 150,
      render:(text,row,index)=>{

        return (
          <Link href={`/bookings/tour/${row.transactionId}`}>
            <a style={{ color: blue[5] }} >{text}</a>
          </Link>
        )
      }
    },
    {
      title: "Tour Name",
      dataIndex: "tourName",
      key: "tourName",
      width: 150,
    },
    {
      title: "Departure Date",
      dataIndex: "departureDate",
      key: "departureDate",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 150,
    },
    {
      title: "Promo Code",
      dataIndex: "promoCode",
      key: "promoCode",
      width: 150,
    },
    {
      title: "Discount Value",
      dataIndex: "discountAmount",
      key: "discountAmount",
      width: 150,
    },
    {
      title: "Ticket Status",
      dataIndex: "statusTransaction",
      key: "statusTransaction",
      width: 150,
    }, 
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 150,
    },
    {
      title: "Order Source",
      dataIndex: "source",
      key: "source",
      width: 150,
    },
  ];

  return columns
}

export const schemeFilterTable = () => [
  {
    label: "Order ID",
    type: "Input",
    field: "transactionCode",
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
    field: "tourDepartureDate",
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
    field: "bookingDateStart",
    value: "",
    width: "20%",
  },
  {
    label: "End Date (Booking Date)",
    type: "Date",
    field: "bookingDateEnd",
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