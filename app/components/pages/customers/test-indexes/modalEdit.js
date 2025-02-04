import { Button, Modal } from "antd";
import { blue } from "@ant-design/colors";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
import { handleFetchTourDetail } from "app/api/helper";

export const ModalEdit = ({props}) => {
  const [
    {isModalEditShown,isOnLoading},
    {setIsModalEditShown,setIsOnLoading},
    {handlerEditSubmit}
  ] = props

  const data = isModalEditShown?.data
  const modalTitle = `Customer` 
  const contentTitle = (isModalEditShown && data.firstName) ? `${data?.firstName} ${data?.lastName}` : ""
  
  const [formData, setFormData] = useState({
    title:{
      value: data && data?.title,
      type: "Input",
      required: false,
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

      default:
        break;
    }

    setFormData({...tempDataForm});
  };

  const modalFooterProps = [
    {isModalEditShown,formData},
    {setIsModalEditShown},
    {handlerEditSubmit,handleClearFormData}
  ]

  const modalContentPropos = [
    {formData},
    {},
    {handleFormUpdate}
  ]

  useEffect(()=>{
    if(isModalEditShown && isModalEditShown.isLoadingPromise==false){
      formData.title.value = data?.title
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
    {formData},
    {},
    {handleFormUpdate}
  ]=props

  return (
    <>
      <div className="gx-w-100 gx-flex gx-flex-row">
        <Input
          className={"gx-w-100"}
          label="Email"
          disabled
          value={dataSource.email || ""}
        />
        <Input
          className={"gx-w-100"}
          label="Title"
          value={formData.title.value || ""}
          onChange={(e)=>{handleFormUpdate("title",e.target.value)}}
          erro={formData.title.error}
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
          handlerEditSubmit(formData)
          handleClearFormData()
        }}
      >
        Update
      </Button>
    </>
  )
}