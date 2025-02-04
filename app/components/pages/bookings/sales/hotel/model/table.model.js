
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
      ...DataTableHelper.sortableAttr({
        title: "Order Date",
        dataIndex: "bookingDate",
        props
      }),
      fixed: true,
      width: 150,
      render: (text, row, index) => {
        return row.bookingDate ? moment.tz(row.bookingDate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : '-'
      },
    },
    {
      ...DataTableHelper.sortableAttr({
        title: "Order ID",
        dataIndex: "transactionCode",
        props
      }),
      width: 150,
      fixed: true,
      render:(text,row,index)=>{
        return (
          <Link href={`/bookings/hotel/${row.transactionId}`}>
            <a style={{ color: ColorHelper.blue() }} target="_blank" >{text}</a>
          </Link>
        )
      }
    },
    {
      title: "Guest Name",
      dataIndex: "guests",
      key: "guests",
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
        title: "Customer Email",
        dataIndex: "contactEmail",
        props
      }),
      width: 150,
    },
    {
      title: "Customer Phone",
      dataIndex: "contactPhone",
      key: "contactPhone",
      width: 150,
    },    
    {
      ...DataTableHelper.sortableAttr({
        title: "Check In",
        dataIndex: "checkinDate",
        props
      }),
      width: 150,
    },
    {
      ...DataTableHelper.sortableAttr({
        title: "Check Out",
        dataIndex: "checkoutDate",
        props
      }),
      width: 150,
    },
    {
      ...DataTableHelper.sortableAttr({
        title: "Hotel Name",
        dataIndex: "hotelName",
        props
      }),
      width: 150,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 150,
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
      title: "Voucher ID",
      dataIndex: "voucherNo",
      key: "voucherNo",
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
       render: (text, row, index) => {
        row.discountAmount = NumberHelper.formatThousand(row.discountAmount)
        return `Rp. ${row.discountAmount}`
      },
    },
    {
      ...DataTableHelper.sortableAttr({
        title: "Voucher Status",
        dataIndex: "transactionStatus",
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
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      width: 150,
    },       
  ];

  // columns = DataTableHelper.columnAutoByWeight(columns)
  return columns
}