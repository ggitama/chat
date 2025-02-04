import { IconWithTextCard } from "@/components/Cms";
import { Col, Row } from "antd";

export const CardSummary = ({ props }) => {
  return (
    <>
      <Row>
        {props.map((data, index) => {
          return (
            <Col  key={index} span={8}>
              <IconWithTextCard
                cardClassName="mb-0"
                icon={data.icon}
                title={ data.type == "currency" ? formatCurrency(data.summariesData) : data.summariesData}
                subTitle={data.subTitle}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(amount);
}
