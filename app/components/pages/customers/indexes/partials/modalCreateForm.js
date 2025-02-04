import { Button, Modal } from "antd";
import { blue } from "@ant-design/colors";
import { useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";

export const CardExtraModalCreate = ({
  setIsModalCreateFormShow
})=>{
  return (
    <>
      <button
        type="button"
        className="ant-btn ant-btn-primary gx-my-4"
        onClick={() =>
          setIsModalCreateFormShow({
            isLoadingPromise: false,
          })
        }
      >
        <span> Create New Data </span>
      </button>
    </>
  )
}

export const ModalCreateForm = ({
  isModalShow
}) => {
  console.log(isModalShow,"modal create")

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
        </>
      )}
    </Modal>
  );
};
