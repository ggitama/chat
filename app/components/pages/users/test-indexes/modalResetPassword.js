import { Button, Modal, Select } from "antd";
import { blue } from "@ant-design/colors";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
import { handleFetchTourDetail } from "app/api/helper";

export const ModalResetPassword = ({props}) => {
  const [
    {isModalResetPasswordShown,isOnLoading},
    {setIsModalResetPasswordShown,setIsOnLoading},
    {handlerResetSubmit}
  ] = props

  const data = isModalResetPasswordShown?.data
  const modalTitle = `Reset Password` 
  // const contentTitle = (isModalResetPasswordShown && data.email) ? `${data.email}` : ""
  
  const [formData, setFormData] = useState({
    userRoleId:{
      value: "",
      type: "Input",
    },
    newPassword:{
      value: "",
      type: "Input",
      label:"New Password",
      required: true,
      error: "",
    }
  });

  const handleClearFormData = ()=>{
    Object.keys(formData).map(formKey=>{
      formData[formKey].value=""
      return formKey
    })
    setFormData({...formData})
  }

  const handleFormUpdate = (index, value) => {
    const tempDataForm = {...formData};
    switch (tempDataForm[index].type) {
      case "Input":
        if (formFieldValidation(tempDataForm[index].validationType, value)) {
          tempDataForm[index].value = value;
        }
        break;
    case "Select":
        tempDataForm[index].value = value;
      break;        

      default:
        break;
    }

    setFormData({...tempDataForm});
  };

  const isModalOnPromise = (isModalResetPasswordShown && isModalResetPasswordShown.isLoadingPromise) ? true : false


  const modalFooterProps = [
    {isModalResetPasswordShown,formData},
    {setIsModalResetPasswordShown},
    {handlerResetSubmit,handleClearFormData}
  ]

  const modalContentPropos = [
    {formData,isModalOnPromise},
    {},
    {handleFormUpdate}
  ]

  useEffect(()=>{
    if(isModalResetPasswordShown && isModalResetPasswordShown.isLoadingPromise==false){
      formData.userRoleId.value = data?.userRoleId
      setFormData({...formData})
    }
  },[isModalResetPasswordShown])

  return (
    <Modal 
      open={isModalResetPasswordShown} 
      title={(<ModalTitle title={modalTitle}/>)} 
      footer={(<ModalFooter props={[...modalFooterProps]}/>)} 
      closeIcon={true}
      >

      {isModalResetPasswordShown && (
        <>
          {isOnLoading ? (
            <CircularProgress
              className={"gx-w-100"}
              customHeight={"300px"}
              text={"Loading Data"}
            />
          ) : (<ModalContent dataSource={isModalResetPasswordShown.data} props={[...modalContentPropos]}/>)}
        </>
      )}
    </Modal>
  );
};

const ModalContent = ({dataSource,props})=>{
  const [
    {formData,isModalOnPromise},
    {},
    {handleFormUpdate}
  ]=props


  return (
    <>
      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <Input
          className={"gx-w-100"}
          label={formData.newPassword.label}
          value={formData.newPassword.value || ""}
          onChange={(e)=>{
            return handleFormUpdate("newPassword",e.target.value)
          }}
        />
      </div>
    </>
  )
}

const ModalTitle = ({title,content})=>{
  return (
    <>
      {title} -{" "}
      <span style={{ color: blue[5] }}>
        {content}
      </span>{" "}
    </>
  )
}

const ModalFooter = ({props})=>{
  const [
    {isModalResetPasswordShown,formData},
    {setIsModalResetPasswordShown},
    {handlerResetSubmit,handleClearFormData}
  ] = props
  
  const isModalOnPromise = (isModalResetPasswordShown && isModalResetPasswordShown.isLoadingPromise) ? true : false
  return (
    <>
      <Button 
        className="gx-btn-outline-primary"
        disabled={isModalOnPromise}
        onClick={()=>{
          setIsModalResetPasswordShown(false)
          handleClearFormData()
        }}
      >
        Close
      </Button>

      <Button
        className="gx-btn-primary gx-px-4"
        loading={isModalOnPromise}
        onClick={() =>{
          handlerResetSubmit(formData,handleClearFormData)
        }}
      >
        Reset
      </Button>
    </>
  )
}