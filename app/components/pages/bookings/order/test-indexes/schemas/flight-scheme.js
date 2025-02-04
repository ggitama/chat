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
      title: "Order ID",
      dataIndex: "transactionCode",
      key: "transactionCode",
      width: 150,
      fixed: true,
      render:(text,row,index)=>{
        return (
          <Link href={`/bookings/flight/${row.transactionId}`}>
            <a style={{ color: blue[5] }}>{text}</a>
          </Link>
        )
      }
    },
    {
      title: "Order Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 150,
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: 150,
    },
    {
      title: "Cust. Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      width: 150,
    },
    {
      title: "Cust. Phone",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
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
      title: "Booking Code",
      dataIndex: "flightBookingCode",
      key: "flightBookingCode",
      width: 150,
    },
    {
      title: "Ticket Status",
      dataIndex: "statusTransaction",
      key: "statusTransaction",
      width: 150,
    },
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber",
      width: 150,
    },
    {
      title: "Airline Name",
      dataIndex: "airlineName",
      key: "airlineName",
      width: 150,
    },
    {
      title: "Flight Route",
      dataIndex: "routeType",
      key: "routeType",
      width: 150,
    },
    {
      title: "City Origin",
      dataIndex: "cityOrigin",
      key: "cityOrigin",
      width: 150,
    },
    {
      title: "City Origin",
      dataIndex: "cityDestination",
      key: "cityDestination",
      width: 150,
    },
    {
      title: "Expired",
      dataIndex: "bookingExpired",
      key: "bookingExpired",
      width: 150,
    }
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
    label: "Cust. Email",
    type: "Input",
    field: "customerEmail",
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
      { value: "1", label: "Flight" },
      { value: "2", label: "Hotel" },
      { value: "3", label: "Tour" },
    ],
    width: "25%",
  },
  {
    label: "Start Date",
    type: "Date",
    field: "bookingDateStart",
    value: "",
    width: "20%",
  },
  {
    label: "End Date",
    type: "Date",
    field: "bookingDateEnd",
    value: "",
    width: "20%",
  },
  {
    label: "Passenger Name",
    type: "Input",
    field: "passangerName",
    value: "",
    width: "25%",
  },
  {
    label: "Customer Phone",
    type: "Input",
    field: "customerPhoneNumber",
    value: "",
    width: "25%",
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
    label: "Booking Code",
    type: "Input",
    field: "bookingCode",
    value: "",
    width: "25%",
  },
  {
    label: "Price",
    type: "Input",
    field: "price",
    value: "",
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
    label: "Payment Date",
    type: "Date",
    field: "paymentDate",
    value: "",
    width: "20%",
  },
  {
    label: "Expired Date",
    type: "Date",
    field: "bookingExpiredDate",
    value: "",
    width: "20%",
  },
  {
    label: "Flight Number",
    type: "Input",
    field: "flightNumber",
    value: "",
    width: "25%",
  },
  {
    label: "Airline",
    type: "Input",
    field: "airlineName",
    value: "",
    width: "25%",
  },
  {
    label: "Origin",
    type: "Input",
    field: "originCity",
    value: "",
    width: "25%",
  },
  {
    label: "Destination",
    type: "Input",
    field: "destinationCity",
    value: "",
    width: "25%",
  },
  {
    label: "Rute",
    type: "Select",
    field: "routeType",
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