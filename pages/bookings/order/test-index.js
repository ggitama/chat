import { useCallback, useEffect, useState } from "react"

import { MainLoader,FilterPage, DynamicFilterPage, TablePage, TablePagination, TabNav, CardSummary} from "@/components/pages/bookings/order/test-indexes/mainDatatable"
import { handlerFilterEvents, handlerFilterValidate, handlerRemapData } from "@/components/pages/bookings/order/test-indexes/handlersMainDatatable"
import { MainCard } from "@/components/pages/users/test-indexes/mainCard"
import { getHeightTable,getTableConfig } from "@/components/pages/page-scheme"
import { 
  columnsTable as columnsFlightTable, 
  schemeFilterTable as schemeFilterTableFlight 
} from "@/components/pages/bookings/order/test-indexes/schemas/flight-scheme"
import { 
  columnsTable as columnsTableHotel, 
  schemeFilterTable as schemeFilterTableHotel 
} from "@/components/pages/bookings/order/test-indexes/schemas/hotel-scheme"
import { 
  columnsTable as columnsTableTour, 
  schemeFilterTable as schemeFilterTableTour 
} from "@/components/pages/bookings/order/test-indexes/schemas/tour-scheme"
import { handleFetchBookingManagementDatatable, handleFetchBookingManagementExport, handleFetchBookingManagementSummary } from "app/api/helper"
import { NotificationManager } from "react-notifications"
import { Divider } from "antd"

