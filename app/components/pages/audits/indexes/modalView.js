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
  const modalTitle = `Audit Detail`
  const contentTitle = (isModalViewShown && data.email) ? `${data?.email}` : ""
  
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
  console.log(dataSource)
  const contentForm = [
    {key:"eventType",label:"Event Type"},
    {key:"eventName",label:"Event Name"},
    {key:"eventDescription",label:"Event Description" ,type:"textarea"},
    {key:"eventDateTime",label:"Event Date"},
    {key:"objectName",label:"Object Name"},
    {key:"objectId",label:"Object ID"},
    {key:"userId",label:"User ID"},
  ]

  return (
    <>
      <div className="gx-w-100 gx-flex gx-flex-row">
        {contentForm.map(contentRow=>{
          if(contentRow.type=="textarea"){
            return (
              <TextArea 
                className={"gx-w-100"}
                label={contentRow.label}
                disabled={true}
                value={dataSource[contentRow.key] || ""}
                />
            )
          }
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

const TextArea = (props)=>{
  const {
    label,
    value,
    disabled,
    required,
    className,
    onChange,
    action,
    ref,
    error,
    placeholder
  } = props;
  const id =
    "check " + label
      ? label + (Math.random() + Math.random()).toString()
      : "field" + (Math.random() + Math.random()).toString();

  return (
    <div className={`gx-flex gx-flex-column gx-w-100`}>
      {label && (
        <label
          className="gx-fs-xs gx-mb-2"
          htmlFor={id}
        >
          {label} {required && <span className="text-red-200-color">*</span>}
        </label>
      )}

      
      <textarea
        className={`ant-input ${className}`}
        id={id}
        type="textarea"
        disabled={disabled}
        value={value}
        onChange={onChange}
        action={action}
        placeholder={placeholder ? placeholder : ""}
        style={{resize:"none"}}
      ></textarea>
      <div className="gx-fs-xs text-red-200-color gx-mt-1">
        {error && label + " " + error}
      </div>
    </div>
  )
}