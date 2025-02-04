import { Divider, Row, Button } from "antd"
import { TableShowData, TableWrapper } from "../partials/tableShowData"
import { dataSourceDetail, dataSourceCustomer, dataSourceTourDetail, dataSourceRoomDetail } from "./scheme"
import { handleWebhookEventNotif } from "app/api/helper"
import { NotificationManager } from "react-notifications"

export const SectionDetail = ({dataSource})=>{
  if(!dataSource) return null

  const {
    customer:customerData
  } = dataSource

  const ticketStatus = dataSource.order.status == "TICKETED" ? true : false;
  const payload = {
    "type":"received-tour-issued",
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
                    handleWebhookEventNotif(payload).then((result) => {
                      NotificationManager.success('email sent successfully');
                    })
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
        <h5>Tour Detail</h5>
      </Divider>
      <TableShowData 
        dataSource={dataSourceTourDetail(dataSource)}
      />
      
      <Divider orientation="left" orientationMargin="0" className="mb-0">
        <h5>Room Detail</h5>
      </Divider>
      <TableRoomDetail 
        dataSource={dataSourceRoomDetail(dataSource)}
      />

      <Divider orientation="left" orientationMargin="0" className="mb-0">
        <h5>Customer</h5>
      </Divider>
      <TableShowData 
        dataSource={dataSourceCustomer(customerData)}
      />
    </>
  )
}

const TableRoomDetail =({dataSource})=>{
  if(!dataSource) return null
  return (
    <TableWrapper>
      <tbody className="ant-table-tbody">
        {dataSource.map(row=>{
          const isHasGuest = row.guests && row.guests.length
          return (
            <>
              <tr>
                <td rowSpan={3} style={{width:"10%",textAlign:"center",verticalAlign:"middle"}}>
                    {row.label}
                </td>
                <td style={{width:"20%"}}>Type</td>
                <td>{row.roomType}</td>
              </tr>
              <tr>
                <td>Extra Bed</td>
                <td>{row.isExtraBed}</td>
              </tr>
              <tr>
                <td>Guest</td>
                <td>
                  {(isHasGuest==false) ? "" : (
                    <ul className="my-0">
                      {row.guests.map(rowGuest=>{
                        return (
                          <li>{rowGuest}</li>
                        )
                      })} 
                    </ul>
                  ) 
                  }
                </td>
              </tr>
            </>
          )
        })}
      </tbody>
    </TableWrapper>
  )
}