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
          <Link href={`/bookings/hotel/${row.transactionId}`}>
            <a style={{ color: blue[5] }} >{text}</a>
          </Link>
        )
      }
    },
    {
      title: "Guest Name",
      dataIndex: "guestName",
      key: "guestName",
      width: 150,
    },
    {
      title: "Check In / Out",
      dataIndex: "checkinDate",
      key: "checkinDate",
      width: 150,
      reunder:(text,row)=>{
        return `${row.checkinDate} / ${row.checkoutDate}`
      }
    },
    {
      title: "Customer Email",
      dataIndex: "contactEmail",
      key: "contactEmail",
      width: 150,
    },
    {
      title: "Customer Phone",
      dataIndex: "contactPhone",
      key: "contactPhone",
      width: 150,
    },    
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 150,
    }, 
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 150,
    },     
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 150,
    },
    {
      title: "Voucher ID",
      dataIndex: "voucherNo",
      key: "voucherNo",
      width: 150,
    },
    {
      title: "Voucher Status",
      dataIndex: "statusTransaction",
      key: "statusTransaction",
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
    label: "Check In Date",
    type: "Date",
    field: "checkInDate",
    value: "",
    width: "20%",
  },
  {
    label: "Check Out Date",
    type: "Date",
    field: "checkOutDate",
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