import NumberHelper from "@/util/cms/number.helper";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
import { CmsErrorLabel } from "./ErrorLabel"
import { CmsFormLabel } from "./Label"

export const CmsUpload = (props)=>{

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [formImageUrl, setFormImageUrl] = useState();

  let {
    label,
    value,
    disabled,
    state,
    required,
    className,
    listType,
    onChange,
    action,
    ref,
    error,
    dimension,
    placeholder,
    name,
    formUpdate,
  } = props;

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

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!', 5);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be less than 2MB!', 5);
    }

    let isDimensionValid = true
    if(dimension && dimension.validate){
      isDimensionValid = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.addEventListener('load', event => {
          const _loadedImageUrl = event.target?.result
          const image = document.createElement('img')
          image.src = String(_loadedImageUrl)

          image.addEventListener('load', () => {
            const { width, height } = image
            
            isDimensionValid = width > dimension['width'] && height > dimension['height']
            if(!isDimensionValid){
              message.error(`Dimension must be equal or greater than ${dimension.width} x ${dimension.height} pixels`, 5)
              resolve(false)
            }
            resolve(true)
          })
        })
      })
    }
    return isJpgOrPng && isLt2M && isDimensionValid;
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
      });
    }
  };

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
      setFormImageUrl(res.data.responseData.encryptedString)
      formUpdate.handleFormUpdate(name, res.data.responseData.encryptedString)
    }).catch((err) => {
      console.log(err)
      setLoading(false);
      message.error(`Failed upload image ${label} to server, please try again`, 5)
    }) 
  }

  let checkLabel = "check "+ label
  let randomId = NumberHelper.randomId() 
  let idLabel = checkLabel ? label : "field"
  let help = 'Allowed image type JPEG and PNG, image size max 2MB'
  help = dimension ? `${help}, min. dimension ${dimension.width} x ${dimension.height}.` : `${help}.`
  className = 'avatar-uploader'
  listType = 'picture-card'
  idLabel = `${idLabel} ${randomId}`

  useEffect(() => {
    if(value && typeof value === 'string'){
      setImageUrl(value)
    }
  },[value])

  return (
    <CmsFormLabel 
      label={label}
      id={idLabel}
      required={required}
      >

        <Upload
            name={name}
            listType={listType}
            className={className}
            showUploadList={false}
            customRequest={customRequest}
            action={action}
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
      {help && ( <div class="ant-form-item-extra">{help}</div> ) }
      <CmsErrorLabel error={error} label={label}/>
    </CmsFormLabel>
  )

}