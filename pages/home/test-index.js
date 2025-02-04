import { CmsCrumbs, CmsLoader } from "@/components/Cms";
import {
  crumbItems,
  initialState,
  reducer,
  useMainHooks,
} from "@/components/pages/home/indexes";
import { CardSummary } from "@/components/pages/home/indexes/CardSummaryCustomer";
import { CardSummaryOrder } from "@/components/pages/home/indexes/CardSummaryOrder";
import { MainCard } from "@/components/pages/users/test-indexes/mainCard";

import { Divider } from "antd";
import { useEffect, useReducer, useCallback, useState } from "react";

import { handleFetchBookingManagementSummary } from "app/api/helper";
import { notification } from "antd";

const ScreenPage = (props) => {
  const pageTitle = "Dashboard";
  const [state, dispatch] = useReducer(reducer, initialState);

  const [summariesDataFlight, setSummariesDataFlight] = useState()
  const [summariesDataHotel, setSummariesDataHotel] = useState()
  const [summariesDataTour, setSummariesDataTour] = useState()

  const handler = useMainHooks(state, dispatch);
  useEffect(() => {
    handler.handleGetSummary();
  }, []);

  const handleGetSummaryOrderFlight = useCallback(async () => {
    const respSummary = await handleFetchBookingManagementSummary({
      type: "flight",
      isSummary: true,
    });

    // if (respSummary.isError) {
    //   notification.error({ message: respSummary.isError });
    //   return;
    // }

    console.log({respSummary})

    const {resultData:resultSummary} = respSummary
    setSummariesDataFlight({...resultSummary})
  }, []);

  const handleGetSummaryOrderHotel = useCallback(async () => {
    const respSummary = await handleFetchBookingManagementSummary({
      type: "hotel",
    });

    // if (respSummary.isError) {
    //   notification.error({ message: respSummary.isError });
    //   return;
    // }

    const {resultData:resultSummary} = respSummary
    setSummariesDataHotel({...resultSummary})
  }, []);

  const handleGetSummaryOrderTour = useCallback(async () => {
    const respSummary = await handleFetchBookingManagementSummary({
      type: "tour",
    });

    // if (respSummary.isError) {
    //   notification.error({ message: respSummary.isError });
    //   return;
    // }

    const {resultData:resultSummary} = respSummary

    setSummariesDataTour({...resultSummary})
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", isLoading: true });
    handleGetSummaryOrderFlight();
    handleGetSummaryOrderHotel();
    handleGetSummaryOrderTour();
  }, [handleGetSummaryOrderFlight, handleGetSummaryOrderHotel, handleGetSummaryOrderTour]);

  const cardSummaryFlightProps = [
    {
      summariesData: summariesDataFlight
    }
  ]
  
  const cardSummaryHotelProps = [
    {
      summariesData: summariesDataHotel
    }
  ]

  const cardSummaryTourProps = [
    {
      summariesData: summariesDataTour
    }
  ]

  if (state.IS_ON_LOADING && !state.DATA_LIST?.length) {
    return <CmsLoader customHeight={tableHeight} text="Loading" />;
  }

  console.log({cardSummaryFlightProps})

  return (
    <>
      <CmsCrumbs items={crumbItems()} />

      <MainCard title={pageTitle}>
        <>
           {/* <Divider orientation="left" orientationMargin={0}>
            <h5 className="mt-0">Summary Order Flight</h5>
          </Divider>
          <CardSummaryOrder props={[...cardSummaryFlightProps]} />

          <Divider orientation="left" orientationMargin={0}>
            <h5 className="mt-0">Summary Order Hotel</h5>
          </Divider>
          <CardSummaryOrder props={[...cardSummaryHotelProps]} />

          <Divider orientation="left" orientationMargin={0}>
            <h5 className="mt-0">Summary Order Tour</h5>
          </Divider>
          <CardSummaryOrder props={[...cardSummaryTourProps]} /> */}

          <Divider orientation="left" orientationMargin={0}>
            <h5 className="mt-0">Summary Customer</h5>
          </Divider>
          <CardSummary props={{ state }} />
        </>
      </MainCard>
    </>
  );
};

export default ScreenPage;