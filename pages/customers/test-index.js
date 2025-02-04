import { useCallback, useEffect, useState } from "react"

import { MainLoader,FilterPage, DynamicFilterPage, TablePage, TablePagination, CardSummary} from "@/components/pages/customers/test-indexes/mainDatatable"
import { handlerFilterEvents, handlerFilterValidate, handlerRemapData } from "@/components/pages/users/test-indexes/handlersMainDatatable"
import { MainCard } from "@/components/pages/users/test-indexes/mainCard"
import { getHeightTable,getTableConfig } from "@/components/pages/page-scheme"
import { columnsTable, schemeFilterTable } from "@/components/pages/customers/test-indexes/table-scheme"
import { handleFetchCustomerDatatable, handlerFetchCustomerManagementSummary, handlerFetchCustomerSubmitEdit } from "app/api/helper"
import { NotificationManager } from "react-notifications"
import { Divider } from "antd"
import { ModalView } from "@/components/pages/customers/test-indexes/modalView"
import { ModalEdit } from "@/components/pages/customers/test-indexes/modalEdit"

const ScreenPage = (props)=>{
  const pageTitle = "Customer Management"
  const heightTable = getHeightTable(props)
  const tableConfig = getTableConfig(heightTable)
  
  const [isModalEditShown, setIsModalEditShown] = useState()
  const [isModalViewShown, setIsModalViewShown] = useState()
  const [isOnLoading,setIsOnLoading] = useState(true)
  const [listData, setListData] = useState()
  const [summariesData,setSummariesData] = useState()
  
  const [isShowFilter,setIsShowFilter] = useState(false)
  const [filterFormInput,setFilterFormInput] = useState(false)
  const [filterFormData,setFilterFormData] = useState([])
  const [errorFilterMessage,setErrorFilterMessage] = useState("")

  const [pageSize,setPageSize] = useState(10)
  const [currentPage,setCurrentPage] = useState(1)
  const [totalData,setTotalData] = useState(500)
  
  useEffect(()=>{
    setFilterFormData([...schemeFilterTable()])
  },[])

  const handlerGetListData = useCallback(
    async(updatedCurrentPage,updatedPageSize,updatedDataFilters)=>{
    const currentPageValue = updatedCurrentPage || currentPage
    const pageSizeValue =  updatedPageSize || pageSize
    const filterInputDataValue = updatedDataFilters || filterFormInput

    const payload = {
      columns:filterInputDataValue || [],
      orders:[],
      pageSize:pageSizeValue,
      pageNumber:currentPageValue
    }

    const {isError,resultData,pagination} = await handleFetchCustomerDatatable(payload)
    if(isError){
      NotificationManager.error(isError)
    }
    const tempData = handlerRemapData(resultData,isError)

    if(updatedCurrentPage) setCurrentPage(updatedCurrentPage)
    if(updatedPageSize) setPageSize(updatedPageSize)

    setTotalData(pagination?.totalData)
    setListData([...tempData])
    setIsOnLoading(false)
  },[])

  const handlerSummariesData = useCallback(
    async()=>{

    const payload = {
      type:"customer",
      columns:filterFormInput || [],
      orders:[],
      pageSize:pageSize,
      pageNumber:currentPage
    }

    const {isError,resultData} = await handlerFetchCustomerManagementSummary(payload)
    if(isError){
      NotificationManager.error(isError)
      return
    }
    setSummariesData({...resultData})
    setIsOnLoading(false)
  },[])

  useEffect(() => {
    setIsOnLoading(true)
    handlerGetListData(1,pageSize);
    handlerSummariesData()
  }, [handlerGetListData,handlerSummariesData]);

  const handlerFetchFilter = useCallback(async(updatedDataFilters)=>{
    setIsOnLoading(true)
    handlerGetListData(1,pageSize,updatedDataFilters)
  },[filterFormData])

  const handlerEditSubmit = async(editFormData)=>{
      setIsModalEditShown({
        isLoadingPromise:true,
        data:isModalEditShown?.data
      })
      
      const payload = {
        uuid:isModalEditShown?.data.uuid,
        title:editFormData?.title?.value
      }

      const {isError,resultData,pagination} = await handlerFetchCustomerSubmitEdit(payload)
      if(isError){
        NotificationManager.error(isError)
        return 
      }

      NotificationManager.success("Customer Updated")
      setIsModalEditShown(false)
      handlerGetListData(1,pageSize)
  }

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
    {isShowFilter},
    {setIsShowFilter}
  ]

  const dynamicFilterProps = [
    {filterFormData,errorFilterMessage},
    {setIsShowFilter},
    {handlerFilterEvents,handlerFilterUpdate,handlerFilterSubmit}
  ]

  const tableProps =[
    {
      tableConfig,listData,isOnLoading,
      pageSize,currentPage,columnsTable,
      isModalEditShown,isModalViewShown
    },
    { setIsModalEditShown,setIsModalViewShown },
    {}
  ]

  const tablePaginationProps =[
    {pageSize,currentPage,totalData,isOnLoading},
    {},
    {handlerPagingChangePageSize,handlerPagingChangePage}
  ]
  
  const modalViewProps = [
    {isModalViewShown,isOnLoading},
    {setIsModalViewShown}
  ]

  const modalEditProps = [
    {isModalEditShown,isOnLoading},
    {setIsModalEditShown,setIsOnLoading},
    {handlerEditSubmit}
  ]

  const showLoader = isOnLoading && !listData
  const hasDynamicFilter = isShowFilter && filterFormData.length>0

  const tabSummariesData = [
    {summariesData}
  ]
  return (
    <>
      <MainCard 
        title={pageTitle}
      >
      {
        showLoader ? (<MainLoader heightTable={heightTable}/>) :(
          <>
            <Divider orientation="left" orientationMargin={0}>
              <h5 className="mt-0">Summary</h5>
            </Divider>
            <CardSummary props={[...tabSummariesData]}></CardSummary>

            <Divider orientation="left" orientationMargin={0}>
              <h5 className="mt-0">Customer</h5>
            </Divider>
            <FilterPage props={[...filterPageProps]}/>
            {hasDynamicFilter && (<DynamicFilterPage props={[...dynamicFilterProps]}/>)}
            <TablePage props={[...tableProps]}/>
            <TablePagination props={[...tablePaginationProps]}/>
          </>
        )
      }
      </MainCard>

      <ModalView props={[...modalViewProps]}/>
      <ModalEdit props={[...modalEditProps]}/>
    </>
  )
}

export default ScreenPage