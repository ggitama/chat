import { CmsDate } from "@/components/Cms/Form/Date";
import { CmsSwitch } from "@/components/Cms/Form/Switch";
import { CmsTextArea } from "@/components/Cms/Form/Textarea";
import { CmsUpload } from "@/components/Cms/Form/Upload";
import { CmsSelectMultiple } from "@/components/Cms/Form/SelectMultiple";
import { CmsSelectSearch } from "@/components/Cms/Form/SelectSearch";
import { DebounceSelect } from "@/components/Cms/Form/DebounceSelect";

import { useState, useEffect } from "react";
import { handleSearchTour,
  handleSearchRegion,
  handleSearchAirline,
  handleSearchAirport,
  handleSearchHotel, 
} from "app/api/helper";

const { CmsLoader } = require("@/components/Cms");
const { CmsDivRow, CmsInput, CmsSelect } = require("@/components/Cms/Form");

export const ModalEditContent = ({ formData, props, stateKey }) => {
  const { state, dispatch, handler } = props;

  if (!state[stateKey]) return null;
  if (state.IS_ON_LOADING) {
    return <CmsLoader title="Loading" customHeight={"300px"} />;
  }

  let {
    productType: inputProductType,
    type: inputType,
    platform: inputPlatform,
    promoCode: inputPromoCode,
    promoName: inputPromoName,
    promoDescription: inputPromoDescription,
    tnc: inputTnc,
    desktopImageUrl: inputDesktopImageUrl,
    mobileImageUrl: inputMobileImageUrl,
    startDate: inputStartDate,
    endDate: inputEndDate,
    quota: inputQuota,
    minimumTransaction: inputMinimumTransaction,
    percentageDiscount: inputPercentageDiscount,
    maximumDiscount: inputMaximumDiscount,
    amount: inputAmount,
    isOncePerUser: inputIsOncePerUser,
    isForEmployee: inputIsForEmployee,
    isHidden:inputIsHidden,
    tourCode: inputTourCode,
    regionName: inputRegionName,
    originCode: inputOriginCode,
    destinationCode: inputDestinationCode,
    airlineCode: inputAirlineCode,
    hotelCode: inputHotelCode,
  } = formData;

  // get tour, flight and hotel data
  let [airlineData, setAirlineData] = useState(null);
  let [originData, setOriginData] = useState(null);
  let [destinationData, setDestinationData] = useState(null);
  let [tourData, setTourData] = useState(null);
  let [regionData, setRegionData] = useState(null);
  let [filteredOriginData, setFilteredOriginData] = useState([]);
  let [filteredDestinationData, setFilteredDestinationData] = useState([]);

  // Mendeklarasikan fetchData di luar useEffect
  const fetchOriginAndDestinationData = async () => {
    try {
      const originAndDestinationResult = await handleSearchAirport({
        pageNumber: 0,
        pageSize: 1000,
        isPopularAirport: true,
        isCms: true,
      });

      if (
        originAndDestinationResult &&
        originAndDestinationResult.result &&
        originAndDestinationResult.result.responseData
      ) {
        const responseData = originAndDestinationResult.result.responseData;
        // Mengubah format data ke [{label: '', value: ''}]
        const formattedData = responseData.map((item) => ({
          label: `${item.cityName} - ${item.airportCode}`,
          value: item.airportCode,
        }));

        setOriginData(formattedData);
        setFilteredOriginData(formattedData); // <-- Simpan data ke filteredOriginData
        setDestinationData(formattedData);
        setFilteredDestinationData(formattedData); // <-- Simpan data ke filteredDestinationData
      } else {
        console.log("something error when fetching data origin and airline");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk pencarian umum (digunakan di handleSearchChange)
  const handleSearchChange = (searchText, isOrigin) => {
    let filteredData = [];
    if (isOrigin) {
      filteredData = originData.filter(
        (item) =>
          item.label.toLowerCase().includes(searchText.toLowerCase()) ||
          item.value.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOriginData(filteredData);
    } else {
      filteredData = destinationData.filter(
        (item) =>
          item.label.toLowerCase().includes(searchText.toLowerCase()) ||
          item.value.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredDestinationData(filteredData);
    }
  };

  const fetchDataTour = async () => {
    try {
      const tourResult = await handleSearchTour({
        categories: [],
        destination: "",
        priceRange: {},
        duration: {},
        orders: [],
        paging: {
          number: 1,
          size: 500,
        },
      });

      if (tourResult && tourResult.result && tourResult.result.responseData) {
        setTourData(tourResult.result.responseData);
      } else {
        console.error("Invalid tour data format:", tourResult);
      }

      const regionResult = await handleSearchRegion({
        pageNumber: 1,
        pageSize: 100,
        search: "",
        isMain: true,
      });
      console.log("Region data:", regionResult);

      if (
        regionResult &&
        regionResult.result &&
        regionResult.result.responseData
      ) {
        setRegionData(regionResult.result.responseData);
      } else {
        console.error("Invalid region data format:", regionResult);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataAirline = async () => {
    const airlineResult = await handleSearchAirline({});
    console.log("Airline data : ", airlineResult);
    try {
      if (
        airlineResult &&
        airlineResult.result &&
        airlineResult.result.responseData
      ) {
        setAirlineData(airlineResult.result.responseData);
      }else {
        console.log("something error when fetching data airline");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Memanggil fetchDataTour hanya jika productType berubah
    fetchDataTour();
    fetchDataAirline();
    fetchOriginAndDestinationData();
  }, []);

  if(regionData != null){
    regionData = regionData.filter(item => item.name != "All Regions");
  }

  const handleTourCodeChange = (selectedValues) => {
    handler.handleFormUpdate("tourCode", selectedValues);
  };

  const handleAirlineCodeChange = (selectedValues) => {
    handler.handleFormUpdate("airlineCode", selectedValues);
  };

  return (
    <>
      <CmsDivRow>
        <CmsSelect
          {...inputProductType}
          onChange={(e) => {
            handler.handleFormUpdate("productType", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputType}
          onChange={(e) => {
            handler.handleFormUpdate("type", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputPlatform}
          onChange={(e) => {
            handler.handleFormUpdate("platform", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputPromoCode}
          disabled={true}
          onChange={(e) => {
            handler.handleFormUpdate("promoCode", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputPromoName}
          onChange={(e) => {
            handler.handleFormUpdate("promoName", e.target.value);
          }}
        />
      </CmsDivRow>
      {tourData && (
        <CmsDivRow>
          <CmsSelectMultiple
            className={"gx-w-100"}
            {...inputTourCode}
            onChange={handleTourCodeChange}
            listData={tourData}
            type={"tour"}
          />
        </CmsDivRow>
      )}
      {regionData && (
        <CmsDivRow>
          <CmsSelectMultiple
            className={"gx-w-100"}
            {...inputRegionName}
            onChange={(selectedValues) =>
              handler.handleFormUpdate("regionName", selectedValues)
            }
            listData={regionData}
            type={"region"}
          />
        </CmsDivRow>
      )}
      {airlineData && (
        <CmsDivRow>
          <CmsSelectMultiple
            {...inputAirlineCode}
            onChange={handleAirlineCodeChange}
            listData={airlineData}
            type={"flight"}
          />
        </CmsDivRow>
      )}
      <CmsDivRow>
        <DebounceSelect
          {...inputHotelCode}
          mode="multiple"
          fetchOptions={(searchText) => fetchHotelList(searchText)}
          onChange={(e) => {
            handler.handleFormUpdate("hotelCode", e);
          }}
          style={{
            width: "100%",
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        {originData && (
          <CmsSelectSearch
            {...inputOriginCode}
            onChange={(e) => {
              console.log({e})
              handler.handleFormUpdate("originCode", e);
            }}
            options={filteredOriginData}
            onSearch={(searchText) => handleSearchChange(searchText, true)}
          />
        )}
      </CmsDivRow>
      <CmsDivRow>
        {destinationData && (
          <CmsSelectSearch
            {...inputDestinationCode}
            onChange={(e) => {
              handler.handleFormUpdate("destinationCode", e);
            }}
            options={filteredDestinationData}
            onSearch={(searchText) => handleSearchChange(searchText, false)}
          />
        )}
      </CmsDivRow>
      <CmsDivRow>
        <CmsTextArea
          className={"gx-w-100"}
          resizeable={false}
          {...inputPromoDescription}
          onChange={(e) => {
            handler.handleFormUpdate("promoDescription", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsTextArea
          className={"gx-w-100"}
          resizeable={false}
          {...inputTnc}
          onChange={(e) => {
            handler.handleFormUpdate("tnc", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsUpload
          className={"gx-w-100"}
          {...inputDesktopImageUrl}
          name={"desktopImageUrl"}
          formUpdate={handler}
          action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsUpload
          className={"gx-w-100"}
          {...inputMobileImageUrl}
          name={"mobileImageUrl"}
          formUpdate={handler}
          action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsDate
          className={"gx-w-100"}
          {...inputStartDate}
          onChange={(date, dateString) => {
            handler.handleFormUpdate("startDate", dateString);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsDate
          className={"gx-w-100"}
          {...inputEndDate}
          onChange={(date, dateString) => {
            handler.handleFormUpdate("endDate", dateString);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputAmount}
          onChange={(e) => {
            handler.handleFormUpdate("amount", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputQuota}
          onChange={(e) => {
            handler.handleFormUpdate("quota", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputMinimumTransaction}
          onChange={(e) => {
            handler.handleFormUpdate("minimumTransaction", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputPercentageDiscount}
          onChange={(e) => {
            handler.handleFormUpdate("percentageDiscount", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputMaximumDiscount}
          onChange={(e) => {
            handler.handleFormUpdate("maximumDiscount", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSwitch
          className={"gx-w-100"}
          {...inputIsOncePerUser}
          style={{ width: "16px" }}
          onChange={(e) => {
            handler.handleFormUpdate("isOncePerUser", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSwitch
          className={"gx-w-100"}
          {...inputIsForEmployee}
          style={{ width: "16px" }}
          onChange={(e) => {
            handler.handleFormUpdate("isForEmployee", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSwitch className={"gx-w-100"}
          {...inputIsHidden}
          style={{width: "16px"}}
          onChange={(e)=>{
            handler.handleFormUpdate("isHidden",e)
          }}
        />
      </CmsDivRow>
    </>
  );
};

async function fetchHotelList(hotelName) {
  let url = process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING;

  return fetch(url+'/v2/hotels/search?param='+hotelName)
    .then((response) => response.json())
    .then((body) =>
      body.responseData.map((hotel) => ({
        label: hotel.name,
        value: hotel.code,
      })),
    );
}