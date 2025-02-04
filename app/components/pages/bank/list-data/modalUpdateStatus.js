import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { blue, orange } from "@ant-design/colors";
export const ModalUpdateStatus = (props) => {
  const { isModalShow, handleModalShow, handleActionStatus } = props;
  return (
    <Modal open={isModalShow} title={false} footer={false} closeIcon={true}>
      {isModalShow && (
        <>
          <div className="gx-w-100 gx-flex-row gx-justify-content-center">
            <ExclamationCircleFilled
              style={{ fontSize: "72px", color: orange[5] }}
            />
          </div>
          <div className="gx-fs-xl gx-font-wight-semi-bold gx-w-100 gx-text-center gx-mt-4">
            Are you sure to{" "}
            
             Delete {" "}
            bank -{" "}
            <span style={{ color: blue[5] }}>
              {isModalShow && isModalShow.data.name}
            </span>{" "}
            ?
          </div>
          <div className="gx-w-100 gx-flex-row gx-justify-content-center gx-mt-4">
            <Button
              className={`gx-btn-outline-${
                isModalShow &&
                (isModalShow.data.status === "Active" ? "danger" : "info")
              } gx-px-4`}
              onClick={() => handleModalShow()}
              disabled={isModalShow && isModalShow.isLoadingPromise}
            >
              No
            </Button>
            <Button
              className={`gx-btn-${
                isModalShow &&
                (isModalShow.data.status === "Active" ? "danger" : "info")
              } gx-px-4`}
              loading={isModalShow && isModalShow.isLoadingPromise}
              onClick={() => handleActionStatus()}
            >
              Yes
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
