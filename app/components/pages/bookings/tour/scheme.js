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
      key:"participant",
      label:"Participant",
      children:(activeTab =="participant" && sectionContent)
    }
  ];

  return items
}

export const dataSourceDetail = (dataSource) => {

  dataSource.order.bookingDate = dataSource?.order?.bookingDate ? moment.tz(dataSource?.order?.bookingDate, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : null
  dataSource.order.createdAt = dataSource?.order?.createdAt ? moment.tz(dataSource?.order?.createdAt, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : null
  dataSource.invoice.createdAt = dataSource?.invoice?.createdAt ? moment.tz(dataSource?.invoice?.createdAt, moment.tz.guess()).format('YYYY-MM-DD HH:mm') : null
  
  let columns = [
    {
      label:"Order ID",
      value:dataSource?.order?.transactionCode
    },
    {
      label:"Order Date",
      value:dataSource?.order?.bookingDate
    },
    {
      label:"Order Status",
      value:dataSource?.invoice?.status ? dataSource.invoice.status : 'N/A'
    },
    {
      label:"Voucher Status",
      value:dataSource?.order?.status
    },
    {
      label:"Total Price",
      value:`Rp. ${dataSource?.order?.totalPrice?.display}`
    },
    {
      label:"Last Update",
      value:dataSource?.invoice?.createdAt || dataSource?.order?.createdAt
    },
    {
      label:"Platform",
      value:dataSource?.order?.platform ? dataSource?.order?.platform : '-'
    },
    {
      label:"Order Source",
      value:dataSource?.order?.source || ""
    },
  ];

  return columns
}

export const dataSourceTourDetail = (dataSource) => {
  const {
    detail:contentDetail
  } = dataSource
  const {
    tour:tourDetail
  } = contentDetail

  let columns = [
    {
      label:"Booking Tour ID",
      value:""
    },
    {
      label:"Tour Name",
      value:tourDetail?.name
    },
    {
      label:"Tour Code",
      value:tourDetail?.code
    },
    {
      label:"Departure Date",
      value:tourDetail?.departureDate
    },
    {
      label:"Duration",
      value:tourDetail?.duration
    },
    {
      label:"Carrier",
      value:tourDetail?.carrier
    },
    {
      label:"Total Guest",
      value:tourDetail?.totalGuest
    },
    {
      label:"Total Room",
      value:tourDetail?.totalRoom
    },
    {
      label:"API ID",
      value:"n/a"
    },    
  ];

  return columns
}

export const dataSourceCustomer = (dataSource) => {
  const {
    fullname,
    email,
    phoneCountryCode,
    phoneNUmber:phoneNumber
  } = dataSource
  let columns = [
    {
      label:"Name",
      value:fullname
    },
    {
      label:"Email",
      value:email
    },
    {
      label:"Telephone",
      value:`(${phoneCountryCode}) ${phoneNumber}`
    },
  ];

  return columns
}

export const dataSourceRoomDetail = (dataSource) => {
  const {
    detail:contentDetail
  } = dataSource
  const {
    rooms:roomDetail
  } = contentDetail

  const contentRooms = [...roomDetail]
  const guestRowName = (row,index)=>{
    let {
      title,
      firstname:firstName,
      lastname:lastName,
      isIncludeVisa:isHasVisa,
      passangerType
    } = row
    let labelIncludeVisa = (isHasVisa==false) ? ", include visa" : ""
    return `${title} ${firstName} ${lastName} (${passangerType}${labelIncludeVisa})`
  }
  let columns = contentRooms.map(row=>{

    let guests = row.guests.map(guestRowName)
    let requestExtraBed = (row.isExtraBed) ? "true" : "false"
    return {
      label:`Room ${row.roomIndex}`,
      roomType:"n/a",
      isExtraBed:requestExtraBed,
      guests
    }
  });

  return columns
}