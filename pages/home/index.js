import { CmsCrumbs, CmsLoader } from "@/components/Cms";
import {
  crumbItems,
  initialState,
  reducer,
  useMainHooks,
} from "@/components/pages/home/indexes";
import { CardSummary } from "@/components/pages/home/indexes/CardSummaryCustomer";
import { MainCard } from "@/components/pages/users/test-indexes/mainCard";
import { useEffect, useReducer, useCallback, useState } from "react";

import { handleFetchBookingManagementSummary, handleVoucherSummary } from "app/api/helper";
import { fetchSalesBookingManagementSummary } from "app/api/booking";

// filter import
import { schemeFilter } from "@/components/pages/home/indexes/schemas/dashboard-filter-scheme";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import { Button, Card, Col, Pagination, Row, Table, Tabs, Collapse, Popover, DatePicker, Space } from "antd";
import { MinusOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const ScreenPage = (props) => {
  const pageTitle = "Dashboard";
  const [state, dispatch] = useReducer(reducer, initialState);

  const [summariesDataFlight, setSummariesDataFlight] = useState();
  const [summariesDataHotel, setSummariesDataHotel] = useState();
  const [summariesDataTour, setSummariesDataTour] = useState();

  const [summariesSalesDataFlight, setSummariesSalesDataFlight] = useState();
  const [summariesSalesDataHotel, setSummariesSalesDataHotel] = useState();
  const [summariesSalesDataTour, setSummariesSalesDataTour] = useState();

  const [summariesVoucherTotal, setSummariesVoucherTotal] = useState();
  const [summariesVoucherActive, setSummariesVoucherActive] = useState();
  const [summariesVoucherUsed, setSummariesVoucherUsed] = useState();

  const [filterFormData, setFilterFormData] = useState([]);
  const [errorFilterMessage, setErrorFilterMessage] = useState("");

  const [daily, setDaily] = useState(null);
  const [weekly, setWeekly] = useState(null);
  const [monthly, setMonthly] = useState(null);

  const [dailyString, setDailyString] = useState(null);
  const [weeklyString, setWeeklyString] = useState(null);
  const [monthlyString, setMonthlyString] = useState(null);

  // filter
  useEffect(() => {
    setFilterFormData([...schemeFilter()]);
  }, []);  // Tambahkan array dependency

  useEffect(() => {
    dispatch({ type: "FORM_FILTER", data: schemeFilter() });
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [dailyString, weeklyString, monthlyString]);  // Pastikan semua state yang diperlukan ada di sini  

  const handleFilterChange = useCallback(async () => {
    console.log('daily', dailyString);
    console.log('weekly', weeklyString);
    console.log('monthly', monthlyString);
  
    dispatch({ type: "SET_LOADING", isLoading: true });
  
    await handleGetSummaryVoucherTotal();
    await handleGetSummaryVoucherActive();
    await handleGetSummaryVoucherUsed();
  }, [dailyString, weeklyString, monthlyString]);  

  const onDateChange = (date, dateString) => {
    setDaily(date);
    setWeekly(null);
    setMonthly(null);

    setDailyString(dateString);
    setWeeklyString(null);
    setMonthlyString(null);
  }

  const onWeeklyDateChange = (date, dateString) => {
    setDaily(null);
    setWeekly(date);
    setMonthly(null);

    setDailyString(null);
    setWeeklyString(dateString);
    setMonthlyString(null);
  }

  const onMonthlyDateChange = (date, dateString) => {
    setDaily(null);
    setWeekly(null);
    setMonthly(date);

    setDailyString(null);
    setWeeklyString(null);
    setMonthlyString(dateString);
  }

// summary
const handler = useMainHooks(state, dispatch);
useEffect(() => {
  handler.handleGetSummary();
}, []);

const handleGetSummaryOrderFlight = useCallback(async () => {
  const respSummary = await handleFetchBookingManagementSummary({
    type: "flight",
    // status: ["COMPLETED", "NEED REVIEW", "paid", "TICKETED"],
  });

  const { resultData: resultSummary } = respSummary;
  setSummariesDataFlight({ ...resultSummary });
}, []);

const handleGetSummaryOrderHotel = useCallback(async () => {
  const respSummary = await handleFetchBookingManagementSummary({
    type: "hotel",
    status: "paid",
  });

  const { resultData: resultSummary } = respSummary
  setSummariesDataHotel({ ...resultSummary })
}, []);

const handleGetSummaryOrderTour = useCallback(async () => {
  const respSummary = await handleFetchBookingManagementSummary({
    type: "tour",
    status: "paid",
  });

  const { resultData: resultSummary } = respSummary
  setSummariesDataTour({ ...resultSummary })
}, []);

const handleGetSummarySalesFlight = useCallback(async () => {
  const respSummary = await fetchSalesBookingManagementSummary({
    type: "flight",
    status: "paid",
  });

  const { resultData: resultSummary } = respSummary;
  setSummariesSalesDataFlight({ ...resultSummary });
}, []);

const handleGetSummarySalesHotel = useCallback(async () => {
  const respSummary = await fetchSalesBookingManagementSummary({
    type: "hotel",
    status: ["COMPLETED", "NEED REVIEW", "paid", "TICKETED"],
  });

  const { resultData: resultSummary } = respSummary
  setSummariesSalesDataHotel({ ...resultSummary })
}, []);

const handleGetSummarySalesTour = useCallback(async () => {
  const respSummary = await fetchSalesBookingManagementSummary({
    type: "tour",
    status: ["COMPLETED", "NEED REVIEW", "paid", "TICKETED"],
  });

  const { resultData: resultSummary } = respSummary
  setSummariesSalesDataTour({ ...resultSummary })
}, []);

const handleGetSummaryVoucherTotal = useCallback(async () => {
  console.log({dailyCoupon: dailyString})
  const respSummary = await handleVoucherSummary({
    type: "total",
    daily: dailyString,
    weekly: weeklyString,
    monthly: monthlyString
  });

  const resultData = respSummary?.result?.responseData[0].total;
  setSummariesVoucherTotal(resultData)
}, [dailyString, weeklyString, monthlyString]);

const handleGetSummaryVoucherActive = useCallback(async () => {
  const respSummary = await handleVoucherSummary({
    type: "active",
    daily: dailyString,
    weekly: weeklyString,
    monthly: monthlyString
  });

  const resultData = respSummary?.result?.responseData[0].total;
  setSummariesVoucherActive(resultData);
}, [dailyString, weeklyString, monthlyString]);

const handleGetSummaryVoucherUsed = useCallback(async () => {
  const respSummary = await handleVoucherSummary({
    type: "used",
    daily: dailyString,
    weekly: weeklyString,
    monthly: monthlyString
  });

  const resultData = respSummary?.result?.responseData[0].total;
  setSummariesVoucherUsed(resultData);
}, [dailyString, weeklyString, monthlyString]);

useEffect(() => {
  dispatch({ type: "SET_LOADING", isLoading: true });
  handleGetSummaryOrderFlight();
  handleGetSummaryOrderHotel();
  handleGetSummaryOrderTour();

  handleGetSummarySalesFlight();
  handleGetSummarySalesHotel();
  handleGetSummarySalesTour();

  handleGetSummaryVoucherTotal();
  handleGetSummaryVoucherActive();
  handleGetSummaryVoucherUsed();
}, [
  handleGetSummaryOrderFlight,
  handleGetSummaryOrderHotel,
  handleGetSummaryOrderTour,

  handleGetSummarySalesFlight,
  handleGetSummarySalesHotel,
  handleGetSummarySalesTour,

  handleGetSummaryVoucherTotal,
  handleGetSummaryVoucherActive,
  handleGetSummaryVoucherUsed,
]);

let totalTransaction = (summariesDataFlight ? summariesDataFlight.countTransaction : 0) + (summariesDataHotel ? summariesDataHotel.countTransaction : 0) + (summariesDataTour ? summariesDataTour.countTransaction : 0);

// let totalSales = (summariesSalesDataFlight?summariesSalesDataFlight.finalPriceSum : 0) + (summariesSalesDataHotel? summariesSalesDataHotel.finalPriceSum : 0) + (summariesSalesDataTour? summariesSalesDataTour.finalPriceSum : 0);

let totalSales = (summariesDataFlight ? summariesDataFlight.finalPriceSum : 0) + (summariesSalesDataHotel ? summariesSalesDataHotel.finalPriceSum : 0) + (summariesSalesDataTour ? summariesSalesDataTour.finalPriceSum : 0);

let transactionHotel = summariesDataHotel ? summariesDataHotel.countTransaction : 0
let transactionTicket = summariesDataFlight ? summariesDataFlight.countTransaction : 0;
let transactionTour = summariesDataTour ? summariesDataTour.countTransaction : 0;

let salesHotel = summariesDataHotel ? summariesDataHotel.finalPriceSum : 0
// let salesTicket = summariesSalesDataFlight?summariesSalesDataFlight.finalPriceSum : 0
let salesTicket = summariesDataFlight ? summariesDataFlight.finalPriceSum : 0
let salesTour = summariesSalesDataTour ? summariesSalesDataTour.finalPriceSum : 0

let totalVoucher = summariesVoucherTotal ? summariesVoucherTotal : 0;
let activeVoucher = summariesVoucherActive ? summariesVoucherActive : 0;
let useVoucher = summariesVoucherUsed ? summariesVoucherUsed : 0;

let cardSummaryMain = [
  {
    summariesData: state?.cardSummaries.customerCount,
    type: 'number',
    subTitle: 'Total User',
    icon: "user",
  },
  {
    summariesData: totalSales,
    type: 'currency',
    subTitle: 'Total Sales',
    icon: "orders",
  },
  {
    summariesData: totalTransaction,
    type: 'number',
    subTitle: 'Total Transaction',
    icon: "tasks",
  },
]

let cardSummaryTransaction = [
  {
    summariesData: transactionTicket,
    type: 'number',
    subTitle: 'Total Transaction Ticket',
    icon: "tasks",
  },
  {
    summariesData: transactionHotel,
    type: 'number',
    subTitle: 'Total Transaction Hotel',
    icon: "tasks",
  },
  {
    summariesData: transactionTour,
    type: 'number',
    subTitle: 'Total Transaction Tour',
    icon: "tasks",
  },
]

let cardSummarySales = [
  {
    summariesData: salesTicket,
    type: 'currency',
    subTitle: 'Total Sales Ticket',
    icon: "orders",
  },
  {
    summariesData: salesHotel,
    type: 'currency',
    subTitle: 'Total Sales Hotel',
    icon: "orders",
  },
  {
    summariesData: salesTour,
    type: 'currency',
    subTitle: 'Total Sales Tour',
    icon: "orders",
  },
]

let cardSummaryVoucher = [
  {
    summariesData: totalVoucher,
    type: 'number',
    subTitle: 'Coupon Total',
    icon: "tickets",
  },
  {
    summariesData: activeVoucher,
    type: 'number',
    subTitle: 'Coupon Active',
    icon: "tickets",
  },
  {
    summariesData: useVoucher,
    type: 'number',
    subTitle: 'Coupon Used',
    icon: "tickets",
  },
]

if (state.IS_ON_LOADING && !state.DATA_LIST?.length) {
  return <CmsLoader customHeight={tableHeight} text="Loading" />;
}

return (
  <>
    <CmsCrumbs items={crumbItems()} />

    <MainCard title={pageTitle}>
      <>
        
        <Card bodyStyle={{ padding: "0px 0px" }} className="mb-2">
          <Collapse
            ghost
            expandIcon={({ isActive }) => {
              let iconCollapse = isActive ? (
                <MinusOutlined className="mr-2 gx-fs-xl" />
              ) : (
                <PlusOutlined className="mr-2 gx-fs-xl" />
              );
              let labelContent = !isActive ? "Show" : "Hide";

              return (
                <Popover content={`${labelContent} Filter`}>{iconCollapse}</Popover>
              );
            }}
            expandIconPosition={"end"}
          >
            <Collapse.Panel header={<b>Filter</b>} style={{ margin: 0 }}>
              <Space direction="horizontal" size="large">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "normal" }}>Daily</label>
                  <DatePicker value={daily} onChange={onDateChange} />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "normal" }}>Weekly</label>
                  <DatePicker value={weekly} onChange={onWeeklyDateChange} picker="week" />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "normal" }}>Monthly</label>
                  <DatePicker value={monthly} onChange={onMonthlyDateChange} picker="month" />
                </div>

                <Button style={{ marginTop: "39px" }} className="ant-btn gx-btn-secondary">
                  Apply Filter
                </Button>
              </Space>
            </Collapse.Panel>
          </Collapse>
        </Card>

        <CardSummary props={[...cardSummaryMain]} />
        <br /><br /><br />
        <CardSummary props={[...cardSummaryTransaction]} />
        <br />
        <CardSummary props={[...cardSummarySales]} />
        <br /><br />
        <CardSummary props={[...cardSummaryVoucher]} />

      </>
    </MainCard>
  </>
);
};

