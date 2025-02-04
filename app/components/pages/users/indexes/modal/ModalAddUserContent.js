const { CmsLoader } = require("@/components/Cms")
const { CmsDivRow, CmsInput, CmsSelect } = require("@/components/Cms/Form")

export const ModalAddUserContent = ({
  formData,props,
  stateKey
})=>{
  const {
    state,
    dispatch,
    handler
  }=props

  if(!state[stateKey]) return null
  if(state.IS_ON_LOADING){
    return (
      <CmsLoader title="Loading" customHeight={"300px"}/>
    )
  }

  let {
    email:inputEmail,
    role:inputRole,
    password:inputPassword,
    confirmPassword:inputConfirmPassword
  } = formData

  if(!inputEmail) return null

  return (
    <>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputEmail}
          onChange={(e)=>{
            handler.handleFormUpdate("email",e)
          }}
        />
      </CmsDivRow>     
      <CmsDivRow>
        <CmsSelect className={"gx-w-100"}
          {...inputRole}
          options={state.INIT_ROLES}
          onChange={(e)=>{
            handler.handleFormUpdate("role",e)
          }}
        />
      </CmsDivRow>    
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputPassword}
          onChange={(e)=>{
            handler.handleFormUpdate("password",e)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputConfirmPassword}
          onChange={(e)=>{
            handler.handleFormUpdate("confirmPassword",e)
          }}
        />
      </CmsDivRow>      
    </>
  )
}