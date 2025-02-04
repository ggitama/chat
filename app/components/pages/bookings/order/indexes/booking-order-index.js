import { Divider } from "antd";
import { blue, green, red } from "@ant-design/colors";
import FlightTabChild from "./partials/flightTabChild";
import HotelTabChild from "./partials/hotelTabChild";
import TourTabChild from "./partials/tourTabChild";

export const itemsTab = ({
  activeTab,
  setIsDataLoaded,
  isShowFilter,
  setIsShowFilter,
  columnsTable,
  tableConfig,
  formFilter,
  errorFilter="",
  eventHandleFilter,
  updateFormFilter,
  handleSubmitFilter,
}) => {
  
  let items = [
    {
      key:"flight",
      label:"Flight",
      children:(
        activeTab=="flight" && 
        <FlightTabChild {
          ...{
            setIsShowFilter,
            setIsDataLoaded,
            isShowFilter,
            columnsTable,
            tableConfig,
            formFilter,
            errorFilter,
            eventHandleFilter,
            updateFormFilter,
            handleSubmitFilter,
          }
        }
        />
      )
    },
    {
      key:"hotel",
      label:"Hotel",
      children:(
        activeTab=="hotel" && 
        <HotelTabChild {
            ...{
              setIsShowFilter,
              setIsDataLoaded,
              isShowFilter,
              columnsTable,
              tableConfig,
              formFilter,
              errorFilter,
              eventHandleFilter,
              updateFormFilter,
              handleSubmitFilter,
            }
        }
        />
      )
    },
    {
      key:"tour",
      label:"Tour",
      children:(
        activeTab=="tour" && 
        <TourTabChild
          {
              ...{
                setIsShowFilter,
                setIsDataLoaded,
                isShowFilter,
                columnsTable,
                tableConfig,
                formFilter,
                errorFilter,
                eventHandleFilter,
                updateFormFilter,
                handleSubmitFilter,
              }
          }
        />
      )
    }
  ];

  return items
}

export const columnsFlightTable = ({
  activeTab,
  setIsDataLoaded,
  isShowFilter,
}) => {
  
  let columns = [
    {
      title: "#",
      dataIndex: "uuid",
      key: "uuid",
      align: "center",
      width:25,
      fixed: true,
      render:(text,row,index)=>{
        let rowIndex = pageSize*(pageCurrentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
      fixed: true,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
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
      dataIndex: "customerPhone",
      key: "customerPhone",
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
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Booking Code",
      dataIndex: "bookingCode",
      key: "bookingCode",
      width: 150,
    },
    {
      title: "Ticket Status",
      dataIndex: "ticketStatus",
      key: "ticketStatus",
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
      dataIndex: "flightRouteType",
      key: "flightRouteType",
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
      dataIndex: "expiredDate",
      key: "expired",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "uuid",
      key: "uuid",
      width:150,
      render:(text,record)=>{
        return(
        <div>
          <button
            className="gx-mb-0 gx-btn-clear"
            style={{ color: blue[5] }}
            onClick={() =>
              setIsModalEditShow({ isLoadingPromise: false, data: record })
            }
          >
            Edit
          </button>
          <Divider type="vertical" />
          <button
            className="gx-mb-0 gx-btn-clear"
            onClick={() =>
              setIsModalUpdateShow({ isLoadingPromise: false, data: record })
            }
            style={{ color: record.status === "Active" ? red[5] : green[5] }}
          >
            {record.status === "Active" ? "Inactivate" : "Activate"}
          </button>
        </div>
        )
      }
    },
  ];

  return columns
}

export const columnsTourTable = ({
  activeTab,
  setIsDataLoaded,
  isShowFilter,
}) => {
  
  let columns = [
    {
      title: "#",
      dataIndex: "uuid",
      key: "uuid",
      align: "center",
      width:25,
      fixed: true,
      render:(text,row,index)=>{
        let rowIndex = pageSize*(pageCurrentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      width: 150,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
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
      dataIndex: "price",
      key: "price",
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
      dataIndex: "discountValue",
      key: "discountValue",
      width: 150,
    },
    {
      title: "Ticket Status",
      dataIndex: "ticketStatus",
      key: "ticketStatus",
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
    {
      title: "Action",
      dataIndex: "uuid",
      key: "uuid",
      width:150,
      render:(text,record)=>{
        return(
        <div>
          <button
            className="gx-mb-0 gx-btn-clear"
            style={{ color: blue[5] }}
            onClick={() =>
              setIsModalEditShow({ isLoadingPromise: false, data: record })
            }
          >
            Edit
          </button>
          <Divider type="vertical" />
          <button
            className="gx-mb-0 gx-btn-clear"
            onClick={() =>
              setIsModalUpdateShow({ isLoadingPromise: false, data: record })
            }
            style={{ color: record.status === "Active" ? red[5] : green[5] }}
          >
            {record.status === "Active" ? "Inactivate" : "Activate"}
          </button>
        </div>
        )
      }
    },
  ];

  return columns
}

export const columnsHotelTable = ({
  activeTab,
  setIsDataLoaded,
  isShowFilter,
}) => {
  
  let columns = [
    {
      title: "#",
      dataIndex: "uuid",
      key: "uuid",
      align: "center",
      width:25,
      fixed: true,
      render:(text,row,index)=>{
        let rowIndex = pageSize*(pageCurrentPage-1)
        return rowIndex+index+1
      }
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      width: 150,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
    },
    {
      title: "Guest Name",
      dataIndex: "guestName",
      key: "guestName",
      width: 150,
    },
    {
      title: "Check In / Out",
      dataIndex: "checkInDate",
      key: "checkInDate",
      width: 150,
    },
    {
      title: "Customer Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
      width: 150,
    },
    {
      title: "Customer Phone",
      dataIndex: "customerPhone",
      key: "customerPhone",
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
      dataIndex: "price",
      key: "price",
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
      dataIndex: "voucherStatus",
      key: "voucherStatus",
      width: 150,
    },      
    {
      title: "Action",
      dataIndex: "uuid",
      key: "uuid",
      width:150,
      render:(text,record)=>{
        return(
        <div>
          <button
            className="gx-mb-0 gx-btn-clear"
            style={{ color: blue[5] }}
            onClick={() =>
              setIsModalEditShow({ isLoadingPromise: false, data: record })
            }
          >
            Edit
          </button>
          <Divider type="vertical" />
          <button
            className="gx-mb-0 gx-btn-clear"
            onClick={() =>
              setIsModalUpdateShow({ isLoadingPromise: false, data: record })
            }
            style={{ color: record.status === "Active" ? red[5] : green[5] }}
          >
            {record.status === "Active" ? "Inactivate" : "Activate"}
          </button>
        </div>
        )
      }
    },
  ];

  return columns
}