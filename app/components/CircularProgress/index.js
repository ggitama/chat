import React from "react";

const CircularProgress = ({ className, customHeight, text }) => (
  <div
    className={`loader ${className}`}
    style={{ height: customHeight ? customHeight : "" }}
  >
    <img src="/images/loader.svg" alt="loader" style={{ height: 60 }} />
    {text && <div className="gx-fs-sm gx-w-100 gx-text-center gx-mt-2">{text}</div>}
  </div>
);
export default CircularProgress;
CircularProgress.defaultProps = {
  className: "",
};
