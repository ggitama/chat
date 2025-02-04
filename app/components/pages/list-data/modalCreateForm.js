import { Button, Modal } from "antd";
import { blue } from "@ant-design/colors";
import { useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
export const ModalCreateForm = (props) => {
  const { isModalShow, handleModalShow, handleCreateData } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState([]);

  const handleFormUpdate = (index, value) => {
    const tempDataForm = [...formData];
    switch (tempDataForm[index].type) {
      case "Input":
        if (formFieldValidation(tempDataForm[index].validationType, value)) {
          tempDataForm[index].value = value;
        }
        break;

      default:
        break;
    }

    setFormData([...tempDataForm]);
  };

  useEffect(() => {
    if (isModalShow && !isModalShow.isLoadingPromise) {
      setFormData([
        {
          name: "First Name",
          value: "",
          type: "Input",
          validationType: "alphanumeric",
          required: true,
          error: "",
        },
        {
          name: "Last Name",
          value: "",
          validationType: "alphanumeric",
          type: "Input",
        },
        {
          name: "Street",
          value: "",
          validationType: false,
          type: "Input",
        },
      ]);
      setIsLoading(false);
    }
  }, [isModalShow]);
  return (
    <Modal open={isModalShow} title={false} footer={false} closeIcon={true}>
      {isModalShow && (
        <>
          <div className="gx-fs-xl gx-font-wight-semi-bold gx-w-100 gx-text-center gx-mt-4">
            Create New User
          </div>
          {isLoading ? (
            <CircularProgress
              className={"gx-w-100"}
              customHeight={"300px"}
              text={"Loading Data"}
            />
          ) : (
            <>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <Input
                  label={"First Name"}
                  value={formData[0].value}
                  required={true}
                  onChange={(e) => handleFormUpdate(0, e.target.value)}
                  error={formData[0].error}
                  className={"gx-w-100"}
                />
                <Input
                  label={"Last Name"}
                  value={formData[1].value}
                  required={true}
                  onChange={(e) => handleFormUpdate(1, e.target.value)}
                  error={formData[1].error}
                  className={"gx-w-100"}
                />
              </div>

              <div className="gx-w-100 gx-flex-row mt-4">
                <Input
                  label={"Street"}
                  value={formData[2].value}
                  required={true}
                  onChange={(e) => handleFormUpdate(2, e.target.value)}
                  error={formData[2].error}
                  className={"gx-w-100"}
                />
              </div>

              <div className="gx-w-100 gx-flex-row gx-justify-content-center gx-mt-4">
                <Button
                  className="gx-btn-outline-info gx-px-4"
                  onClick={() => handleModalShow()}
                  disabled={isModalShow && isModalShow.isLoadingPromise}
                >
                  Cancel
                </Button>
                <Button
                  className="gx-btn-info gx-px-4"
                  loading={isModalShow && isModalShow.isLoadingPromise}
                  onClick={() => handleCreateData()}
                >
                  Create
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};
