import { CmsUpload } from "@/components/Cms/Form/Upload"

const { CmsLoader } = require("@/components/Cms")
const { CmsDivRow, CmsInput, CmsSelect } = require("@/components/Cms/Form")

export const ModalCreateContent = ({
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
    name:inputName,
    codes:inputCodes,
    logo:inputLogo
  } = formData

  return (
    <>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputName}
          onChange={(e)=>{
            handler.handleFormUpdate("name",e.target.value)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputCodes}
          onChange={(e)=>{
            handler.handleFormUpdate("codes",e.target.value)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsUpload className={"gx-w-100"}
          {...inputLogo}
          name={"logo"}
          formUpdate={handler}
          action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
        />
      </CmsDivRow>
      {/* <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputPhoneNumber}
        />
      </CmsDivRow> */}    
    </>
  )
}