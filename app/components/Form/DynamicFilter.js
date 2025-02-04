import React from "react";
import { Input } from "./input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/components/react-datepicker.css";
import SelectSearch from "./Select/SelectSearch";
import SelectSearchCreatable from "./Select/SelectSearchCreatable";
import SelectSearchMulti from "./Select/SelectSearchMulti";
import Select from "./Select/Select";
import SelectMulti from "./Select/SelectMulti";
import SelectCreatableMulti from "./Select/SelectCreatableMulti";
import SelectSearchByCategory from "./Select/SelectSearchByCategory";

import "./DynamicFilter.css";

const renderInput = (data, index, dataFilter, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <Input
          type="text"
          value={data && data.renderValue ? data.renderValue : data.value}
          onChange={(e) =>
            dataFilter.handle(
              e,
              data.type,
              index,
              false,
              dataFilter.data,
              dataFilter.onChange
            )
          }
          readOnly={data.readonly}
          placeholder={data.placeHolder}
        />
      </div>
    </div>
  );
};

const renderSearch = (data, index, dataFilter, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <SelectSearch
          defaultValue={data.value}
          onChange={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange,
              dataFilter.loading
            )
          }
          disabled={data.readonly}
          onSearch={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onSearch",
              dataFilter.data,
              dataFilter.onChange
            )
          }
        />
        {!data.noClear && (
          <>
            {!(data && data.readonly) && (
              <button
                className={`btn btnTransparent buttonClearSearch ${
                  data.value && "showClear"
                }`}
                onClick={() =>
                  dataFilter.handle(
                    "",
                    data.type,
                    index,
                    "onChange",
                    dataFilter.data,
                    dataFilter.onChange
                  )
                }
              >
                x
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const renderSearchCreatable = (
  data,
  index,
  dataFilter,
  isBreakRow,
  additionalData
) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <SelectSearchCreatable
          defaultValue={data.value}
          onChange={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange,
              dataFilter.loading
            )
          }
          disabled={data.readonly}
          onSearch={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onSearch",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          onCreate={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onCreate",
              dataFilter.data,
              dataFilter.onChange
            )
          }
        />
        {!data.noClear && (
          <>
            {!(data && data.readonly) && (
              <button
                className={`btn btnTransparent buttonClearSearch ${
                  data.value && "showClear"
                }`}
                onClick={() =>
                  dataFilter.handle(
                    "",
                    data.type,
                    index,
                    "onChange",
                    dataFilter.data,
                    dataFilter.onChange
                  )
                }
              >
                x
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const renderSearchDefault = (
  data,
  index,
  dataFilter,
  isBreakRow,
  additionalData
) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <Select
          defaultValue={data.value}
          onChange={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange,
              dataFilter.loading
            )
          }
          disabled={data.readonly}
          options={data.options ? data.options : null}
        />
        {!data.noClear && (
          <>
            {!(data && data.readonly) && (
              <button
                className={`btn btnTransparent buttonClearSearch ${
                  data.value && "showClear"
                }`}
                onClick={() =>
                  dataFilter.handle(
                    "",
                    data.type,
                    index,
                    "onChange",
                    dataFilter.data,
                    dataFilter.onChange
                  )
                }
              >
                x
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const renderSearchMulti = (
  data,
  index,
  dataFilter,
  isBreakRow,
  additionalData
) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <SelectSearchMulti
          defaultValue={data.value}
          disabled={data.readonly}
          onChange={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          onRemove={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          onSearch={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onSearch",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          isMultiple={true}
        />
      </div>
    </div>
  );
};

const renderSearchDefaultMulti = (
  data,
  index,
  dataFilter,
  isBreakRow,
  additionalData
) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <SelectMulti
          defaultValue={data.value}
          disabled={data.readonly}
          onChange={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          onRemove={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          options={data.options ? data.options : null}
          isMultiple={true}
        />
      </div>
    </div>
  );
};

const renderSearchByCategory = (
  data,
  index,
  dataFilter,
  isBreakRow,
  additionalData
) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <div className="border border-rounded d-flex">
          <select
            className="custom-select custom-select-md text-14"
            onChange={(e) =>
              dataFilter.handle(
                e.target.value,
                data.type,
                index,
                "onSelect",
                dataFilter.data,
                dataFilter.onChange,
                additionalData
              )
            }
            value={data.field}
            disabled={data.disabled}
            style={{ width: "40%" }}
          >
            {data.options &&
              data.options.length > 0 &&
              data.options.map((option, index) => (
                <option
                  key={"data" + index}
                  value={option.value}
                  disabled={option.value === data.disabled}
                >
                  {option.label}
                </option>
              ))}
          </select>
          <div className="w-100">
            <SelectSearchByCategory
              className="w-100"
              defaultValue={data.value}
              onChange={(value) =>
                dataFilter.handle(
                  value,
                  data.type,
                  index,
                  "onChange",
                  dataFilter.data,
                  dataFilter.onChange,
                  additionalData
                )
              }
              onSearch={(value) =>
                dataFilter.handle(
                  value,
                  data.type,
                  index,
                  "onSearch",
                  dataFilter.data,
                  dataFilter.onChange,
                  additionalData
                )
              }
              disabled={data.disabled}
            />
          </div>
          {!(data && data.readonly) && (
            <button
              className={`btn btnTransparent buttonClearSearch ${
                data.value && "showClear"
              }`}
              onClick={() =>
                dataFilter.handle(
                  "",
                  data.type,
                  index,
                  "onChange",
                  dataFilter.data,
                  dataFilter.onChange
                )
              }
            >
              x
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const renderSelect = (data, index, dataFilter, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <select
          className="custom-select custom-select-md text-14"
          onChange={(e) =>
            dataFilter.handle(
              e,
              data.type,
              index,
              false,
              dataFilter.data,
              dataFilter.onChange
            )
          }
          value={data.value}
          disabled={data.isDisabled}
          style={{
            paddingLeft: "10px",
            paddingRight: "22px",
          }}
        >
          {data.options &&
            data.options.length > 0 &&
            data.options.map((option, index) => (
              <option
                key={"data" + index}
                value={option.value}
                disabled={option.value === data.disabled}
              >
                {option.label}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

const renderSelectCreateMulti = (
  data,
  index,
  dataFilter,
  isBreakRow,
  additionalData
) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <SelectCreatableMulti
          defaultValue={data.value}
          onChange={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          onRemove={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onChange",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          onCreate={(value) =>
            dataFilter.handle(
              value,
              data.type,
              index,
              "onCreate",
              dataFilter.data,
              dataFilter.onChange
            )
          }
          isMultiple={true}
        />
      </div>
    </div>
  );
};

const renderDate = (data, index, dataFilter, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className={`col-xl-12 px-1 DatePicker__wrapper`}>
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <DatePicker
          onChangeRaw={(e) => e.preventDefault()}
          popperPlacement="bottom-end"
          selected={data.value}
          dateFormat="dd/MM/yyyy"
          placeholderText="dd-mm-yyyy"
          minDate={data && data.minDate ? data && data.minDate : ""}
          onChange={(date) =>
            dataFilter.handle(
              date,
              data.type,
              index,
              false,
              dataFilter.data,
              dataFilter.onChange
            )
          }
        />
        {!data.noClear && (
          <button
            className={`btn btnTransparent buttonClearDate ${
              data.value && "showClear"
            }`}
            onClick={() =>
              dataFilter.handle(
                "",
                data.type,
                index,
                false,
                dataFilter.data,
                dataFilter.onChange
              )
            }
          >
            x
          </button>
        )}
      </div>
    </div>
  );
};

const renderButton = (data, dataFilter, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group d-flex`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
        alignItems: "flex-end",
      }}
    >
      <div className="col-xl-12 px-1">
        <button
          className={`${data.style}`}
          style={{ marginBottom: "6px" }}
          onClick={() => dataFilter.onSubmit()}
        >
          {data.label}
        </button>
      </div>
    </div>
  );
};

const renderButtonDownload = (data, dataFilter, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: isBreakRow && `1 0 ${data && data.width ? data.width : "100%"}`,
        width: data && data.width ? data.width : "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small text-transparent">
          {data.label}
        </label>
        <button className={data.style} onClick={() => dataFilter.onDownload()}>
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};

const renderField = (item, index, dataFilter, isBreakRow, additionalData) => {
  switch (item.type) {
    case "Input":
      return renderInput(item, index, dataFilter, isBreakRow, additionalData);

    case "Search":
      return renderSearch(item, index, dataFilter, isBreakRow, additionalData);

    case "SearchCreatable":
      return renderSearchCreatable(
        item,
        index,
        dataFilter,
        isBreakRow,
        additionalData
      );

    case "SearchDefault":
      return renderSearchDefault(
        item,
        index,
        dataFilter,
        isBreakRow,
        additionalData
      );

    case "SearchMulti":
      return renderSearchMulti(
        item,
        index,
        dataFilter,
        isBreakRow,
        additionalData
      );

    case "SearchDefaultMulti":
      return renderSearchDefaultMulti(
        item,
        index,
        dataFilter,
        isBreakRow,
        additionalData
      );

    case "SearchByCategory":
      return renderSearchByCategory(
        item,
        index,
        dataFilter,
        isBreakRow,
        additionalData
      );

    case "Date":
      return renderDate(item, index, dataFilter, isBreakRow, additionalData);

    case "Select":
      return renderSelect(item, index, dataFilter, isBreakRow, additionalData);

    case "SelectCreateMulti":
      return renderSelectCreateMulti(
        item,
        index,
        dataFilter,
        isBreakRow,
        additionalData
      );

    case "ButtonAction":
      return renderButton(item, dataFilter, isBreakRow, additionalData);

    case "ButtonDownload":
      return renderButtonDownload(item, dataFilter, isBreakRow, additionalData);

    default:
      return null;
  }
};

export const DynamicFilter = ({
  data,
  dataFilter,
  isBreakRow,
  additionalData,
  errorMessage,
}) => {
  const dataField = [...data];
  return (
    <>
      <div
        className={
          isBreakRow
            ? "dynamicFilter__container__formHeader__wrap"
            : "dynamicFilter__container__formHeader"
        }
      >
        {dataField.map((item, index) => (
          <React.Fragment key={item.label}>
            {renderField(item, index, dataFilter, isBreakRow, additionalData)}
          </React.Fragment>
        ))}
      </div>
      {errorMessage && <div className="text-red-200-color">{errorMessage}</div>}
    </>
  );
};

export default DynamicFilter;
