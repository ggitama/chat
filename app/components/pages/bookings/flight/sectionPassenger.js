import { Divider, Table, Tabs } from "antd"


export const SectionPassenger = ({dataSource})=>{

  const columnPassanger = [
    { dataIndex:"title", title:"Title"},
    { dataIndex:"firstName", title:"First Name"},
    { dataIndex:"lastName", title:"Last Name"},
    { dataIndex:"bod", title:"Birthdate"},
    { dataIndex:"passangerType", title:"Passenger Type"},
    { dataIndex:"passportId", title:"Passport ID"},
    { dataIndex:"passportCountry", title:"Passport Country"},
    { dataIndex:"passportIssueDate", title:"Passport Issue Date"},
  ]

  const guestData = dataSource?.guest?.data || []
  const passangersData = [...guestData].map(row=>{
    return {
      title:row.title,
      firstName:row.firstname,
      lastName:row.lastname,
      bod:row.birthdate,
      passangerType:row.passangerType,
      passportId:"",
      passportCountry:"",
      passportIssueDate:"",
    }
  })
  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        <h5>Passenger(s)</h5>
      </Divider>

      <Table 
        size="small" bordered
        columns={columnPassanger}
        dataSource={passangersData} 
        >
      </Table>
    </>
  )
}