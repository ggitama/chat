
import { blue, green, red } from "@ant-design/colors";

export const getHeightTable = ({screenHeight})=>{
  return screenHeight-380
}

export const getTableConfig = (heightTable)=>{

  return {
    bordered: true,
    pagination: false,
    size: "small",
    showHeader: true,
    scroll: { y: heightTable },
  };
}