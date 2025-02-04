const { CmsLoader } = require("@/components/Cms")
const { CmsDivRow, CmsInput, CmsSelect } = require("@/components/Cms/Form")

export const ModalEditContent = ({
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
    userRoleId:inputRoleId,
    email:inputEmail,
    // phoneNumber:inputPhoneNumber,
    role:inputRole
  } = formData

  if(!inputRoleId) return null

  return (
    <>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputRoleId}
        />
      </CmsDivRow>
      {/* <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputPhoneNumber}
        />
      </CmsDivRow> */}
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputEmail}
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
    </>
  )
}