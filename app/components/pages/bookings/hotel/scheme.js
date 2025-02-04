import * as moment from "moment-timezone"
export const itemsTab = ({props}) => {
  const [
    {activeTab,sectionContent}
  ] = props
  let items = [
    {
      key:"detail",
      label:"Order Detail",
      children:(activeTab =="detail" && sectionContent)
    },
    {
      key:"payment",
      label:"Payment",
      children:(activeTab =="payment" && sectionContent)
    },
    {
      key:"guest",
      label:"Guest",
      children:(activeTab =="guest" && sectionContent)
    }
  ];

  return items
}

export const dataSourceDetail = (dataSource) => {
  const {
    order:contentOrder,
    invoice:contentInvoice
  } = dataSource

  contentOrder.bookingDate = contentOrder?.bookingDate ? moment.tz(contentOrder?.bookingDate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : null
  contentOrder.createdAt = contentOrder?.createdAt ? moment.tz(contentOrder?.createdAt, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : null
  contentInvoice.createdAt = contentInvoice?.createdAt ? moment.tz(contentInvoice?.createdAt, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : null

  let columns = [
    {
      label:"Order ID",
      value:contentOrder?.transactionCode
    },
    {
      label:"Order Date",
      value:contentOrder?.bookingDate
    },
    {
      label:"Order Status",
      value:contentInvoice?.status ? contentInvoice.status : 'N/A'
    },
    {
      label:"Ticket Status",
      value:contentOrder?.status
    },
    {
      label:"Vendor",
      value:contentOrder?.source
    },
    {
      label:"Total Price",
      value:`Rp. ${contentOrder?.totalPrice?.display}`
    },
    {
      label:"Last Update",
      value:contentInvoice?.createdAt || contentOrder?.createdAt
    },
    {
      label:"Platform",
      value:contentOrder?.platform ? contentOrder?.platform : '-'
    },
    {
      label:"Order Source",
      value:contentOrder?.source
    },
  ];

  return columns
}

export const dataSourceRoomDetail = (dataSource) => {
  const {
    order:contentOrder,
    detail:contentDetail
  } = dataSource

  const {
    room:detailRoom
  } = contentDetail

  let columns = [
    {
      label:"Check In Date",
      value:moment.tz(detailRoom.checkInDate, 'UTC').format('YYYY-MM-DD HH:mm')
    },
    {
      label:"Check Out Date",
      value:moment.tz(detailRoom.checkOutDate, 'UTC').format('YYYY-MM-DD HH:mm')
    },
    {
      label:"Hotel Name",
      value:detailRoom.hotelName
    },
    {
      label:"Category Name",
      value:"n/a"
    },
    {
      label:"Room Type",
      value:detailRoom.roomType
    },
    {
      label:"Guest Request",
      value:detailRoom.guestRequest || "n/a"
    },
    {
      label:"Meal Type",
      value:detailRoom.mealPlan
    },
    {
      label:"Total Room",
      value:detailRoom.totalRoom
    },
    {
      label:"Voucher ID",
      value:detailRoom.voucherId || "n/a"
    },
    {
      label:"Hotel Source Booking ID",
      value:contentOrder?.source
    },
    {
      label:"File Number",
      value:"n/a"
    },
    {
      label:"Hotel Policy",
      value:(detailRoom.hotelPolicy=="NRF") ? "Tidak dapat dibatalkan" : detailRoom.hotelPolicy 
    },    
  ];

  return columns
}

export const dataSourceCustomer = (dataSource) => {
  const {
    customer:dataCustomer
  } = dataSource

  const {
    fullname:customerName="",
    phoneCountryCode="",
    phoneNUmber:customerPhone,
    email:customerEmail=""
  } = dataCustomer

  let columns = [
    {
      label:"Name",
      value:customerName
    },
    {
      label:"Email",
      value:customerEmail
    },
    {
      label:"Telephone",
      value:`(${phoneCountryCode}) ${customerPhone}`
    },
  ];

  return columns
}