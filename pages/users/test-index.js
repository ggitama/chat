import { useCallback, useEffect, useState } from "react"

import { MainLoader,FilterPage, DynamicFilterPage, TablePage, TablePagination} from "@/components/pages/users/test-indexes/mainDatatable"
import { handlerFilterEvents, handlerFilterValidate, handlerRemapData } from "@/components/pages/users/test-indexes/handlersMainDatatable"
import { CardExtraModalCreate } from "@/components/pages/users/test-indexes/modalCreate"
import { MainCard } from "@/components/pages/users/test-indexes/mainCard"
import { getHeightTable,getTableConfig } from "@/components/pages/page-scheme"
import { columnsTable, schemeFilterTable } from "@/components/pages/users/test-indexes/table-scheme"
import { handleFetchAdminDatatable, handleFetchAdminReset, handleFetchAdminSubmit, handleFetchAdminUpdate } from "app/api/helper"
import { NotificationManager } from "react-notifications"
import { ModalView } from "@/components/pages/users/test-indexes/modalView"
import { ModalEdit } from "@/components/pages/users/test-indexes/modalEdit"
import { ModalCreateNew as ModalCreate } from "@/components/pages/users/test-indexes/modalCreateNew"
import { ModalResetPassword } from "@/components/pages/users/test-indexes/modalResetPassword"

const UserIndexPage = (props)=>{
  const pageTitle = "User Management"
  const heightTable = getHeightTable(props)
  const tableConfig = getTableConfig(heightTable)
  
  const [isModalCreateShown,setIsModalCreateShown] = useState(false)
  const [isModalEditShown,setIsModalEditShown] = useState(false)
  const [isModalViewShown,setIsModalViewShown] = useState(false)
  const [isModalResetPasswordShown,setIsModalResetPasswordShown] = useState(false)
  const [isOnLoading,setIsOnLoading] = useState(true)
  const [listData, setListData] = useState()
  
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
      columns:filterInputDataValue ||  [],
      orders:[],
      pageSize:pageSizeValue,
      pageNumber:currentPageValue
    }

    const {isError,resultData,pagination} = await handleFetchAdminDatatable(payload)
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

  useEffect(() => {
    setIsOnLoading(true)
    handlerGetListData(1,pageSize);
  }, [handlerGetListData]);

  const handlerFetchFilter = useCallback(async(updatedDataFilters)=>{
    setIsOnLoading(true)
    handlerGetListData(1,pageSize,updatedDataFilters)
  },[filterFormData])

  const handlerEditSubmit = async(editFormData)=>{
    const data = isModalEditShown?.data
    setIsModalEditShown({
      isLoadingPromise:true,
      data
    })
    
    const payload = {
      uuid:data?.uuid,
      email:data?.email,
      role:editFormData?.role?.value
    }

    const {isError,resultData,pagination} = await handleFetchAdminUpdate(payload)
    if(isError){
      NotificationManager.error(isError)
      return 
    }

    NotificationManager.success("Admin Updated")
    setIsModalEditShown(false)
    handlerGetListData(1,pageSize)
  }

  const handlerNewSubmit = async(editFormData,handleClearFormData)=>{
    setIsModalCreateShown({
      isLoadingPromise:true,
    })
    
    const payload = {
      email:editFormData?.email?.value,
      role:editFormData?.role?.value,
      password:editFormData?.password?.value,
      confirmPassword:editFormData?.confirmPassword?.value
    }

    const {isError,resultData,pagination} = await handleFetchAdminSubmit(payload)
    if(isError){
      NotificationManager.error(isError)
    }else{
      NotificationManager.success("Admin Created")
    }

    setIsModalCreateShown(false)
    handleClearFormData()
    handlerGetListData(1,pageSize)
  }

  const handlerResetSubmit = async(editFormData,handleClearFormData)=>{
    setIsModalResetPasswordShown({
      isLoadingPromise:true,
    })
    
    const payload = {
      uuid:editFormData?.userRoleId?.value,
      newPassword:editFormData?.newPassword?.value,
    }

    const {isError,resultData,pagination} = await handleFetchAdminReset(payload)
    if(isError){
      NotificationManager.error(isError)
    }else{
      NotificationManager.success("Success Password Reset")
    }

    setIsModalResetPasswordShown(false)
    handleClearFormData()
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
    {tableConfig,listData,isOnLoading,pageSize,currentPage,columnsTable},
    {
      setIsModalViewShown,setIsModalEditShown
    },
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
    {setIsModalEditShown,setIsOnLoading,setIsModalResetPasswordShown},
    {handlerEditSubmit}
  ]

  const modalResetProps = [
    {isModalResetPasswordShown,isOnLoading},
    {setIsModalResetPasswordShown,setIsOnLoading},
    {handlerResetSubmit}
  ]

  const btnCreateProps = [
    {},
    {setIsModalCreateShown},
    {}
  ]

  const modalCreateProps = [
    {isModalCreateShown,isOnLoading},
    {setIsModalCreateShown,setIsOnLoading},
    {handlerNewSubmit}
  ]
  
  const showLoader = isOnLoading && !listData
  const hasDynamicFilter = isShowFilter && filterFormData.length>0
  return (
    <>
      <MainCard 
        title={pageTitle}
        extra={(
          <CardExtraModalCreate props={[...btnCreateProps]}/> 
        )}
      >
      {
        showLoader ? (<MainLoader heightTable={heightTable}/>) :(
          <>
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
      <ModalCreate props={[...modalCreateProps]}/>
      <ModalResetPassword props={[...modalResetProps]}/>
    </>
  )
}

export default UserIndexPage