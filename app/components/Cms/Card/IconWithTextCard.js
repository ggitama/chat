import { Card } from "antd";

export const IconWithTextCard = (props) => {
  const {
    icon, title, subTitle,
    cardClassName
  } = props;
  let iconColor = "black"

  return (
    <Card
      className={cardClassName}
    >
      <div className="gx-media gx-align-items-center gx-flex-nowrap">
        <div className="gx-mr-lg-4 gx-mr-3">
          <i className={`icon icon-${icon} gx-fs-xlxl gx-text-${iconColor} gx-d-flex`}
             style={{fontSize: 35, padding: 0}}/>
        </div>
        <div className="gx-media-body">
          <h1 className="gx-fs-xl gx-font-weight-medium gx-mb-1">{title}</h1>
          <p className="gx-text-grey gx-mb-0">{subTitle}</p>
        </div>
      </div>
    </Card>
  );
};