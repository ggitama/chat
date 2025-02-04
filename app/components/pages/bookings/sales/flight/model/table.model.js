
import ColorHelper from "@/util/cms/color.helper";
import DataTableHelper from "@/util/cms/datatable.helper";
import NumberHelper from "@/util/cms/number.helper";
import * as moment from "moment-timezone";
import Link from "next/link";

export const columnsTable = (
  props
) => {
  const {
    state
  } = props
  
  let columns = [
    {
      title: "#",
      dataIndex: "transactionId",
      key: "transactionId",
      align: "center",
      width:45,
      fixed: true,
      render:(text,row,index)=>{
        return DataTableHelper.rowNumber(index,{
          currentPage:state?.pagination?.currentPage,
          pageSize:state?.pagination?.pageSize
        })
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
            <a style={{ color: ColorHelper.blue() }}  target="_blank" >{text}</a>
          </Link>
        )
      }
    },
    {
      ...DataTableHelper.sortableAttr({
        title:"Order Date",
        dataIndex:"bookingDate",
        props
      }),
      width: 150,
      render: (text, row, index) => {
        return row.bookingDate ? moment.tz(row.bookingDate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-'
      },
    },
    {
      ...DataTableHelper.sortableAttr({
        title:"Order Status",
        dataIndex:"invoiceStatus",
        props
      }),
      fixed: true,
      width: 150,
      render:(text,row,index)=>{
        return row.invoiceStatus ? row.invoiceStatus : 'N/A'
      }
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 150,
    },
     {
      ...DataTableHelper.sortableAttr({
        title: "Payment Date",
        dataIndex: "paymentDate",
        props
      }),
      width: 150,
      render: (text, row, index) => {
        return row.paymentDate ? moment.tz(row.paymentDate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-'
      },
    },
     {
      ...DataTableHelper.sortableAttr({
        title:"Cust. Email",
        dataIndex:"customerEmail",
        props
      }),
      width: 150,
    },
    {
      title: "Cust. Phone",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      width: 150,
    },
    {
      title: "Passenger Name",
      dataIndex: "passangers",
      key: "passangers",
      width: 150,
      render:(text,row,index)=>{
        if(!text) return 
        let guestList = text.map(row=>{
          return (<li>{row}</li>)
        })
        return (
          <ul>
            {guestList}
          </ul>
        )
      }
    },
    {
      title: "Departure City",
      dataIndex: "cityOrigin",
      key: "cityOrigin",
      width: 150,
    },
    {
      ...DataTableHelper.sortableAttr({
        title:"Departure Date",
        dataIndex:"departureDate",
        props
      }),
      width: 150,
      render: (text, row, index) => {
        return row.departureDate ? moment.tz(row.departureDate, 'UTC').format('YYYY-MM-DD HH:mm') : '-'
      },
    },
    {
      title: "Arrival Route",
      dataIndex: "cityDestination",
      key: "cityDestination",
      width: 150,
    },
    {
      title: "Arrival Date",
      dataIndex: "arrivalDate",
      key: "arrivalDate",
      width: 150,
      render: (text, row, index) => {
        return row.arrivalDate ? moment.tz(row.arrivalDate, 'UTC').format('YYYY-MM-DD HH:mm') : '-'
      },
    },
    {
      ...DataTableHelper.sortableAttr({
        title:"Airline Name",
        dataIndex:"airlineName",
        props
      }),
      width: 150,
    },
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber",
      width: 150,
    },
    {
      title: "Flight Route",
      dataIndex: "routeType",
      key: "routeType",
      width: 150,
    },
    {
      title: "Booking Code",
      dataIndex: "flightBookingCode",
      key: "flightBookingCode",
      width: 150,
    },
    {
      ...DataTableHelper.sortableAttr({
        title:"Price",
        dataIndex:"totalPrice",
        props
      }),
      width: 150,
       render: (text, row, index) => {
        row.totalPrice = NumberHelper.formatThousand(row.totalPrice)
        return `Rp. ${row.totalPrice}`
      },
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
       render: (text, row, index) => {
        row.discountAmount = NumberHelper.formatThousand(row.discountAmount)
        return `Rp. ${row.discountAmount}`
      },
    },
    {
      ...DataTableHelper.sortableAttr({
        title:"Ticket Status",
        dataIndex:"transactionStatus",
        props
      }),
      width: 150,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      width: 150,
    },
    {
      title: "Expired",
      dataIndex: "bookingExpired",
      key: "bookingExpired",
      width: 150,
      render: (text, row, index) => {
        return row.bookingExpired ? moment.tz(row.bookingExpired, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-'
      },
    }
  ];

  // columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}