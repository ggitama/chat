import { Divider, Table, Tabs } from "antd"

export const SectionPayment = ()=>{
  const columnsPaymentConfirmations = [
    {key:"paymentType",label:"Payment Type"},
    {key:"paymentMethod",label:"Payment Method"},
    {key:"paymentStatus",label:"Payment Status"},
    {key:"paymentDate",label:"Payment Date"},
    {key:"amount",label:"Amount"},
  ]

  const dataSourcePayments = [
    {
      paymentType:"n/a",
      paymentMethod:"n/a",
      paymentStatus:"n/a",
      paymentDate:"n/a",
      amount:"n/a"
    }
  ]

  const columnsBilling = [
    {key:"orderItem",label:"Order Item"},
    {key:"description",label:"Description"},
    {key:"qty",label:"Qty"},
    {key:"total",label:"Total"},
  ]

  const dataBillings = [
    {
      orderItem:"n/a",
      description:"n/a",
      qty:"n/a",
      total:"n/a",
    }
  ]

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <h5>Billing</h5>
      </Divider>
      <TableShowWrapper>
        <tbody className="ant-table-tbody">
          <tr>
            <td style={{width:"20%"}}>Due Date</td>
            <td>n/a</td>
          </tr>
        </tbody>
      </TableShowWrapper>
    
      <TableShowData dataKey="billings" columns={columnsBilling} dataSource={dataBillings}>
        <tfoot className="ant-table-tbody">
          <tr>
            <td colSpan={3} style={{textAlign:"right"}}>Total</td>
            <td>n/a</td>
          </tr>
        </tfoot>
      </TableShowData>

      <Divider orientation="left" orientationMargin="0">
        <h5>Payment Confirmation</h5>
      </Divider>
      
      <TableShowData dataKey="payment-confirmation" columns={columnsPaymentConfirmations} dataSource={dataSourcePayments}>
        <tfoot className="ant-table-tbody">
          <tr>
            <td colSpan={4} style={{textAlign:"right"}}>Total Payment (Approved)</td>
            <td>n/a</td>
          </tr>
          <tr>
            <td colSpan={4} style={{textAlign:"right"}}>Total Invoice</td>
            <td>n/a</td>
          </tr>
          <tr>
            <td colSpan={4} style={{textAlign:"right"}}>Outstanding Balance</td>
            <td>n/a</td>
          </tr>
        </tfoot>
      </TableShowData>
      
    </>
  )
}

const TableShowWrapper = ({children})=>{
  return (
    <div className="ant-table ant-table-small ant-table-bordered mb-4">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            {children}
          </table>
        </div>
      </div>
    </div>
  )
}

const TableShowData = ({dataKey,columns,dataSource,children})=>{
  const hasBody = dataSource && dataSource.length  ? true : false;
  const spanCount = columns.length
  return (
    <TableShowWrapper>
      <thead className="ant-table-thead">
        <tr>
          {columns.map((rowColumn,index)=>{
            return (
              <th key={rowColumn.key} className="ant-table-cell">
                {rowColumn.label}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className="ant-table-tbody">
        {
        (hasBody==false) ? (
          <tr>
            <td colSpan={spanCount}> No Data</td>
          </tr>
        ) : (
          <>
            {dataSource.map((row,index)=>{
              const tableRowKey =`tbody-${dataKey}-${index}`
              return (
                <tr key={tableRowKey}>
                  <TableTd 
                    dataKey={tableRowKey} rowData={row} columns={columns}
                    />
                </tr>
              )
            })}
          </>
        )
        }
      </tbody>
      {children}
    </TableShowWrapper>
  )
}

const TableTd = ({dataKey,columns,rowData})=>{
  return (
    <>{columns.map((row,index)=>{
      const columnValue = rowData[row.key]
      return (
        <td key={`${dataKey}-${index}`}>{columnValue}</td>
      )
    })}</>
  )
}