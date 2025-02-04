import { IconWithTextCard } from "@/components/Cms";
import { Col, Row } from "antd";

export const CardSummaryOrder = ({ props }) => {
  const [{ summariesData, type }] = props;

  // Inisialisasi summariesData dengan objek kosong jika undefined
  const summariesDataOrDefault = summariesData || {
    finalPriceSum: 0,
    totalDiscount: 0,
    countTransaction: 0,
    countCoupon: 0,
  };

  const productType = type.charAt(0).toUpperCase() + type.slice(1);

  const icons = [
    {
      icon: "orders",
      title: formatCurrency(summariesDataOrDefault.finalPriceSum),
      subTitle: `Total Final Price ${productType}` ,
    },
    {
      icon: "tasks",
      title: summariesDataOrDefault.countTransaction,
      subTitle: `Total Transaction ${productType}`,
    },
    {
      icon: "tasks",
      title: summariesDataOrDefault.countTransaction,
      subTitle: `Total Transaction Sales ${productType}`,
    },
  ];

  return (
    <>
      <Row>
        {icons.map((iconRow, index) => {
          return (
            <Col span={8}>
              <IconWithTextCard
                icon={iconRow.icon}
                title={iconRow.title}
                subTitle={iconRow.subTitle}
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
