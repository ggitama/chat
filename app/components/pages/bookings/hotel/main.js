import CircularProgress from "@/components/CircularProgress"
import { Tabs } from "antd"
import { itemsTab } from "./scheme"

export const MainLoader = ({
  heightTable
})=>{
  return (
    <>
      <CircularProgress
        className={"gx-w-100"}
        customHeight={heightTable}
        text={"Loading Data"}
      />
    </>
  )
}

export const TabNav = ({props,children})=>{
  const [
    {
      activeTab,
    },
    {setActiveTab},
    {handlerFilterSchema}
  ] = props

  const activeTabValue = activeTab[0]
  const sectionContent = children.filter(row=>row.key==activeTabValue)

  const itemsTabProps = [
    {
      activeTab,
      sectionContent
    },
    {setActiveTab},
    {}
  ]

  return (
    <>
      <Tabs defaultActiveKey={activeTabValue} 
        items={itemsTab({props:[...itemsTabProps]})} 
        onChange={(currentKey)=>{
          setActiveTab([currentKey])
          // handlerFilterSchema(currentKey)
        }}
        />
    </>
  )
}