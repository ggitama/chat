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
import { Switch } from "antd";

import "./DynamicFilter.css";
import { InputImage } from "./InputImage";
import ReactImageUploading from "react-images-uploading";
import TextArea from "antd/lib/input/TextArea";

const renderSwitch = (data, index, dataForm, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: `1 0 ${data && data.width ? data.width : "100%"}`,
        width: "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <Switch
          defaultChecked onChange={(e) => {
            dataForm.handle(
              e,
              data.type,
              index,
              false,
              dataForm.data,
              dataForm.onChange
            )
          }}
        />
      </div>
    </div>
  );
};

const renderInput = (data, index, dataForm, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: `1 0 ${data && data.width ? data.width : "100%"}`,
        width: "100%",
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
            dataForm.handle(
              e,
              data.type,
              index,
              false,
              dataForm.data,
              dataForm.onChange
            )
          }
          readOnly={data.readonly}
          placeholder={data.placeHolder}
        />
      </div>
    </div>
  );
};

const renderInputArea = (data, index, dataForm, isBreakRow, additionalData) => {
  return (
    <div
      className={`field form-group`}
      style={{
        flex: `1 0 ${data && data.width ? data.width : "100%"}`,
        width: "100%",
      }}
    >
      <div className="col-xl-12 px-1">
        <label className="col-form-label font-weight-normal small">
          {data.label}
          {data.required && <span className="text-danger ml-1">*</span>}
        </label>
        <TextArea rows={4} placeholder="maxLength is 255" maxLength={255} onChange={(e) =>
            dataForm.handle(
              e,
              data.type,
              index,
              false,
              dataForm.data,
              dataForm.onChange
            )
          }
          />
      </div>
    </div>
  );
};

const renderImage = (data, index, dataForm, isBreakRow, additionalData) => {
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
        <ReactImageUploading
          multiple
          value={data.value}
          onChange={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange,
              dataForm.loading
            )
          }
          maxNumber={data.maxUpload}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            // onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="d-flex overflow-auto gx-mt-3">
              {imageList.length === data.maxUpload || (
                <button
                  className="input-add-image-thumbnail"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              )}
              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="d-flex flex-column position-relative"
                >
                  <div
                    className="input-preview-image-thumbnail shadow-md"
                    style={{ background: `url('${image["data_url"]}')` }}
                  />

                  <div className="image-item__btn-wrapper">
                    <button
                      className="gx-btn-clear edit-preview-image-thumbnail"
                      onClick={() => onImageUpdate(index)}
                    >
                      <i class="fa-solid fa-edit" />
                    </button>
                    <button
                      className="gx-btn-clear text-red-200-color remove-preview-image-thumbnail"
                      onClick={() => onImageRemove(index)}
                    >
                      <i class="fa-solid fa-close" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ReactImageUploading>
      </div>
    </div>
  );
};

const renderSearch = (data, index, dataForm, isBreakRow, additionalData) => {
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
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange,
              dataForm.loading
            )
          }
          disabled={data.readonly}
          onSearch={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onSearch",
              dataForm.data,
              dataForm.onChange
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
                  dataForm.handle(
                    "",
                    data.type,
                    index,
                    "onChange",
                    dataForm.data,
                    dataForm.onChange
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
  dataForm,
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
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange,
              dataForm.loading
            )
          }
          disabled={data.readonly}
          onSearch={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onSearch",
              dataForm.data,
              dataForm.onChange
            )
          }
          onCreate={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onCreate",
              dataForm.data,
              dataForm.onChange
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
                  dataForm.handle(
                    "",
                    data.type,
                    index,
                    "onChange",
                    dataForm.data,
                    dataForm.onChange
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
  dataForm,
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
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange,
              dataForm.loading
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
                  dataForm.handle(
                    "",
                    data.type,
                    index,
                    "onChange",
                    dataForm.data,
                    dataForm.onChange
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
  dataForm,
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
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange
            )
          }
          onRemove={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange
            )
          }
          onSearch={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onSearch",
              dataForm.data,
              dataForm.onChange
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
  dataForm,
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
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange
            )
          }
          onRemove={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange
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
  dataForm,
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
              dataForm.handle(
                e.target.value,
                data.type,
                index,
                "onSelect",
                dataForm.data,
                dataForm.onChange,
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
                dataForm.handle(
                  value,
                  data.type,
                  index,
                  "onChange",
                  dataForm.data,
                  dataForm.onChange,
                  additionalData
                )
              }
              onSearch={(value) =>
                dataForm.handle(
                  value,
                  data.type,
                  index,
                  "onSearch",
                  dataForm.data,
                  dataForm.onChange,
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
                dataForm.handle(
                  "",
                  data.type,
                  index,
                  "onChange",
                  dataForm.data,
                  dataForm.onChange
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

const renderSelect = (data, index, dataForm, isBreakRow, additionalData) => {
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
            dataForm.handle(
              e,
              data.type,
              index,
              false,
              dataForm.data,
              dataForm.onChange
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
  dataForm,
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
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange
            )
          }
          onRemove={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onChange",
              dataForm.data,
              dataForm.onChange
            )
          }
          onCreate={(value) =>
            dataForm.handle(
              value,
              data.type,
              index,
              "onCreate",
              dataForm.data,
              dataForm.onChange
            )
          }
          isMultiple={true}
        />
      </div>
    </div>
  );
};

const renderDate = (data, index, dataForm, isBreakRow, additionalData) => {
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
            dataForm.handle(
              date,
              data.type,
              index,
              false,
              dataForm.data,
              dataForm.onChange
            )
          }
        />
        {!data.noClear && (
          <button
            className={`btn btnTransparent buttonClearDate ${
              data.value && "showClear"
            }`}
            onClick={() =>
              dataForm.handle(
                "",
                data.type,
                index,
                false,
                dataForm.data,
                dataForm.onChange
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

const renderField = (item, index, dataForm, isBreakRow, additionalData) => {
  switch (item.type) {
    case "Input":
      return renderInput(item, index, dataForm, isBreakRow, additionalData);
    
    case "InputArea":
      return renderInputArea(item, index, dataForm, isBreakRow, additionalData);

    case "Switch":
      return renderSwitch(item, index, dataForm, isBreakRow, additionalData);

    case "Image":
      return renderImage(item, index, dataForm, isBreakRow, additionalData);

    case "Search":
      return renderSearch(item, index, dataForm, isBreakRow, additionalData);

    case "SearchCreatable":
      return renderSearchCreatable(
        item,
        index,
        dataForm,
        isBreakRow,
        additionalData
      );

    case "SearchDefault":
      return renderSearchDefault(
        item,
        index,
        dataForm,
        isBreakRow,
        additionalData
      );

    case "SearchMulti":
      return renderSearchMulti(
        item,
        index,
        dataForm,
        isBreakRow,
        additionalData
      );

    case "SearchDefaultMulti":
      return renderSearchDefaultMulti(
        item,
        index,
        dataForm,
        isBreakRow,
        additionalData
      );

    case "SearchByCategory":
      return renderSearchByCategory(
        item,
        index,
        dataForm,
        isBreakRow,
        additionalData
      );

    case "Date":
      return renderDate(item, index, dataForm, isBreakRow, additionalData);

    case "Select":
      return renderSelect(item, index, dataForm, isBreakRow, additionalData);

    case "SelectCreateMulti":
      return renderSelectCreateMulti(
        item,
        index,
        dataForm,
        isBreakRow,
        additionalData
      );

    default:
      return null;
  }
};

export const DynamicForm = ({
  data,
  dataForm,
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
            {renderField(item, index, dataForm, isBreakRow, additionalData)}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default DynamicForm;