const UserIndexPage = (props)=>{
  const pageTitle = "Booking Management"
  const heightTable = getHeightTable(props)
  const tableConfig = getTableConfig(heightTable)
  
  const [isOnLoading,setIsOnLoading] = useState(true)
  const [listData, setListData] = useState()
  const [summariesData, setSummariesData] = useState()
  
  const [isShowFilter,setIsShowFilter] = useState(false)
  const [filterFormInput,setFilterFormInput] = useState(false)
  const [filterFormData,setFilterFormData] = useState([])
  const [errorFilterMessage,setErrorFilterMessage] = useState("")

  const [pageSize,setPageSize] = useState(10)
  const [currentPage,setCurrentPage] = useState(1)
  const [totalData,setTotalData] = useState(500)

  const [activeTab,setActiveTab] = useState(["flight"])
  const columnsTable = columnsFlightTable

  const handlerFilterSchema = (activeTab)=>{
    let schema = schemeFilterTableFlight
    switch (activeTab) {
      case "hotel": schema = schemeFilterTableHotel; break;
      case "tour": schema = schemeFilterTableTour; break
    }
    setIsOnLoading(true)
    setListData(...[])
    setIsShowFilter(false)
    setFilterFormData([...schema()])
    handlerGetListData(1,pageSize,null,activeTab)
  }

  useEffect(()=>{
    setFilterFormData([...schemeFilterTableFlight()])
  },[])


  const handlerGetListData = useCallback(
    async(updatedCurrentPage,updatedPageSize,updatedDataFilters,newActiveTab)=>{
    const currentPageValue = updatedCurrentPage || currentPage
    const pageSizeValue =  updatedPageSize || pageSize
    const filterInputDataValue = updatedDataFilters || filterFormInput
    const currentActiveTab = newActiveTab || activeTab[0]

    const payload = {
      columns:filterInputDataValue || [],
      orders:[],
      pageSize:pageSizeValue,
      pageNumber:currentPageValue
    }

    const respDatatable = await handleFetchBookingManagementDatatable(currentActiveTab,payload)

    const {isError,resultData,pagination} = respDatatable 
    if(isError){
      NotificationManager.error(isError)
    }
    const tempData = handlerRemapData(resultData,isError)

    if(updatedCurrentPage) setCurrentPage(updatedCurrentPage)
    if(updatedPageSize) setPageSize(updatedPageSize)
    if(newActiveTab) setActiveTab([newActiveTab])

    setTotalData(pagination?.totalData)
    setListData([...tempData])
    setFilterFormInput([])
    setIsOnLoading(false)
  },[])

  const handlerSummariesData = useCallback(
    async(newActiveTab)=>{
    const currentActiveTab = newActiveTab || activeTab[0]

    const respSummary = await handleFetchBookingManagementSummary({
      type:currentActiveTab
    })

    if(respSummary.isError){
      NotificationManager.error(respSummary.isError)
      return
    }
    const {resultData:resultSummary} = respSummary
    setSummariesData({...resultSummary})
  },[])

  const handlerDownloadOnClick = useCallback(
    async(newActiveTab)=>{
    const currentActiveTab = newActiveTab || activeTab[0]

    const payload = {
      columns:filterFormInput || [],
      orders:[],
      pageSize:100,
      pageNumber:1
    }

    const {isError,resultData} = await handleFetchBookingManagementExport(currentActiveTab,{
      type:currentActiveTab,
      ...payload
    })
    
    setIsOnLoading(false)
    if(isError){
      NotificationManager.error(isError)
      return
    }
    
    const downloadPath = resultData.path || ""
    if(!downloadPath){
      NotificationManager.error("Invalid download path")
      return
    }

    window.open(resultData.path)
  },[])

  useEffect(() => {
    setIsOnLoading(true)
    handlerGetListData(1,pageSize);
    handlerSummariesData(activeTab)
  },[handlerGetListData,handlerSummariesData]);

  const handlerFetchFilter = useCallback(async(updatedDataFilters)=>{
    setIsOnLoading(true)
    handlerGetListData(1,pageSize,updatedDataFilters,activeTab)
  },[filterFormData])


  const handlerPagingChangePage = async (page)=>{
    if (page !== currentPage) {
      setIsOnLoading(true)
      handlerGetListData(page, pageSize);
    }
  }

  const handlerPagingChangePageSize = async (size) => {
    if (size !== pageSize) {
      setIsOnLoading(true)
      handlerGetListData(1, size);
    }
  };

  const handlerFilterUpdate = (data) => {
    setFilterFormData([...data]);
  };

  const handlerFilterSubmit = ()=>{
    const {updatedDataFilters,isError} = handlerFilterValidate(filterFormData)
    if(isError.length>0){
      const errorMessage = `${isError.join(",")} can't be empty`
      setErrorFilterMessage(errorMessage)
      return 
    }

    setErrorFilterMessage("")
    setFilterFormInput([...updatedDataFilters])
    handlerFetchFilter(updatedDataFilters)
  }

  const filterPageProps = [
    {isShowFilter,activeTab},
    {setIsShowFilter,setIsOnLoading},
    {handlerDownloadOnClick}
  ]

  const dynamicFilterProps = [
    {
      filterFormData,errorFilterMessage
    },
    {setIsShowFilter,setFilterFormData},
    {handlerFilterEvents,handlerFilterUpdate,handlerFilterSubmit}
  ]

  const tableProps =[
    {tableConfig,listData,isOnLoading,pageSize,currentPage,columnsTable},
    {},
    {}
  ]

  const tablePaginationProps =[
    {pageSize,currentPage,totalData,isOnLoading},
    {},
    {handlerPagingChangePageSize,handlerPagingChangePage}
  ]
  
  const showLoader = isOnLoading && !listData
  const hasDynamicFilter = isShowFilter && filterFormData.length>0

  const tabNavProps = [
    { 
      activeTab, isShowFilter,
    },
    { setActiveTab, setFilterFormData},
    { handlerFilterSchema, handlerPagingChangePage,handlerSummariesData}
  ]

  const cardSummaryProps = [
    {
      summariesData
    }
  ]

  const childProps = {
    hasDynamicFilter,
    filterPageProps,
    dynamicFilterProps,
    tableProps,
    tablePaginationProps,
    cardSummaryProps
  }
  return (
    <>
      <MainCard 
        title={pageTitle}
      >
      {
        showLoader ? (<MainLoader heightTable={heightTable}/>) :(
          <>
            <TabNav props={[...tabNavProps]}>
              <TabChild {...childProps} activeTab={activeTab}/>
            </TabNav>
          </>
        )
      }
      </MainCard>
    </>
  )
}

const TabChild = (props)=>{
  const {
    hasDynamicFilter,
    filterPageProps,
    dynamicFilterProps,
    tableProps,
    tablePaginationProps,
    activeTab,
    cardSummaryProps
  } = props
  
  const columnsTables = {
    flight:columnsFlightTable,
    hotel:columnsTableHotel,
    tour:columnsTableTour
  }
  tableProps[0].columnsTable = columnsTables[activeTab]

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <h5>Summary</h5>
      </Divider>
      <CardSummary props={[...cardSummaryProps]}/>

      <Divider orientation="left" orientationMargin="0">
        <h5>Order</h5>
      </Divider>
      <FilterPage props={[...filterPageProps]}/>
      {hasDynamicFilter && (<DynamicFilterPage props={[...dynamicFilterProps]}/>)}
      <TablePage props={[...tableProps]}/>
      <TablePagination props={[...tablePaginationProps]}/>
    </>
  )
}

export default UserIndexPage