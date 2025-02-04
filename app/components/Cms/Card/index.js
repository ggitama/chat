import { Card } from "antd"

export const CmsCardTitle = ({title})=>{
  return (
    <>
      <h5><b>{title}</b></h5>
    </>
  )
}

export const CmsCard = ({
  title="",
  extra:cardExtra="",
  children
})=>{

  let titleOnly = title && (<CmsCardTitle title={title}/>)
  
  return (
    <>

      <Card
        title={titleOnly}
        extra={cardExtra}
        >
        {children}
      </Card>
    </>
  )
}

export * from "./IconWithTextCard"