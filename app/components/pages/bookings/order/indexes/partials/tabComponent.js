import { Tabs } from 'antd';
import { itemsTab } from '../booking-order-index';

const onChange = ({
  activeKey,
  setActiveTab,
}) => {
  setActiveTab(activeKey)
};

const TabComponent = ({
  setIsShowFilter,
  isShowFilter,
  activeTab="flight",
  setActiveTab,
  columnsTable,
  tableConfig,
  formFilter,
  errorFilter,
  eventHandleFilter,
  updateFormFilter,
  handleSubmitFilter,
}) =>{
  return(
    <Tabs defaultActiveKey="flight" 
      items={itemsTab({
        isShowFilter,
        setIsShowFilter,
        activeTab,
        columnsTable:columnsTable[activeTab],
        tableConfig,
        formFilter:formFilter[activeTab] || [],
        errorFilter,
        eventHandleFilter,
        updateFormFilter,
        handleSubmitFilter,
      })} 
      onChange={(key)=>onChange({
        activeKey:key,
        setActiveTab,
      })}
    />
  )
}
export default TabComponent;