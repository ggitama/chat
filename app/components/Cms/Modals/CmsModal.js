import ColorHelper from "@/util/cms/color.helper"
import { Button, Modal } from "antd"
import React from "react"

export const CmsModal = ({
  title="",
  hasTitleKey=false,
  stateKey,
  props,
  children,
  modalHooks,
  onClickClose,
  onClickConfirm,
  labelConfirm="Submit",
  labelClose="Close",
  width
})=>{
  const {
    state,dispatch,
    handler
  } = props

  let stateValue = state[stateKey]
  let loadedData = stateValue?.data || stateValue?.dataRow || {}
  let contentTitle = (hasTitleKey && loadedData) ? loadedData[hasTitleKey] : ""
  // dont render when not showing
  if(!stateValue) return null
  const [
    {formData:modalFormData},
    modalSetter,
    modalHandler
  ] = modalHooks(state,dispatch,stateKey)

  const propWithModalHandlers = {
    ...props,
    handler:{
      ...handler,
      ...modalHandler
    }
  }

  const handleClose = () => {
    dispatch({type:stateKey,data:false})
  }

  return (
    <Modal 
      open={stateValue} 
      title={(
        <CmsModalTitle title={title} content={contentTitle}/>
      )} 
      width={width}
      footer={(
        <CmsModalFooter
          stateKey={stateKey}
          labelClose={labelClose}
          onClickClose={onClickClose}
          labelConfirm={labelConfirm}
          onClickConfirm={onClickConfirm}
          props={propWithModalHandlers}
          formData={modalFormData}
        />
      )} 
      onCancel={handleClose}
      >
      {
        // append props for view content
        React.Children.map(children,(child)=>{
          return React.cloneElement(child,{
            props:propWithModalHandlers,
            formData:modalFormData,
            stateKey
          })
        })
      }
    </Modal>
  )
}

export const CmsModalTitle = ({
  title,content
})=>{

  let titleContent = content && typeof content=="string" && (
    <>
      <span> - </span>
      <span style={{ 
        color: ColorHelper.blue(),
        marginLeft:"5px"
      }}>
        {content}
      </span>
    </>
  )

  return (
    <>
      {title}{titleContent}
    </>
  )
}

const CmsModalFooter = ({
  stateKey,
  formData,
  props,
  onClickClose,
  onClickConfirm,
  labelConfirm="Submit",
  labelClose="Close"
})=>{
  const {state,dispatch,handler:footerHandler} = props
  
  let stateValue = state[stateKey]
  let isModalOnPromise = ( stateValue && stateValue.isPromise ) ? true : false

  return (
    <>
      {(labelClose && 
        <Button 
          className="gx-btn-outline-primary"
          disabled={isModalOnPromise}
          onClick={()=>{
            dispatch({type:stateKey,data:false})
            if(onClickClose && typeof onClickClose =="function") onClickClose(footerHandler)
          }}
        >
            {labelClose}
        </Button>
      )}
      {(labelConfirm && 
        <Button
          className="gx-btn-primary gx-px-4"
          loading={isModalOnPromise}
          onClick={() =>{
            if(onClickConfirm && typeof onClickConfirm =="function") onClickConfirm(formData,footerHandler)
          }}
        >
          {labelConfirm}
        </Button>      
      )}
    </>
  )
}