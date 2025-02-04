import CircularProgress from "@/components/CircularProgress"
import DynamicFilter from "@/components/Form/DynamicFilter"
import IconWithTextCard from "@/components/Metrics/IconWithTextCard"
import { FilterFilled, FilterOutlined } from "@ant-design/icons"
import { Button, Card, Col, Pagination, Row, Table } from "antd"

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

export const CardSummary = ({props})=>{
  const [
    { summariesData }
  ] = props

  const icons = [
    {
      icon:"auth-screen",
      title:summariesData?.customerCount || "n/a",
      subTitle:"Total Customer"},
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
      errorFilterMessage
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
      tableConfig,listData,isOnLoading,
      pageSize,currentPage,
      columnsTable,
      isModalEditShown,isModalViewShown
    },
    {
      setIsModalEditShown,
      setIsModalViewShown
    },
    {}
  ] = props

  const columnsTableProps = [
    {
      pageSize,currentPage,
      isModalEditShown,isModalViewShown
    },
    {
      setIsModalEditShown,setIsModalViewShown
    }
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