import { IconWithTextCard } from "@/components/Cms"
import { Col, Row } from "antd"

export const CardSummary = ({props})=>{
  const {state} = props

  let cardData = state?.cardSummaries
  let icons = [
    {icon:"user",title:cardData?.customerCount || 0,subTitle:"Total Customer"},
  ]

  return (
    <>
      <Row>
        {icons.map((iconRow,index)=>{
          return (
            <Col xs={6}>
              <IconWithTextCard
                cardClassName="mb-0"
                icon={iconRow.icon} 
                title={iconRow.title} 
                subTitle={iconRow.subTitle}
                />
            </Col>
          )
        })}
      </Row>
    </>
  )
}