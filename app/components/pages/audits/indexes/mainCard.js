import { Card } from "antd"

export const MainCardTitle = ({title})=>{
  return (
    <>
      <h5><b>{title}</b></h5>
    </>
  )
}

export const MainCard = ({title="",extra:cardExtra="",children})=>{
  let cardTitle = title && (<MainCardTitle title={title}/>)
  
  return (
    <>
      <Card
        title={cardTitle}
        extra={cardExtra}
        >
        {children}
      </Card>
    </>
  )
}