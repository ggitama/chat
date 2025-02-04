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
    {setActiveTab,setIsShowFilter},
    {handlerFilterSchema,handlerPagingChangePage,handlerSummariesData}
  ] = props


  const itemsTabProps = [
    {
      activeTab,
      sectionContent:children
    },
    {setActiveTab},
    {}
  ]

  return (
    <>
      <Tabs defaultActiveKey={activeTab[0]} 
        items={itemsTab({props:[...itemsTabProps]})} 
        onChange={(currentKey)=>{
          setActiveTab([currentKey])
          handlerFilterSchema(currentKey)
          handlerSummariesData(currentKey)
        }}
        />
    </>
  )
}

export const CardSummary = ({props})=>{
  const [
    { summariesData}
  ] = props

  const icons = [
    {icon:"orders",title:summariesData.finalPriceSum,subTitle:"Total Final Price"},
    {icon:"pricing-table",title:summariesData.totalDiscount,subTitle:"Total Discount"},
    {icon:"tasks",title:summariesData.countTransaction,subTitle:"Total Transaction"},
    {icon:"tickets",title:summariesData.countCoupon,subTitle:"Total Coupon"},
  ]

  return (
    <>
      <Row>
        {icons.map((iconRow,index)=>{
          return (
            <Col xs={6}>
              <IconWithTextCard 
                icon={iconRow.icon} 
                title={iconRow.title} 
                subTitle={iconRow.subTitle}
                />
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export const FilterPage = ({props})=>{
  const [
    {
      isShowFilter,
      activeTab
    },
    {
      setIsShowFilter,
      setIsOnLoading
    },
    {
      handlerDownloadOnClick
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
        
        <Button
          className={`gx-btn-outline-primary`}
          onClick={() =>{
            setIsOnLoading(true)
            handlerDownloadOnClick(activeTab[0])
            // window.open("https://dev.antavaya.com/")
          }}
        >
          <div className="d-flex align-items-center">
            <FileExcelOutlined className="mr-2 gx-fs-xl" />
            <span>Download</span>
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
    {tableConfig,listData,isOnLoading,pageSize,currentPage,columnsTable},
    {setIsModalCreateShown,setIsModalEditShown,setIsModalUpdateShown},
    {}
  ] = props

  const columnsTableProps = [
    {pageSize,currentPage},
    {setIsModalCreateShown,setIsModalEditShown,setIsModalUpdateShown}
  ]
  return (
    <>
      <Table
        className="gx-table-responsive gx-fs-xs mt-4"
        {...tableConfig}
        columns={columnsTable({props:[...columnsTableProps]})}
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