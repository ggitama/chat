const { CmsLoader } = require("@/components/Cms")
const { CmsDivRow, CmsInput, CmsSelect } = require("@/components/Cms/Form")

export const ModalResetPasswordContent = ({
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
    newPassword:inputNewPassword,
    confirmPassword:inputConfirmPassword,
  } = formData

  if(!inputNewPassword) return null

  return (
    <>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputNewPassword}
          onChange={(e)=>{
            handler.handleFormUpdate("newPassword",e)
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