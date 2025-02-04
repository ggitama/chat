
import ColorHelper from "@/util/cms/color.helper";
import DataTableHelper from "@/util/cms/datatable.helper";
import Link from "next/link";
import * as moment from "moment-timezone"
import NumberHelper from "@/util/cms/number.helper";

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
      title: "Order Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      width: 150,
      render: (text, row, index) => {
        return row.bookingDate ? moment.tz(row.bookingDate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-'
      },
    },
    {
      ...DataTableHelper.sortableAttr({
        title:"Order Id",
        dataIndex:"transactionCode",
        props
      }),
      width: 150,
      render:(text,row,index)=>{

        return (
          <Link href={`/bookings/tour/${row.transactionId}`}>
            <a style={{ color: ColorHelper.blue() }} target="_blank" >{text}</a>
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
      dataIndex: "tourStartDate",
      key: "tourStartDate",
      width: 150,
      render: (text, row, index) => {
        return row.tourStartDate ? moment.tz(row.tourStartDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : '-'
      },
    },
    {
      ...DataTableHelper.sortableAttr({
        title: "Price",
        dataIndex: "totalPrice",
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
        title: "Ticket Status",
        dataIndex: "transactionStatus",
        props
      }),
      width: 150,
    }, 
    {
      ...DataTableHelper.sortableAttr({
        title: "Order Status",
        dataIndex: "invoiceStatus",
        props
      }),      
      width: 150,
      render:(text,row,index)=>{
        return row.invoiceStatus ? row.invoiceStatus : 'N/A'
      }
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      width: 150,
    },
    // {
    //   title: "Order Source",
    //   dataIndex: "source",
    //   key: "source",
    //   width: 150,
    // },
  ];

  // columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}