// const DynamicFilterPage = ({ props }) => {
//   const [
//     { filterFormData, errorFilterMessage },
//     { setIsShowFilter },
//     // { handlerFilterEvents, handlerFilterUpdate, handlerFilterSubmit },
//     { dispatch },
//     { onChange }
//   ] = props;

//   const [daily, setDaily] = useState(null);
//   const [weekly, setWeekly] = useState(null);
//   const [monthly, setMonthly] = useState(null);

//   const handleDailyChange = (date, dateString) => {
//     setDaily(date);
//     setWeekly(null);
//     setMonthly(null);
//   }

//   const handleWeeklyChange = (date, dateString) => {
//     setDaily(null);
//     setWeekly(date);
//     setMonthly(null);
//   }

//   const handleMonthlyChange = (date, dateString) => {
//     setDaily(null);
//     setWeekly(null);
//     setMonthly(date)
//   }

//   return (
//     <>
//       <Card
//         bodyStyle={{ padding: "0px 0px" }}
//         className="mb-2"
//       >
//         <Collapse
//           ghost
//           expandIcon={({ isActive }) => {
//             let iconCollapse = isActive ? (
//               <MinusOutlined className="mr-2 gx-fs-xl" />
//             ) : (
//               <PlusOutlined className="mr-2 gx-fs-xl" />
//             );
//             let labelContent = !isActive ? "Show" : "Hide";

