import { Divider, Table, Row, Button } from "antd"
import { itemsTab,dataSourceDetail, dataSourceCustomer, columnsItenaryFlight } from "./scheme"
import { handleWebhookEventNotif } from "app/api/helper"
import { NotificationManager } from "react-notifications"

export const SectionDetail = ({dataSource})=>{
  if(!dataSource) return null

  const {
    customer:dataCustomer={},
    detail:dataDetail,
  } = dataSource

  const isHasReturn = (dataDetail && dataDetail.isReturnFlight) ? true : false
  const flightDeparture = (dataDetail && dataDetail.departure) ? dataDetail.departure : false
  const flightReturn = (dataDetail && dataDetail.return) ? dataDetail.return : false
  const ticketStatus = (dataDetail && dataDetail.departure.status == "TICKETED") ? true : false

  const payload = {
    "type":"received-flight-issued",
    "transactionId": dataSource.transactionId
  }

  return (
    <>
      {
        ticketStatus && (
          <Row justify={'end'} style={{
            margin: "-10px 0 -40px"
          }}>
              {/* <button
                  type="button"
                  className="ant-btn ant-btn-primary gx-my-4"
                  onClick={() =>
                    handleWebhookEventNotif(payload)
                  }
                  >
                  <span>Resend Email</span>
              </button> */}
              <Button 
                type="primary" 
                onClick={() => 
                  handleWebhookEventNotif(payload).then((result) => {
                    NotificationManager.success('email sent successfully');
                  })
                } 
                danger
              >
                Resend Email E-Ticket
              </Button>
          </Row>
        )
      }
      <Divider orientation="left" orientationMargin="0" className="mb-0">
        <h5>Order</h5>
      </Divider>
      <TableShowData 
        dataSource={dataSourceDetail(dataSource)}
      />

      <Divider orientation="left" orientationMargin="0" className="mb-0">
        <h5>Itenaries</h5>
      </Divider>
      {
        flightDeparture && (
          <TableItenaryFlight 
            className="mb-2"
            dataKey="depart" 
            title="Departure"
            dataSource={flightDeparture}
            columns={columnsItenaryFlight()}
          />
        )
      }
      {
        isHasReturn && flightReturn && (
          <TableItenaryFlight 
            className="mb-4"
            dataKey="return" 
            title="Return"
            dataSource={flightReturn}
            columns={columnsItenaryFlight()}
            />
        )
      }

      <Divider orientation="left" orientationMargin="0" className="mb-0">
        <h5>Customer</h5>
      </Divider>
      <TableShowData 
        dataSource={dataSourceCustomer(dataCustomer)}
      />
    </>
  )
}

const TableShowData = ({dataSource})=>{
  return (
    <div className="ant-table ant-table-small ant-table-bordered mb-4">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            <tbody className="ant-table-tbody">
              {dataSource.map((row,index)=>{
                let rowKey = row.key || row.label
                rowKey = `test-${rowKey}-${index}`
                return (
                  <tr 
                    key={rowKey}
                    data-row-key={rowKey}
                    className="ant-table-row ant-table-row-level-0"
                    >
                    <td
                      key={`${rowKey}-td-0`}
                      style={{width:"20%"}} 
                      className="ant-table-cell"
                      >{row.label}</td>
                    <td 
                      key={`${rowKey}-td-1`}
                      className="ant-table-cell"
                      >{row.value}</td>
                  </tr>
                ) 
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const TableItenaryFlight = (props)=>{
  let {
    dataKey,
    dataSource,
    columns,
    title,
    className="mb-2"
  } = props

  let dataSourceRoutes = dataSource?.routes || []
  dataSourceRoutes[0].totalPrice = dataSource.totalPrice
  console.log({dataSourceRoutes})
  const routeData = [...dataSourceRoutes].map(row=>{
    return {
      pnr:row.pnr,
      pnrGds:"",
      airline:row.airline?.name,
      airport:`${row.departure?.airport?.name} - ${row.destination?.airport?.name}`,
      city:`${row.departure?.airport?.city} - ${row.destination?.airport?.city}`,
      localTime:`${row.departure?.date} - ${row.destination?.date}`,
      flightSource:""
    }
  })
  return (
    <>
      <div className={className}>
        <h6><b>{title}</b></h6>
        <TableItenaryFlightRoute dataKey={dataKey} dataSource={dataSourceRoutes}/>
        <Table size="small" bordered
          columns={columns} dataSource={routeData}
        ></Table>
      </div>
    </>
  )
}

const TableItenaryFlightRoute = (props)=>{
  let {
    dataSource,
    dataKey
  } = props

  
  const firstFlight = dataSource[0]
  const lastFlight = dataSource[dataSource.length-1]
  console.log({dataSourceFlight: dataSource})
  const countTransit = dataSource.length-1
  const departure = firstFlight?.departure
  const destination = lastFlight.destination

  return (
    <>
      <div className="ant-table ant-table-small ant-table-bordered mb-2">
        <div className="ant-table-container">
          <div className="ant-table-content">
            <table>
              <tbody className="ant-table-tbody">
                <tr 
                  className="ant-table-row ant-table-row-level-0"
                  >
                  <td
                    style={{width:"20%"}} 
                    className="ant-table-cell"
                    rowSpan={5}
                    >Route</td>
                  <td 
                    className="ant-table-cell"
                    >{departure?.airport?.name} - {destination?.airport?.name}</td>
                </tr>

                <tr 
                  className="ant-table-row ant-table-row-level-0"
                  >
                  <td 
                    className="ant-table-cell"
                    >{countTransit} Transit</td>
                </tr>
                <tr 
                  className="ant-table-row ant-table-row-level-0"
                  >
                  <td 
                    className="ant-table-cell"
                    >{departure?.date} - {destination?.date}</td>
                </tr>
                <tr 
                  className="ant-table-row ant-table-row-level-0"
                  >
                  <td 
                    className="ant-table-cell"
                    >{departure?.airport?.city} - {destination?.airport?.city}</td>
                </tr>
                <tr 
                  className="ant-table-row ant-table-row-level-0"
                  >
                  <td 
                    className="ant-table-cell"
                    >
                    Rp. {firstFlight?.totalPrice?.display ? firstFlight?.totalPrice?.display : firstFlight?.totalPrice }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}