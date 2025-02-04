import { Card, Pagination, Table } from "antd"

const CmsTableTitle = ({title})=>{
  return (
    <>
      <h5 style={{color:"white",fontWeight:"500"}}>
        {title}
      </h5>
    </>
  )
}

export const CmsTable = ({
  title,
  columnsTable,
  tableConfig,
  listData,
  props,
  pageSizeOptions,
  btnActions,
  children
})=>{
  let cardTitle = title && (<CmsTableTitle title={title}/>)

  let prependChildren = (children && children.length) ? children.filter(row=>row.key=="prepend") : (children && children.key=="prepend") ? children : null
  let appendChildren = (children && children.length) ? children.filter(row=>row.key=="append") : (children && children.key=="append") ? children : null
  return (
    <>
      <Card
        headStyle={{
          paddingTop:"8px 0px",
          color:"white",
          background:"linear-gradient(to right, #bc2330 0%, #d84700 100%)"
        }}
        title={cardTitle}
      >
        {btnActions}
        {prependChildren}
        
        <TablePage 
          columnsTable={columnsTable}
          tableConfig={tableConfig}
          listData={listData}
          props={props}
        />
        {appendChildren}

        <TablePagination
          pageSizeOptions={pageSizeOptions}
          props={props}
        />
      </Card>
    </>
  )
}

const TablePage = ({
  columnsTable,
  tableConfig,
  listData,
  props
})=>{

  return (
    <>
      <Table
        className="gx-table-responsive gx-fs-xs"
        {...tableConfig}
        columns={columnsTable ? columnsTable(props) : [{title:"#"},{title:"Description"},{title:"Action"}]}
        dataSource={listData}
        loading={props?.state?.IS_ON_LOADING_TABLE}
      />
    </>
  )
}

const TablePagination = ({
  pageSizeOptions,
  props
})=>{
  const {
    state,
    handler
  } = props
  
  if(!pageSizeOptions) return null
  
  return (
    <>
      <div className="gx-w-100 gx-flex-row gx-justify-content-end gx-mt-4">
        <Pagination
          showSizeChanger
          pageSize={state?.pagination?.pageSize}
          pageSizeOptions={pageSizeOptions}
          current={state?.pagination?.currentPage}
          total={state?.TOTAL_DATA}
          disabled={state?.IS_ON_LOADING_TABLE}
          onShowSizeChange={(current, size) => {
            handler.handleChangePagination({
              type:"pageSize",pageSize:size,
              state
            })
          }}
          onChange={(page) => {
            handler.handleChangePagination({
              type:"currentPage",currentPage:page,
              state
            })
          }}
        />
      </div>
    </>
  )
}