import Icon, {StarFilled, StarOutlined} from "@ant-design/icons";
import { Fragment } from "react";

export default function RatingStar(props) {
  const { rating, className, width, height, margin } = props;
  const valueRating = !isNaN(rating) ? (rating > 5 ? 5 : rating) : 0;
  const items = [];
  let i = 0;

  while (i < 5) {
    items.push(
      <Fragment key={"data"+i}>
        <Icon
          component={i >= 0 && i < valueRating ? StarFilled : StarOutlined}
          style={{
            width: width,
            height: height,
            margin: margin ? margin : "4px",
            color: "#fa8c16",
          }}
        />
      </Fragment>
    );
    i = i + 1;
  }
  return <div className={`gx-flex ${className ? className : ""}`}>{items}</div>;
}
