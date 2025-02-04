import { Divider, Row, Button } from "antd"
import { TableShowData } from "../partials/tableShowData"
import { dataSourceDetail, dataSourceCustomer, dataSourceRoomDetail } from "./scheme"
import { handleWebhookEventNotif } from "app/api/helper"
import { NotificationManager } from "react-notifications"

export const SectionDetail = ({dataSource})=>{
  if(!dataSource) return null

  const ticketStatus = dataSource.detail.room.status == "TICKETED" ? true : false;
  const payload = {
    "type":"received-hotel-issued",
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
        <h5>Room Detail</h5>
      </Divider>
      <TableShowData 
        dataSource={dataSourceRoomDetail(dataSource)}
      />

      <Divider orientation="left" orientationMargin="0" className="mb-0">
        <h5>Customer</h5>
      </Divider>
      <TableShowData 
        dataSource={dataSourceCustomer(dataSource)}
      />
    </>
  )
}