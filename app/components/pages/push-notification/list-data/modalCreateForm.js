import { Button, Modal, message, Upload, DatePicker, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
import { handleVouchersList, handleResourceUpload } from "app/api/helper";
import TextArea from "antd/lib/input/TextArea";


import Axios from "axios";
import moment from "moment";
import { modalCreateScheme } from "./bannerScheme";
export const ModalCreateForm = (props) => {
  const { isModalShow, handleModalShow, handleCreateData } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [imageUrlParam, setImageUrlParam] = useState();
  const [voucherList, setVoucherList] = useState([{ value: "", label: "Choose Product Type First"}])
  
  // image component handling start
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
        let temp = {...imageUrl}

        temp[imageUrlParam] = url
        setImageUrl(temp)
        // imageUrl[imageUrlParam] = url;
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

    setImageUrlParam(options.filename)
    Axios.post(options.action, data, config).then((res) => {
      options.onSuccess(res.data, options.file)
      handleFormUpdate(options.filename, res.data.responseData.encryptedString)
    }).catch((err) => {
      console.log(err)
    }) 
  }
  // image component handling end

  useEffect(() => {
    if (isModalShow && !isModalShow.isLoadingPromise) {
      setFormData(modalCreateScheme(voucherList));
      setImageUrl({
        homeImageUrl: "",
        detailsImageUrl: ""
      });
      setIsLoading(false);
    }
  }, [isModalShow]);
  const handleFormUpdate = (index, value) => {
    const tempDataForm = {...formData};

    switch (tempDataForm[index].type) {
      case "Select":
        if (formFieldValidation(tempDataForm[index].validationType, value)) {
          tempDataForm[index].value = value;
        }
        if(index == 'productType'){
          handleGetVoucherList(value)
        }
        break;
      case "Upload":
        tempDataForm[index].value = value
      default:
        if (formFieldValidation(tempDataForm[index].validationType, value)) {
          tempDataForm[index].value = value;
        }
        break;
    }

    setFormData({...tempDataForm});
  };

  const handleGetVoucherList = async(productType) => {
    const { result, error } = await handleVouchersList({productType: productType});
    let temp = [
      { value: "", label: "Please Select"}
    ]
    result.responseData.map((rowData, index) => {
      temp.push({ value: rowData.id, label: rowData.promoName})
    })

    let tempForm = {...formData};

    tempForm.promoId.options = temp
    tempForm.promoId.value = ""
    setFormData(tempForm)
    setVoucherList(temp)
  }

  const buildForm = async() => {
    let dataForm = {}
    let imageUpload = []
    Object.keys(formData).map(async(formKey)=>{
       if(formData[formKey].type == 'Date'){
        let date = typeof formData[formKey].value == 'string' ? formData[formKey].value : formData[formKey].value.format('DD-MM-YYYY')
        dataForm[formKey] = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
      }else if(formData[formKey].type == 'Upload'){
        imageUpload.push({
          key: formKey,
          value: formData[formKey].value
        })
      }else{
        dataForm[formKey] = formData[formKey].value
      }
    })
    
    for(let i = 0; i < imageUpload.length; i++){
      dataForm[imageUpload[i].key] = await handleUploadImage(imageUpload[i].value)
    }

    handleModalShow.data = dataForm
    handleCreateData(dataForm)
  }

  const handleUploadImage = async(data) => {
    let payload = {
      data: data,
      path: 'banner'
    }
    const { result, error } = await handleResourceUpload(payload);

    return result.responseData.path;
  }

  
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
                <label className="gx-fs-m gx-mb-2">
                  {formData.productType.label} {formData.productType.required && <span className="text-red-200-color">*</span>}
                </label>
                <Select
                  style={{width:"100%"}}
                  defaultValue=""
                  required={formData.productType.required}
                  value={formData.productType.value}
                  options={[...formData.productType.options]}
                  onChange={(e)=>{
                    return handleFormUpdate("productType",e)
                  }}
                />
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <React.Fragment>
                  {renderInput(formData, handleFormUpdate, 'title')}
                </React.Fragment>
              </div>
              <div className="gx-w-100 gx-flex-row mt-4">
                <React.Fragment>
                  {renderInput(formData, handleFormUpdate, 'subtitle')}
                </React.Fragment>
              </div>
              <div className="gx-w-100 gx-flex-row mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.homeImageUrl.label} {formData.homeImageUrl.required && <span className="text-red-200-color">*</span>}
                </label>
                <Upload
                  name="homeImageUrl"
                  listType="picture-card"
                  className="homeImage-uploader"
                  showUploadList={false}
                  customRequest={customRequest}
                  action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl.homeImageUrl ? (
                    <img
                      src={imageUrl.homeImageUrl}
                      alt="homeImageUrl"
                      style={{
                        width: '100%',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div className="gx-w-100 gx-flex-row mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.detailsImageUrl.label} {formData.detailsImageUrl.required && <span className="text-red-200-color">*</span>}
                </label>
                <Upload
                  name="detailsImageUrl"
                  listType="picture-card"
                  className="detailsImageUrl-uploader"
                  showUploadList={false}
                  customRequest={customRequest}
                  action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl.detailsImageUrl ? (
                    <img
                      src={imageUrl.detailsImageUrl}
                      alt="detailsImageUrl"
                      style={{
                        width: '100%',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.startDate.label} {formData.startDate.required && <span className="text-red-200-color">*</span>}
                </label>
                <DatePicker 
                  style={{ width: '100%' }}
                  required={true}
                  format="DD-MM-YYYY"
                  onChange={ (date, dateString) => {
                      handleFormUpdate('startDate', dateString);
                    } 
                  } 
                />
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.endDate.label} {formData.endDate.required && <span className="text-red-200-color">*</span>}
                </label>
                <DatePicker 
                  style={{ width: '100%' }}
                  required={true}
                  format="DD-MM-YYYY"
                  onChange={ (date, dateString) => {
                      handleFormUpdate('endDate', dateString);
                    } 
                  } 
                />
              </div>

              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.promoId.label} {formData.promoId.required && <span className="text-red-200-color">*</span>}
                </label>
                <Select
                  style={{width:"100%"}}
                  defaultValue=""
                  required={formData.promoId.required}
                  value={formData.promoId.value}
                  options={[...formData.promoId.options]}
                  onChange={(e)=>{
                    return handleFormUpdate("promoId",e)
                  }}
                />
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.tnc.label} {formData.tnc.required && <span className="text-red-200-color">*</span>}
                </label>
                <TextArea
                  label={formData.tnc.label}
                  value={formData.tnc.value}
                  required={true}
                  onChange={(e) => { 
                    return handleFormUpdate('tnc', e.target.value)}}
                  error={formData.tnc.error}
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
                  onClick={() => buildForm()}
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