//             return (
//               <Popover content={`${labelContent} Filter`}>{iconCollapse}</Popover>
//             );
//           }}
//           expandIconPosition={"end"}
//           onChange={(isCollapseActive) => {
//             dispatch({
//               type: "IS_SHOW_FILTER",
//               data: isCollapseActive.length ? true : false,
//             });
//           }}
//         >
//           <CollapsePanel
//             header={<b>Filter</b>}
//             style={{ margin: 0 }}
//           >
//             <Space direction="horizontal" size="large">
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label  style={{ fontWeight: "normal" }}>Daily</label>
//                 <DatePicker value={daily} onChange={handleDailyChange} />
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label  style={{ fontWeight: "normal" }}>Weekly</label>
//                 <DatePicker value={weekly} onChange={handleWeeklyChange} picker="week" />
//               </div>

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <label  style={{ fontWeight: "normal" }}>Monthly</label>
//                 <DatePicker value={monthly} onChange={handleMonthlyChange} picker="month" />
//               </div>

//               <Button
//                 style={{ marginTop: "39px" }}
//                 className="ant-btn gx-btn-secondary">
//                 Apply Filter
//               </Button>
//             </Space>

//           </CollapsePanel>
//         </Collapse>
//       </Card>
//     </>
//   );
// };

export default ScreenPage;
