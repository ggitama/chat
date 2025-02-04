import { Button, Modal, Select } from "antd";
import { blue } from "@ant-design/colors";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
import { handleFetchTourDetail } from "app/api/helper";

export const ModalEdit = ({props}) => {
  const [
    {isModalEditShown,isOnLoading},
    {setIsModalEditShown,setIsOnLoading,setIsModalResetPasswordShown},
    {handlerEditSubmit}
  ] = props

  const data = isModalEditShown?.data
  const modalTitle = `User` 
  const contentTitle = (isModalEditShown && data.email) ? `${data.email}` : ""
  
  const [formData, setFormData] = useState({
    role:{
      value: data && data?.roleName,
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

  const isModalOnPromise = (isModalEditShown && isModalEditShown.isLoadingPromise) ? true : false


  const modalFooterProps = [
    {isModalEditShown,formData},
    {setIsModalEditShown},
    {handlerEditSubmit,handleClearFormData}
  ]

  const modalContentPropos = [
    {formData,isModalOnPromise},
    {setIsModalResetPasswordShown},
    {handleFormUpdate}
  ]

  useEffect(()=>{
    if(isModalEditShown && isModalEditShown.isLoadingPromise==false){
      formData.role.value = data?.roleName
      setFormData({...formData})
    }
  },[isModalEditShown])

  return (
    <Modal 
      open={isModalEditShown} 
      title={(<ModalTitle title={modalTitle} content={contentTitle}/>)} 
      footer={(<ModalFooter props={[...modalFooterProps]}/>)} 
      closeIcon={true}
      >

      {isModalEditShown && (
        <>
          {isOnLoading ? (
            <CircularProgress
              className={"gx-w-100"}
              customHeight={"300px"}
              text={"Loading Data"}
            />
          ) : (<ModalContent dataSource={isModalEditShown.data} props={[...modalContentPropos]}/>)}
        </>
      )}
    </Modal>
  );
};

const ModalContent = ({dataSource,props})=>{
  const [
    {formData,isModalOnPromise},
    {setIsModalResetPasswordShown},
    {handleFormUpdate}
  ]=props


  return (
    <>
      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <Input
          className={"gx-w-100"}
          label="Email"
          disabled
          value={dataSource.email || ""}
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
              value={formData.role.value}
              options={[...formData.role.options]}
              onChange={(e)=>{
                return handleFormUpdate("role",e)
              }}
            />
        </div>
      </div>

      <div className={"gx-w-100 gx-flex gx-flex-row mt-4"}>
        <Button 
          className="gx-btn-outline-default btn-sm"
          disabled={isModalOnPromise}
          onClick={()=>{
            setIsModalResetPasswordShown({
              isLoadingPromise:false,
              data:dataSource
            })
          }}
        >
          Reset Password
        </Button>
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
    {isModalEditShown,formData},
    {setIsModalEditShown},
    {handlerEditSubmit,handleClearFormData}
  ] = props
  
  const isModalOnPromise = (isModalEditShown && isModalEditShown.isLoadingPromise) ? true : false
  return (
    <>
      <Button 
        className="gx-btn-outline-primary"
        disabled={isModalOnPromise}
        onClick={()=>{
          setIsModalEditShown(false)
        }}
      >
        Close
      </Button>

      <Button
        className="gx-btn-primary gx-px-4"
        loading={isModalOnPromise}
        onClick={() =>{
          handlerEditSubmit(formData)
          handleClearFormData()
        }}
      >
        Update
      </Button>
    </>
  )
}