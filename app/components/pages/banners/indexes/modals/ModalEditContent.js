import { CmsDate } from "@/components/Cms/Form/Date"
import { CmsSwitch } from "@/components/Cms/Form/Switch"
import { CmsTextArea } from "@/components/Cms/Form/Textarea"
import { CmsUpload } from "@/components/Cms/Form/Upload"
import { CmsTextEditor } from "@/components/Cms/Form/TextEditor"

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
    title:inputTitle,
    subtitle:inputSubtitle,
    status:inputStatus,
    tnc:inputTnc,
    productType:inputProductType,
    urlLink:inputUrlLink,
    urlType:inputUrlType,
    urlTarget:inputUrlTarget,
    promoId:inputPromoId,
    homeImageUrl:inputHomeImageUrl,
    detailsImageUrl:inputDetailsImageUrl,
    mobileImageUrl:inputMobileImageUrl,
    startDate:inputStartDate,
    endDate:inputEndDate,
    sortOrder:inputSortOrder,
    description:inputDescription,
    descriptionHTML:inputDescriptionHTML,
  } = formData

  return (
    <>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputTitle}
          onChange={(e)=>{
            handler.handleFormUpdate("title",e.target.value)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputSubtitle}
          onChange={(e)=>{
            handler.handleFormUpdate("subtitle",e.target.value)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSwitch className={"gx-w-100"}
          {...inputStatus}
          style={{width: "80px"}}
          checkedChildren={"Active"}
          unCheckedChildren={"Inactive"}
          onChange={(e)=>{
            handler.handleFormUpdate("status",e)
          }}
          required={false}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputUrlType}
          onChange={(e)=>{
            handler.handleFormUpdate("urlType",e)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputProductType}
          onChange={(e)=>{
            handler.handleFormUpdate("productType",e)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputPromoId}
          onChange={(e)=>{
            handler.handleFormUpdate("promoId",e)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputUrlLink}
          onChange={(e)=>{
            handler.handleFormUpdate("urlLink",e.target.value)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputUrlTarget}
          onChange={(e)=>{
            handler.handleFormUpdate("urlTarget",e)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsUpload className={"gx-w-100"}
          {...inputHomeImageUrl}
          name={"homeImageUrl"}
          formUpdate={handler}
          action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsUpload className={"gx-w-100"}
          {...inputMobileImageUrl}
          name={"mobileImageUrl"}
          formUpdate={handler}
          action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsTextArea
          className={"gx-w-100"}
          resizeable={false}
          {...inputTnc}
          required={false}
          onChange={(e)=>{
            handler.handleFormUpdate("tnc",e.target.value)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsDate className={"gx-w-100"}
          {...inputStartDate}
          onChange={(date, dateString)=>{
            handler.handleFormUpdate("startDate", dateString)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsDate className={"gx-w-100"}
          {...inputEndDate}
          onChange={(date, dateString)=>{
            handler.handleFormUpdate("endDate", dateString)
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput className={"gx-w-100"}
          {...inputSortOrder}
          onChange={(e)=>{
            handler.handleFormUpdate("sortOrder",e.target.value)
          }}
        />
      </CmsDivRow>
      {Object.keys(formData).length === 0 ||
      !formData.urlType ||
      formData.urlType.value !== "free_text" ? (
        <CmsDivRow>
          <CmsTextArea
            className={"gx-w-100"}
            {...inputDescription}
            required={false}
            resizeable={false}
            onChange={(e) => {
              handler.handleFormUpdate("description", e.target.value);
            }}
          />
        </CmsDivRow>
      ) : (
        <CmsDivRow>
          <CmsTextEditor
            className={"gx-w-100  "}
            {...inputDescriptionHTML}
            required={false}
            resizeable={false}
            onChange={(value) => {
              handler.handleFormUpdate("descriptionHTML", value);
            }}
          />
        </CmsDivRow>
      )}
    </>
  )
}