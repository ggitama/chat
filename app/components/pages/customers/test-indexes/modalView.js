import { Button, Modal } from "antd";
import { blue } from "@ant-design/colors";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
import { handleFetchTourDetail } from "app/api/helper";

export const ModalView = ({props}) => {
  const [
    {isModalViewShown,isOnLoading},
    {setIsModalViewShown}
  ] = props

  const data = isModalViewShown?.data
  const modalTitle = `Customer` 
  const contentTitle = (isModalViewShown && data.firstName) ? `${data?.firstName} ${data?.lastName}` : ""
  
  const modalFooterProps = [
    {},
    {setIsModalViewShown}
  ]
  return (
    <Modal 
      open={isModalViewShown} 
      title={(<ModalTitle title={modalTitle} content={contentTitle}/>)} 
      footer={(<ModalFooter props={[...modalFooterProps]}/>)} 
      closeIcon={true}
      >

      {isModalViewShown && (
        <>
          {isOnLoading ? (
            <CircularProgress
              className={"gx-w-100"}
              customHeight={"300px"}
              text={"Loading Data"}
            />
          ) : (<ModalContent dataSource={isModalViewShown.data}/>)}
        </>
      )}
    </Modal>
  );
};

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
    {},
    {setIsModalViewShown}
  ] = props
  return (
    <>
      <Button 
        className="gx-btn-outline-primary"
        onClick={()=>{
          setIsModalViewShown(false)
        }}
      >
        Close
      </Button>
    </>
  )
}

const ModalContent = ({dataSource})=>{
  const contentForm = [
    {key:"title",label:"Title"},
    {key:"firstName",label:"First Name"},
    {key:"lastName",label:"Last Name"},
    {key:"email",label:"Email"},
    // {key:"phoneNumber",label:"Phone Number"},
    // {key:"address",label:"Address"},
    // {key:"dob",label:"Date of birth"},
    // {key:"age",label:"Age"},
    {key:"createdAt",label:"CreatedAt"},
  ]

  return (
    <>
      <div className="gx-w-100 gx-flex gx-flex-row">
        {contentForm.map(contentRow=>{
          return (
            <Input
              className={"gx-w-100"}
              label={contentRow.label}
              disabled={true}
              value={dataSource[contentRow.key] || ""}
            />
          )
        })}
      </div>
    </>
  )
}