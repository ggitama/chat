import CircularProgress from "@/components/CircularProgress"
import DynamicFilter from "@/components/Form/DynamicFilter"
import { FilterFilled, FilterOutlined } from "@ant-design/icons"
import { Button, Card, Pagination, Table } from "antd"

export const Loader = ({
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

export const FilterPage = ({
  isShowFilter=false,
  setIsShowFilter
})=>{
  return (
    <>
      <div className="d-flex w-100">
        <Button
          className={`gx-btn-outline${
            isShowFilter ? "-info" : "-default"
          } gx-px-4`}
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

export const DynamicFilterPage = ({
  formFilter,
  isShowFilter,
  errorFilter,
  eventHandleFilter,
  updateFormFilter,
  handleSubmitFilter
})=>{
  const showFilter = formFilter.length>0 && isShowFilter
  return (
    <>
      {
        showFilter && (
          <Card type="inner" className="mt-4 gx-bg-light-grey">
            <DynamicFilter
              data={formFilter}
              isBreakRow={true}
              className={"mb-8"}
              errorMessage={errorFilter}
              dataFilter={{
                handle:eventHandleFilter,
                data:formFilter,
                onChange:updateFormFilter,
                onSubmit:handleSubmitFilter
              }}
            />
          </Card>
      )
      }
    </>
  )
}

export const TablePage = ({
  tableConfig,
  setIsModalUpdateStatusShow,
  setIsModalEditFormShow,
  columnsTable,
  listData,
  isLoading,
  pageSize,
  currentPage:pageCurrentPage
})=>{
  return (
    <>
      <Table
        className="gx-table-responsive gx-fs-xs mt-4"
        {...tableConfig}
        columns={columnsTable({
          setIsModalUpdateStatusShow,
          setIsModalEditFormShow,
          pageSize,
          pageCurrentPage
        })}
        dataSource={listData}
        loading={isLoading}
      />
    </>
  )
}

export const TablePagination = ({
  pageSize=10,
  currentPage=1,
  totalData=0,
  isLoading,
  handleChangePageSize,
  handleChangePage
})=>{
  return (
    <>
      <div className="gx-w-100 gx-flex-row gx-justify-content-end gx-mt-4">
        <Pagination
          showSizeChanger
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50, 100]}
          current={currentPage}
          total={totalData}
          disabled={isLoading}
          onShowSizeChange={(current, size) => {
            handleChangePageSize(size);
          }}
          onChange={(page) => {
            handleChangePage(page);
          }}
        />
      </div>
    </>
  )
}

