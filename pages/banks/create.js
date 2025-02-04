import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { useCallback } from "react";
import { NotificationManager } from "react-notifications";
import CircularProgress from "@/components/CircularProgress";
import DynamicForm from "@/components/Form/DynamicForm";
import { formCreateScheme } from "@/components/pages/bank/create-data/form-create-scheme";
import {
  eventHandleCreate,
  handleValidateCreate,
} from "@/components/pages/bank/create-data/eventHandleCreateForm";
import { ModalConfirmCreate } from "@/components/pages/bank/create-data/modalConfirmCreate";
import { handleManageBank } from "app/api/helper";

const CreateData = (props) => {
  const { screenHeight, screenWidth } = props;
  const heightForm = screenHeight - 380;
  const [isLoading, setIsLoading] = useState();
  const [formCreate, setFormCreate] = useState([]);
  const [formCreateSubmit, setFormCreateSubmit] = useState([]);
  const [groupFormCreate, setGroupFormCreate] = useState([]);
  const [errorForm, setErrorForm] = useState("");
  const [isModalConfirm, setIsModalConfirm] = useState(false);

  useEffect(() => {
    setFormCreate([...formCreateScheme()]);
  }, []);

  const updateFormCreate = (data) => {
    setFormCreate([...data]);
  };

  const manageData = async (data) => {
    const payload = {
      ...data,
    };

    let { result, error } = await handleManageBank(payload);

    if (result.statusCode === 200) {
      result = { statusCode: 200, statusMessage: "OK" };
    } else {
      result = { statusCode: result.statusCode, statusMessage: result.statusMessage };
    }
    return { result, error };
  };

  const handleCreateData = async () => {
    let alert = "";
    setIsModalConfirm({
      isLoadingPromise: true,
    });
    const { result, error } = await manageData(formCreateSubmit);
    if (result) {
      if (result.statusCode === 200) {
        alert = {
          isSuccess: true,
          message: "create data success",
        };
      } else {
        alert = {
          isSuccess: false,
          message: result.statusMessage,
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
      const { updatedDataCreates, isError } = handleValidateCreate(formCreate);
      if (isError.length > 0) {
        const errorMessage = `${isError.join(",")} can't be empty`;
        setErrorForm(errorMessage);
      } else {
        setFormCreateSubmit(updatedDataCreates)
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

export default CreateData;
