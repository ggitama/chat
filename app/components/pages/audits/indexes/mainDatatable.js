import IconWithTextCard from "@/components/Metrics/IconWithTextCard"
import CircularProgress from "@/components/CircularProgress"
import DynamicFilter from "@/components/Form/DynamicFilter"
import { FileExcelFilled, FileExcelOutlined, FilterFilled, FilterOutlined } from "@ant-design/icons"
import { Button, Card, Col, Pagination, Row, Table, Tabs } from "antd"
import { itemsTab } from "./table-scheme"

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
      activeTab,isShowFilter,
    },
    {setActiveTab,setIsShowFilter,setIsOnLoading,setListData},
    { 
    }
  ] = props

  return (
    <>
      <Tabs defaultActiveKey={activeTab[0]} 
        items={itemsTab({props:[...props]})} 
        onChange={(currentKey)=>{
          if(setListData) setListData([])
          if(setIsOnLoading) setIsOnLoading(true)
          window.location = `/audits/${currentKey}`
        }}
        />
    </>
  )
}

export const FilterPage = ({props})=>{
  const [
    {
      isShowFilter=false
    },
    {
      setIsShowFilter
    }
  ]  = props

  return (
    <>
      <div className="d-flex w-50">
        <Button
          className={`gx-btn-outline${
            isShowFilter ? "-info" : "-primary"
          }`}
          onClick={() => setIsShowFilter(!isShowFilter)}
        >
          <div className="d-flex align-items-center">
            {isShowFilter ? (
              <FilterFilled className="mr-2 gx-fs-xl" />
            ) : (
              <FilterOutlined className="mr-2 gx-fs-xl" />
            )}
            <span>Filter</span>
          </div>
        </Button>       
      </div>
    </>
  )
}

export const DynamicFilterPage = ({props})=>{
  const [
    {
      filterFormData,
      errorFilterMessage,
    },
    {
      setIsShowFilter
    },
    {
      handlerFilterEvents,
      handlerFilterUpdate,
      handlerFilterSubmit
    }
  ]  = props

  const dataFilter={
    data:filterFormData,
    handle:handlerFilterEvents,
    onChange:handlerFilterUpdate,
    onSubmit:handlerFilterSubmit,
  }
  return (
    <>
      <Card type="inner" className="mt-4 gx-bg-light-grey">
        <DynamicFilter
          data={filterFormData}
          isBreakRow
          className={"mb-8"}
          dataFilter={{...dataFilter}}
          errorMessage={errorFilterMessage}
        />
      </Card>
    </>
  )
}

export const TablePage = ({props})=>{
  const [
    {
      tableConfig,listData,isOnLoading,pageSize,
      currentPage,columnsTable,isModalViewShown
    },
    { setIsModalViewShown },
    {}
  ] = props

  return (
    <>
      <Table
        className="gx-table-responsive gx-fs-xs mt-4"
        {...tableConfig}
        columns={columnsTable({props:[...props]})}
        dataSource={listData}
        loading={isOnLoading}
      />
    </>
  )
}

export const TablePagination = ({props})=>{
  const [
    {
      pageSize,
      currentPage,
      totalData,
      isOnLoading, 
    },
    {},
    {
      handlerPagingChangePageSize,
      handlerPagingChangePage
    }
  ] = props
  return (
    <>
      <div className="gx-w-100 gx-flex-row gx-justify-content-end gx-mt-4">
        <Pagination
          showSizeChanger
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50, 100]}
          current={currentPage}
          total={totalData}
          disabled={isOnLoading}
          onShowSizeChange={(current, size) => {
            handlerPagingChangePageSize(size);
          }}
          onChange={(page) => {
            handlerPagingChangePage(page);
          }}
        />
      </div>
    </>
  )
}