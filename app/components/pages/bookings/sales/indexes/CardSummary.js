import { IconWithTextCard } from "@/components/Cms"
import NumberHelper from "@/util/cms/number.helper"
import { Col, Row } from "antd"

export const CardSummary = ({props})=>{
  const {state} = props

  let cardData = state?.cardSummaries
  let finalPrice = NumberHelper.formatThousand(cardData?.finalPriceSum || 0)
  let totalDiscount = NumberHelper.formatThousand(cardData?.totalDiscount || 0)
  let countTransaction = NumberHelper.formatThousand(cardData?.countTransaction || 0)
  let countCoupon = NumberHelper.formatThousand(cardData?.countCoupon || 0)
  let icons = [
    {
      span:"8",
      icon:"orders",
      title:`Rp. ${finalPrice}`,
      subTitle:"Total Final Price"
    },
    {
      span:"8",
      icon:"pricing-table",
      title: `Rp. ${totalDiscount}`,
      subTitle:"Total Discount"
    },
    {
      span:"4",
      icon:"tasks",
      title:countTransaction,
      subTitle:"Total Transaction"
    },
    {
      span:"4",
      icon:"tickets",
      title:countCoupon,
      subTitle:"Total Coupon"
    },
  ]

  return (
    <>
      <Row>
        {icons.map((iconRow,index)=>{
          return (
            <Col span={iconRow.span}>
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