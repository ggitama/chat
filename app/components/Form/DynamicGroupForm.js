import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import {
  eventHandleForm,
  handleAddFormGroup,
  handleRemoveFormGroup,
} from "../pages/create-data/eventHandleGroupForm";
import DynamicForm from "./DynamicForm";

export const DynamicGroupForm = (props) => {
  const {
    dataSource,
    setDataSource,
    title,
    recordTitle,
    formScheme,
    initialOnLoad,
  } = props;
  const [showGroup, setShowGroup] = useState([]);

  useEffect(() => {
    if (initialOnLoad) {
      handleAddFormGroup(dataSource, setDataSource, formScheme);
    }
  }, []);

  const handleShowGroup = (index) => {
    const tempData = [...showGroup];
    const indexData = tempData.indexOf(index);
    if (indexData > -1) {
      tempData.splice(indexData, 1);
    } else tempData.push(index);
    setShowGroup([...tempData]);
  };

  const handleUpdateForm = (data, index) => {
    const tempData = [...dataSource];
    tempData[index].dataForm = data
    setDataSource([...tempData])
  };

  return (
    <Card title={<div className="gx-ml-4">{title}</div>}>
      {dataSource.map((item, index) => {
        const number = index + 1;
        return (
          <Card
            type="inner"
            title={
              <div className="d-flex">
                <div>
                  {recordTitle} {number}
                </div>
                <button
                  onClick={() => {
                    handleShowGroup(index);
                  }}
                  className="gx-btn-clear gx-px-4"
                >
                  {showGroup.includes(index) ? (
                    <i class="fa-solid fa-chevron-up" />
                  ) : (
                    <i class="fa-solid fa-chevron-down" />
                  )}
                </button>
              </div>
            }
            extra={
              <button
                onClick={() => {
                  handleRemoveFormGroup(dataSource, setDataSource, index);
                }}
                className="gx-btn-clear gx-px-4 text-red-200-color"
              >
                <i class="fa-solid fa-trash gx-mr-2 gx-font-weight-bold" />
                Remove
              </button>
            }
          >
            {showGroup.includes(index) && (
              <>
                <DynamicForm
                  data={item.dataForm}
                  isBreakRow={true}
                  className={"mb-8"}
                  dataForm={{
                    handle: eventHandleForm,
                    data: item.dataForm,
                    onChange: (data) => {
                      handleUpdateForm(data, index);
                    },
                  }}
                />
              </>
            )}
          </Card>
        );
      })}
      <div className="w-100 d-flex">
        <Button
          className="gx-btn-warning gx-px-4"
          onClick={() =>
            handleAddFormGroup(dataSource, setDataSource, formScheme)
          }
        >
          <i class="fa-solid fa-circle-plus gx-fs-xl mr-2" /> Add Row
        </Button>
      </div>
    </Card>
  );
};
