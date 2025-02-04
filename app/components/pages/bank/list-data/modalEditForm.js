import { Button, Modal, message, Upload } from "antd";
import { blue} from "@ant-design/colors";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
import Axios from "axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
export const ModalEditForm = (props) => {
  const { isModalShow, handleModalShow, handleEditData } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [formImageLink, setFormImageLink] = useState();

  // Image Handling start
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        // handleFormUpdate('logo', formImageLink);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const customRequest = (options) => {
    const data= new FormData()
    data.append('file', options.file)
    const config= {
      "headers": {
        "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
      }
    }
    Axios.post(options.action, data, config).then((res) => {
      options.onSuccess(res.data, options.file)
      setFormImageLink(res.data.responseData.encryptedString)
      handleFormUpdate('logo', res.data.responseData.encryptedString)
    }).catch((err) => {
      console.log(err)
    }) 
  }
  // Image Handling End

  const handleFormUpdate = (index, value) => {
    const tempDataForm = {...formData};
    switch (tempDataForm[index].type) {
      case "Input":
        if (formFieldValidation(tempDataForm[index].validationType, value)) {
          tempDataForm[index].value = value;
        }
        break;
      case "Upload":
        tempDataForm[index].value = value
        break;
      default:
        break;
    }

    setFormData({...tempDataForm});
  };

  const handleGetDetailData = useCallback(async () => {
    const updateDataForm = {
      name: {
        label: "Name",
        value: isModalShow.data.name,
        type: "Input",
        required: true,
        error: "",
      },
      codes: {
        label: "Source",
        value: isModalShow.data.codes,
        type: "Input",
      },
      logo: {
        lable: "Logo",
        value: isModalShow.data.logo,
        type: "Upload",
      },
      uuid: {
        label: "uuid",
        value: isModalShow.data.uuid,
        type: "hidden",
      }
    };
    setIsLoading(false);
    setFormData(updateDataForm);
    setImageUrl(isModalShow.data.logo)
  }, [isModalShow]);

  const handleUpdateData = () => {

    let dataForm = {}
    Object.keys(formData).map(formKey=>{
        dataForm[formKey] = formData[formKey].value
    })

    // formData.map((rowData, index) => {
    //   isModalShow.data[rowData.name] = rowData.value
    // })
    
    handleEditData(dataForm)
  }
  useEffect(() => {
    if (isModalShow && !isModalShow.isLoadingPromise) {
      setIsLoading(true);
      handleGetDetailData();
    }
  }, [handleGetDetailData]);
  return (
    <Modal open={isModalShow} title={false} footer={false} closeIcon={true}>
      {isModalShow && (
        <>
          <div className="gx-fs-xl gx-font-wight-semi-bold gx-w-100 gx-text-center gx-mt-4">
            Edit bank -{" "}
            <span style={{ color: blue[5] }}>
              {isModalShow && isModalShow.data.name}
            </span>{" "}
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
                <React.Fragment>
                  {renderInput(formData, handleFormUpdate, 'name')}
                </React.Fragment>
              </div>

              <div className="gx-w-100 gx-flex-row mt-4">
                <React.Fragment>
                  {renderInput(formData, handleFormUpdate, 'codes')}
                </React.Fragment>
              </div>

              <div className="gx-w-100 gx-flex-row mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.logo.label} {formData.logo.required && <span className="text-red-200-color">*</span>}
                </label>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  customRequest={customRequest}
                  action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      crossOrigin="true"
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: '100%',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
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
                  onClick={() => handleUpdateData()}
                >
                  Update
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

const renderInput = (formData, handleFormUpdate, index) => {
  return (
    <Input
      label={formData[index].label}
      value={formData[index].value}
      required={true}
      onChange={(e) => { return handleFormUpdate(index, e.target.value)}}
      error={formData[index].error}
      className={"gx-w-100"}
    />
  )
}
