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
  const modalTitle = `Customer Support Config` 
  const contentTitle = (isModalEditShown && data.email) ? `${data.email}` : ""
  
  const [formData, setFormData] = useState({
    value1:{
      value: "",
      type: "Input",
      label:"Value 1",
      required: true,
      error: "",
    },
    value2:{
      value: "",
      type: "Input",
      label:"Value 2",
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
      formData.value1.value = data?.value1
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
          label="Config Name"
          disabled
          value={dataSource.name || ""}
        />
      </div>
      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <Input
          className={"gx-w-100"}
          label="Description"
          disabled
          value={dataSource.description || ""}
        />
      </div>
      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <Input
            className={"gx-w-100"}
            label={formData?.value1?.label}
            value={formData?.value1?.value || ""}
            onChange={(e)=>{
              return handleFormUpdate("value1",e.target.value)
            }}
          />
        <Input
            className={"gx-w-100"}
            label={formData?.value2?.label}
            value={formData?.value2?.value || ""}
            onChange={(e)=>{
              return handleFormUpdate("value2",e.target.value)
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
          handlerEditSubmit(formData,handleClearFormData)
        }}
      >
        Update
      </Button>
    </>
  )
}