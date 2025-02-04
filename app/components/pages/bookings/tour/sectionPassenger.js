import { Divider, Table, Tabs } from "antd"


export const SectionPassenger = ({dataSource})=>{
  const {
    guest:dataGuest
  } = dataSource
  const {
    data:contentGuest
  } = dataGuest

  const columnPassanger = [
    { dataIndex:"title", title:"Title"},
    { dataIndex:"firstName", title:"First Name"},
    { dataIndex:"lastName", title:"Last Name"},
    { dataIndex:"bod", title:"Birthdate"},
    { dataIndex:"passangerType", title:"Participant Type"},
  ]

  const dataSourceGuest = [...contentGuest].map(row=>{
    return {
      title:row.title,
      firstName:row.firstname,
      lastName:row.lastname,
      bod:row.birthdate,
      passangerType:row.passangerType
    }
  })
  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <h5>Participant(s)</h5>
      </Divider>

      <Table 
        size="small" bordered
        columns={columnPassanger}
        dataSource={dataSourceGuest} 
        >
      </Table>
    </>
  )
}