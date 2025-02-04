import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { orange } from "@ant-design/colors";
export const ModalConfirmCreate = (props) => {
  const { isModalShow, handleModalShow, handleAction } = props;
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
            Are you sure to create this user ?
          </div>
          <div className="gx-w-100 gx-flex-row gx-justify-content-center gx-mt-4">
            <Button
              className={`gx-btn-outline-info`}
              onClick={() => handleModalShow()}
              disabled={isModalShow && isModalShow.isLoadingPromise}
            >
              No
            </Button>
            <Button
              className={`gx-btn-info`}
              loading={isModalShow && isModalShow.isLoadingPromise}
              onClick={() => handleAction()}
            >
              Yes
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
