import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { useCallback } from "react";
import { NotificationManager } from "react-notifications";
import CircularProgress from "@/components/CircularProgress";
import DynamicForm from "@/components/Form/DynamicForm";
import { formCreateGroupScheme, formCreateScheme } from "@/components/pages/create-data/form-create-scheme";
import {
  eventHandleCreate,
  handleValidateCreate,
} from "@/components/pages/create-data/eventHandleCreateForm";
import { ModalConfirmCreate } from "@/components/pages/create-data/modalConfirmCreate";
import { DynamicGroupForm } from "@/components/Form/DynamicGroupForm";

const ListData = (props) => {
  const { screenHeight, screenWidth } = props;
  const heightForm = screenHeight - 380;
  const [isLoading, setIsLoading] = useState();
  const [formCreate, setFormCreate] = useState([]);
  const [groupFormCreate, setGroupFormCreate] = useState([]);
  const [errorForm, setErrorForm] = useState("");
  const [isModalConfirm, setIsModalConfirm] = useState(false);

  useEffect(() => {
    setFormCreate([...formCreateScheme()]);
  }, []);

  const updateFormCreate = (data) => {
    setFormCreate([...data]);
  };

  const fetchCreateData = async (data) => {
    let error = "";
    let result = false;
    const payload = {
      ...data,
    };
    const isSuccess = Math.random() < 0.6;
    if (isSuccess) {
      result = { statusCode: 200, statusMessage: "OK" };
    } else {
      const isErrorServer = Math.random() < 0.6;
      if (!isErrorServer) {
        result = { statusCode: 400, statusMessage: "Bad Request" };
      } else {
        error = "Connection Timeout";
      }
    }
    return { result, error };
  };

  const handleCreateData = async (formData) => {
    let alert = "";
    setIsModalConfirm({
      isLoadingPromise: true,
    });
    const { result, error } = await fetchCreateData(formData);
    if (result) {
      if (result.statusCode === 200) {
        alert = {
          isSuccess: true,
          message: "create data success",
        };
      } else {
        alert = {
          isSuccess: false,
          message: "create data failed",
        };
      }
    } else {
      alert = {
        isSuccess: false,
        message: "something went wrong, please try again",
      };
    }
    setTimeout(() => {
      if (alert.isSuccess) {
        setIsModalConfirm(false);
        NotificationManager.success(alert.message);
        console.log("redirecting");
      } else {
        setIsModalConfirm({
          isLoadingPromise: false,
        });
        NotificationManager.error(alert.message);
      }
    }, 1200);
  };

  const handleSubmitCreate = (action) => {
    if (action === "validate") {
      const { updatedDataFilters, isError } = handleValidateCreate(formCreate);
      if (isError.length > 0) {
        const errorMessage = `${isError.join(",")} can't be empty`;
        setErrorForm(errorMessage);
      } else {
        setErrorForm("");
        setIsModalConfirm({ isLoadingFetch: false });
      }
    } else handleCreateData();
  };

  return (
    <>
      <Card title="Create Form" extra={<div className="gx-py-4" />}>
        <>
          {isLoading ? (
            <CircularProgress
              className={"gx-w-100"}
              customHeight={heightForm}
              text={"Loading Data"}
            />
          ) : (
            <div
              style={{ minHeight: "100vh", paddingBottom: "80px" }}
              className="d-flex flex-column gx-px-4"
            >
              <DynamicForm
                data={formCreate}
                isBreakRow={true}
                className={"mb-8"}
                dataForm={{
                  handle: eventHandleCreate,
                  data: formCreate,
                  onChange: updateFormCreate,
                }}
                errorMessage={errorForm}
              />
              <DynamicGroupForm
                title={"Dynamic Group Form"}
                dataSource={groupFormCreate}
                setDataSource={setGroupFormCreate}
                formScheme={formCreateGroupScheme}
                initialOnLoad={true}
                recordTitle="Data Room"
              />
              <div className="w-100 d-flex justify-content-end">
                <Button
                  className="gx-btn-info gx-px-4"
                  onClick={() => handleSubmitCreate("validate")}
                >
                  Submit
                </Button>
              </div>
              {errorForm && (
                <div className="w-100 d-flex text-red-200-color ">
                  {errorForm}
                </div>
              )}
            </div>
          )}
        </>
      </Card>
      <ModalConfirmCreate
        isModalShow={isModalConfirm}
        handleModalShow={setIsModalConfirm}
        handleAction={handleSubmitCreate}
      />
    </>
  );
};

export default ListData;
