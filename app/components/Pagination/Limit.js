import React from "react";

const Limit = ({ limit, onChangeLimit, options }) => {
  return (
    <div className="col-md-12 d-flex justify-content-between py-0 px-2 m-0 mt-2">
      {limit && (
        <div className="d-flex align-items-center">
          <div style={{ width: "auto", marginRight: "16px" }}>
            {t("txt_limit_per_page")} :{" "}
          </div>
          <select
            style={{ width: "65px" }}
            className="custom-select custom-select-md text-sm"
            value={limit}
            onChange={(e) => onChangeLimit(e.target.value)}
          >
            {options &&
              options.map((item, index) => (
                <option value={item} key={"data" + index}>
                  {item}
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Limit;
