import { CmsLoader } from "@/components/Cms";
import { CmsDivRow, CmsInput, CmsSelect } from "@/components/Cms/Form";
import { Input } from "@/components/Form/input";
import { blue } from "@ant-design/colors";
import { Button, Modal, Select } from "antd"
import { useEffect } from "react";
import { useModalCreateHooks } from "../hooks/modal-create.hooks";

export const ModalCreate = ({
  props
})=>{
  const modalTitle = "Create User"
  const { state, dispatch,handler } = props
  const [
    {formData},
    {setFormData},
    {
      handleClearFormData,
      handleFormUpdate,
      handleConfirmPasswordMatch
    }
  ] = useModalCreateHooks(state,dispatch)

  return (
    <Modal
      open={state.IS_SHOW_MODAL_CREATE} 
      title={(<ModalTitle title={modalTitle}/>)} 
      footer={(
        <ModalFooter 
          formData={formData}
          props={{
            ...props,
            handler:{
              handleClearFormData,
              handlerNewSubmit:handler.handlerNewSubmit
            }
          }}
        />
      )} 
      closeIcon={true}
    >
      {
        state.IS_SHOW_MODAL_CREATE && (
          <>
          { state.IS_ON_LOADING ? (
            <CmsLoader title="Loading" customHeight={"300px"}/>
            ) : (
              <ModalContent 
                formData={formData}
                dataSource={state.IS_SHOW_MODAL_CREATE.data}
                props={{
                  ...props,
                  handler:{
                    handleFormUpdate,
                    handleConfirmPasswordMatch
                  }
                }}
              />
            )
          }
         </>
        )
      }
    </Modal>
  ) 
}

const ModalContent = ({formData,props})=>{
  const {
    state,dispatch,
    handler
  }=props

  return (
    <>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          label="Email"
          required={formData.email.required}
          value={formData.email.value}
          onChange={(e)=>{
            handler.handleFormUpdate("email",e.target.value)
          }}
        />
      </CmsDivRow>
      
      <CmsDivRow>
        <CmsSelect
          label={formData.role.label}
          style={{width:"100%"}}
          defaultValue=""
          required={formData.role.required}
          value={formData.role.value}
          options={[...formData.role.options]}
          onChange={(e)=>{
            handler.handleFormUpdate("role",e)
          }}
        />
      </CmsDivRow>

      <div className={"gx-w-100 gx-flex gx-flex-row"}>
        <Input
          className={"gx-w-100"}
          label="Email"
          required={formData.email.required}
          value={formData.email.value}
          onChange={(e)=>{
            handler.handleFormUpdate("email",e.target.value)
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
                handler.handleFormUpdate("role",e)
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
            handler.handleFormUpdate("password",e.target.value)
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
            handler.handleConfirmPasswordMatch("confirmPassword",e.target.value)
          }}
        />
      </div>
    </>
  )
}

const ModalFooter = ({formData,props})=>{
  const {state,dispatch,handler} = props
  
  console.log(state?.IS_SHOW_MODAL_CREATE)
  const isModalOnPromise = ( state?.IS_SHOW_MODAL_CREATE 
    && state?.IS_SHOW_MODAL_CREATE?.isPromise
    ) ? true : false
  return (
    <>
      <Button 
        className="gx-btn-outline-primary"
        disabled={isModalOnPromise}
        onClick={()=>{
          dispatch({type:"IS_SHOW_MODAL_CREATE",data:false})
          handler.handleClearFormData()
        }}
      >
        Close
      </Button>

      <Button
        className="gx-btn-primary gx-px-4"
        loading={isModalOnPromise}
        onClick={() =>{
          handler.handlerNewSubmit(formData,handler.handleClearFormData)
        }}
      >
        Create User
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