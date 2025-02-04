import { useCallback, useEffect, useState} from "react"

import { MainLoader, TabNav} from "@/components/pages/bookings/flight/main"
import { MainCard } from "@/components/pages/users/test-indexes/mainCard"
import { getHeightTable,getTableConfig } from "@/components/pages/page-scheme"
import { handleFetchFlightDetail } from "app/api/helper"
import { NotificationManager } from "react-notifications"
import { SectionDetail } from "@/components/pages/bookings/flight/sectionDetail"
import { SectionPassenger } from "@/components/pages/bookings/flight/sectionPassenger"
import { SectionPayment } from "@/components/pages/bookings/partials/sectionPayment"
import { useRouter } from "next/router"

const ScreenPage = (props)=>{
  const { 
    query:{
      transactionId
    } 
  } = useRouter()
  const pageTitle = "Flight Transaction Detail"
  const heightTable = getHeightTable(props)
  
  const [isOnLoading,setIsOnLoading] = useState(true)

  const [activeTab,setActiveTab] = useState([])
  const [contentData,setContentData] = useState()

  const handlerFilterSchema = (activeTab)=>{
    // setIsOnLoading(true)
    // setIsShowFilter(false)
    // handlerGetListData(activeTab)
  }


  const handlerGetListData = useCallback(
    async(newActiveTab)=>{
    const currentActiveTab = newActiveTab || activeTab[0]

    const payload = {
      transactionId
    }

    const {isError,resultData,pagination} = await handleFetchFlightDetail(payload)
    if(isError){
      NotificationManager.error(isError)
    }
    // const tempData = handlerRemapData(resultData,isError)

    // setTimeout(()=>{
      resultData.transactionId = transactionId;
      resultData.type = 'received-flight-issued';
      setIsOnLoading(false)
      setContentData({...resultData})
      // setActiveTab([currentActiveTab])
    // },1000)
  },[])

  useEffect(() => {
    // setIsOnLoading(true)
    setActiveTab(["detail"])
    handlerGetListData();
  }, []);
  
  const showLoader = isOnLoading && !contentData

  const tabNavProps = [
    { 
      activeTab,contentData
    },
    { setActiveTab},
    { handlerFilterSchema}
  ]

  return (
    <>
      <MainCard 
        title={pageTitle}
      >
      {
        showLoader ? (<MainLoader heightTable={heightTable}/>) :(
          <>
            <TabNav props={[...tabNavProps]}>
              <SectionDetail key="detail" dataSource={contentData}/>
              <SectionPayment key="payment" dataSource={contentData}/>
              <SectionPassenger key="passanger" dataSource={contentData}/>
            </TabNav>
            {console.log(contentData)}
          </> 
        )
      }
      </MainCard>
    </>
  )
}

export default ScreenPage