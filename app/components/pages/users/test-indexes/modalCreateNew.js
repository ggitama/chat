import { Button, Modal, Select } from "antd";
import { blue } from "@ant-design/colors";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
import { handleFetchTourDetail } from "app/api/helper";

export const ModalCreateNew = ({props}) => {
  const [
    {isModalCreateShown,isOnLoading},
    {setIsModalCreateShown,setIsOnLoading},
    {handlerNewSubmit}
  ] = props

  // const data = isModalEditShown?.data
  const modalTitle = `Create User` 
  const contentTitle = modalTitle
  
  const [formData, setFormData] = useState({
    email:{
      value: "",
      type: "Input",
      label:"Email",
      required: true,
      error: "",
    },
    role:{
      value: "",
      type: "Select",
      label:"Role",
      options:[
        { value:"",label:"Please Select"},
        { value:"admin",label:"Admin"},
        { value:"user",label:"User"},
        { value:"superadmin",label:"Superadmin"}
      ],
      required: true,
      error: "",
    },
    password:{
      value: "",
      validationType:"alphanumeric",
      type: "Input",
      label:"Password",
      required: true,
      error: "",
    },
    confirmPassword:{
      value: "",
      type: "Input",
      validationType:"alphanumeric",
      label:"Confirm Password",
      required: true,
      error: "",
    },
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
        let validationType = tempDataForm[index].validationType
        if (validationType && formFieldValidation(validationType, value)) {
          tempDataForm[index].value = value;
        }else if(!validationType){
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

  const handleConfirmPasswordMatch = (index, value) => {
    const tempDataForm = {...formData};

    const confirmInput = tempDataForm[index]
    let validationType = confirmInput.validationType
    if (validationType && formFieldValidation(validationType, value)) {
      confirmInput.value = value;
    }else if(!validationType){
      confirmInput.value = value;
    }

    const passwordInput = tempDataForm.password
    tempDataForm[index].error = ""
    if(passwordInput && confirmInput && passwordInput.value!=value){
      tempDataForm[index].error = "missmatch"
    }

    setFormData({...tempDataForm});
  };

  const modalFooterProps = [
    {isModalCreateShown,formData},
    {setIsModalCreateShown},
    {handlerNewSubmit,handleClearFormData}
  ]

  const modalContentPropos = [
    {formData},
    {},
    {handleFormUpdate,handleConfirmPasswordMatch}
  ]

  // useEffect(()=>{
  //   if(isModalEditShown && isModalEditShown.isLoadingPromise==false){
  //     formData.role.value = data?.roleName
  //     setFormData({...formData})
  //   }
  // },[isModalEditShown])

  return (
    <Modal 
      open={isModalCreateShown} 
      title={(<ModalTitle title={modalTitle}/>)} 
      footer={(<ModalFooter props={[...modalFooterProps]}/>)} 
      closeIcon={true}
      >

      {isModalCreateShown && (
        <>
          {isOnLoading ? (
            <CircularProgress
              className={"gx-w-100"}
              customHeight={"300px"}
              text={"Loading Data"}
            />
          ) : (<ModalContent dataSource={isModalCreateShown.data} props={[...modalContentPropos]}/>)}
        </>
      )}
    </Modal>
  );
};

const ModalContent = ({dataSource,props})=>{
  const [
    {formData},
    {},
    {handleFormUpdate,handleConfirmPasswordMatch}
  ]=props


  return (
    <>
      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <Input
          className={"gx-w-100"}
          label="Email"
          required={formData.email.required}
          value={formData.email.value}
          onChange={(e)=>{
            return handleFormUpdate("email",e.target.value)
          }}
        />
      </div>
      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <label
          className="gx-fs-xs gx-mb-2"
        >
          {formData.role.label}
        </label>
        <div
          className={"gx-w-100"}
        >
          <Select
              style={{width:"100%"}}
              defaultValue=""
              required={formData.role.required}
              value={formData.role.value}
              options={[...formData.role.options]}
              onChange={(e)=>{
                return handleFormUpdate("role",e)
              }}
            />
        </div>
      </div>
      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <Input
          type={"password"}
          className={"gx-w-100"}
          label={formData.password.label}
          required={formData.password.required}
          value={formData.password.value}
          onChange={(e)=>{
            return handleFormUpdate("password",e.target.value)
          }}
        />
      </div>
      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <Input
          type={"password"}
          className={"gx-w-100"}
          label={formData.confirmPassword.label}
          required={formData.confirmPassword.required}
          value={formData.confirmPassword.value}
          error={formData.confirmPassword.error}
          onChange={(e)=>{
            return handleConfirmPasswordMatch("confirmPassword",e.target.value)
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
    {isModalCreateShown,formData},
    {setIsModalCreateShown},
    {handlerNewSubmit,handleClearFormData}
  ] = props
  
  const isModalOnPromise = (isModalCreateShown && isModalCreateShown.isLoadingPromise) ? true : false
  return (
    <>
      <Button 
        className="gx-btn-outline-primary"
        disabled={isModalOnPromise}
        onClick={()=>{
          setIsModalCreateShown(false)
          handleClearFormData()
        }}
      >
        Close
      </Button>

      <Button
        className="gx-btn-primary gx-px-4"
        loading={isModalOnPromise}
        onClick={() =>{
          handlerNewSubmit(formData,handleClearFormData)
          // handleClearFormData()
        }}
      >
        Create User
      </Button>
    </>
  )
}