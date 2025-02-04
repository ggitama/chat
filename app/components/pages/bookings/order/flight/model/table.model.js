
import { SortableHeader } from "@/components/Table/sortableHeader";
import ColorHelper from "@/util/cms/color.helper";
import DataTableHelper from "@/util/cms/datatable.helper";
import Link from "next/link";
import * as moment from "moment-timezone";
import NumberHelper from "@/util/cms/number.helper";

export const columnsTable = (
  props
) => {
  const {
    state,
    dispatch
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
      ...DataTableHelper.sortableAttr({
        title:"Order Id",
        dataIndex:"transactionCode",
        props
      }),
      width: 150,
      fixed: true,
      render:(text,row,index)=>{
        return (
          <Link href={`/bookings/flight/${row.transactionId}`}>
            <a style={{ color: ColorHelper.blue() }} target="_blank" >{text}</a>
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
        // return row.bookingDate ? moment.tz(row.bookingDate,  "Asia/Jakarta").format('YYYY-MM-DD HH:mm') : '-'
        return row.bookingDate ? moment(row.bookingDate).format('YYYY-MM-DD HH:mm') : '-'
      },
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
      ...DataTableHelper.sortableAttr({
        title:"Order Status",
        dataIndex:"invoiceStatus",
        props
      }),
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
      title: "Booking Code",
      dataIndex: "flightBookingCode",
      key: "flightBookingCode",
      width: 150,
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
      title: "City Destination",
      dataIndex: "cityDestination",
      key: "cityDestination",
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