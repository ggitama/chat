import { CmsTextArea } from "@/components/Cms/Form/Textarea"

const { CmsLoader } = require("@/components/Cms")
const { CmsDivRow, CmsInput } = require("@/components/Cms/Form")

export const ModalViewContent = ({
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
    eventType:inputEventType,
    eventName:inputEventName,
    eventDescription:inputEventDescription,
    eventDate:inputEventDate,
    objectName:inputObjectName,
    objectId:inputObjectId,
    userId:inputUserId
  } = formData

  return (
    <>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputEventType}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputEventName}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsTextArea
          className={"gx-w-100"}
          resizeable={false}
          {...inputEventDescription}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputEventDate}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputObjectName}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputObjectId}
        />
      </CmsDivRow>

      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputUserId}
        />
      </CmsDivRow>         
    </>
  )
}