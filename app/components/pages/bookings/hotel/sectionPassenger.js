import { Divider, Table, Tabs } from "antd"


export const SectionPassenger = ({dataSource})=>{
  const columnPassanger = [
    { dataIndex:"title", title:"Title"},
    { dataIndex:"firstName", title:"First Name"},
    { dataIndex:"lastName", title:"Last Name"},
  ]

  const dataGuest = dataSource?.guest?.data || []
  const guestSources = [ ...dataGuest ].map(row=>{
    return {
      title:row?.title,
      firstName:row?.firstname,
      lastName:row?.lastname
    }
  })

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <h5>Guest(s)</h5>
      </Divider>

      <Table 
        size="small" bordered
        dataSource={guestSources}
        columns={columnPassanger} 
        >
      </Table>
    </>
  )
}