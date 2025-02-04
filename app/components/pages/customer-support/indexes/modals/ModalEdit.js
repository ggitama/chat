import { CmsLoader } from "@/components/Cms";
import { CmsDivRow, CmsInput, CmsSelect } from "@/components/Cms/Form";
// import { Input } from "@/components/Form/input";
import { blue } from "@ant-design/colors";
import { Button, Modal, Select } from "antd"
import { useEffect } from "react";
import { useModalHooks } from "../hooks/modal-edit.hooks";

export const ModalEdit = ({
  props
})=>{
  const modalTitle = "Edit Config"
  const { state, dispatch,handler } = props
  const [
    {formData},
    {setFormData},
    modalHandler
  ] = useModalHooks(state,dispatch)

  return (
    <Modal
      open={state.IS_SHOW_MODAL_EDIT} 
      title={(<ModalTitle title={modalTitle}/>)} 
      footer={(
        <ModalFooter 
          formData={formData}
          props={{
            ...props,
            handler:{
              ...handler,
              ...modalHandler
            }
          }}
        />
      )} 
      closeIcon={true}
    >
      <ModalContent 
        formData={formData}
        props={{
          ...props,
          handler:{
            ...handler,
            ...modalHandler
          }
        }}
      />

    </Modal>
  ) 
}

const ModalContent = ({formData,props})=>{
  const {
    state,dispatch,
    handler
  }=props

  if(!state.IS_SHOW_MODAL_EDIT) return null
  if(state.IS_ON_LOADING){
    return (
      <CmsLoader title="Loading" customHeight={"300px"}/>
    )
  }

  let {
    name:inputName,
    description:inputDescription,
    value1:inputValue1,
    value2:inputValue2
  } = formData

  return (
    <>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputName}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputDescription}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputValue1}
          onChange={(e)=>{
            handler.handleFormUpdate("value1",e.target.value)
          }}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputValue2}
          onChange={(e)=>{
            handler.handleFormUpdate("value2",e.target.value)
          }}
        />
      </CmsDivRow>      
    </>
  )
}

const ModalFooter = ({formData,props})=>{
  const {state,dispatch,handler} = props
  
  const isModalOnPromise = ( state?.IS_SHOW_MODAL_EDIT 
    && state?.IS_SHOW_MODAL_EDIT?.isPromise
    ) ? true : false
  return (
    <>
      <Button 
        className="gx-btn-outline-primary"
        disabled={isModalOnPromise}
        onClick={()=>{
          dispatch({type:"IS_SHOW_MODAL_EDIT",data:false})
          handler.handleClearFormData()
        }}
      >
        Close
      </Button>

      <Button
        className="gx-btn-primary gx-px-4"
        loading={isModalOnPromise}
        onClick={() =>{
          handler.handleModalEditSubmit(formData,
            // passing callback so it's readble for the button action
            ()=>{
              handler.handleClearFormData()
            }
          )
        }}
      >
        Update Config
      </Button>
    </>
  )
}

const ModalTitle = ({title,content})=>{
  return (
    <>
      {title}
      <span style={{ color: blue[5] }}>
        {content}
      </span>
    </>
  )
}