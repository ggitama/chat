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
      key:"passanger",
      label:"Passenger",
      children:(activeTab =="passanger" && sectionContent)
    }
  ];

  return items
}

export const dataSourceDetail = (dataSource) => {
  let totalAllPrice = dataSource?.detail?.totalAllPrice?.display
  let bookingDate = dataSource?.order?.bookingDate ? moment.tz(dataSource.order.bookingDate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : null
  let lastUpdate = dataSource?.invoice?.createdAt || dataSource?.order?.createdAt 
  lastUpdate = lastUpdate ? moment.tz(lastUpdate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : null
  let columns = [
    {
      label:"Order ID",
      value:dataSource?.order?.transactionCode
    },
    {
      label:"Order Date",
      value:bookingDate
    },
    {
      label:"Order Status",
      value:dataSource?.invoice?.status ? dataSource.invoice.status : 'N/A'
    },
    {
      label:"Ticket Status",
      value:dataSource?.order?.status
    },
    {
      label:"Vendor Depart",
      value:dataSource?.order?.source || "Flight Engine"
    },
    {
      label:"Total Price",
      value:`Rp. ${totalAllPrice}`
    },
    {
      label:"Last Update",
      value:lastUpdate
    },
    {
      label:"Platform",
      value:dataSource?.order?.platform ? dataSource?.order?.platform : '-'
    }
  ];

  return columns
}

export const dataSourceCustomer = (customer) => {
  let {
    fullname:customerName="",
    email:customerEmail="",
    phoneCountryCode="",
    phoneNUmber:customerPhoneNumber="",
  } = customer

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
      value:`(${phoneCountryCode}) ${customerPhoneNumber}`
    },
  ];

  return columns
}

export const columnsItenaryFlight = (flight) => {
  let columns = [
    {
      title:"PNR",
      dataIndex:"pnr"
    },
    {
      title:"PNR GDS",
      dataIndex:"pnrGds"
    },
    {
      title:"Airline",
      dataIndex:"airline"
    },
    {
      title:"Airport",
      dataIndex:"airport"
    },
    {
      title:"City",
      dataIndex:"city"
    },
    {
      title:"Local Time",
      dataIndex:"localTime"
    },
    {
      title:"Flight Source Booking ID",
      dataIndex:"flightSource"
    },
  ];

  return columns
}