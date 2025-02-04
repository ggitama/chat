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
    uuid:inputUuid,
    email:inputEmail,
    phoneNumber:inputPhoneNumber,
    title:inputTitle,
    firstName:inputFirstName,
    lastName:inputLastName,
    address:inputAddress,
    dob:inputDob,
    age:inputAge,
    createdAt:inputCreatedAt,
  } = formData
  console.log(formData)

  return (
    <>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputUuid}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputEmail}
        />
      </CmsDivRow>
      {/* <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputPhoneNumber}
        />
      </CmsDivRow>  */}
      <CmsDivRow>
        <CmsSelect className={"gx-w-100"}
          {...inputTitle}
          onChange={(e)=>{
            handler.handleFormUpdate("title",e)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputFirstName}
        />
      </CmsDivRow> 
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputLastName}
        />
      </CmsDivRow>

      {/* 
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputAddress}
        />
      </CmsDivRow> 
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputDob}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputAge}
        />
      </CmsDivRow>
      */}
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputCreatedAt}
        />
      </CmsDivRow>
    </>
  )
}