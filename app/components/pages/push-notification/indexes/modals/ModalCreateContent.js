import { CmsDate } from "@/components/Cms/Form/Date";
import { CmsSwitch } from "@/components/Cms/Form/Switch";
import { CmsTextEditor } from "@/components/Cms/Form/TextEditor";
import { CmsTextArea } from "@/components/Cms/Form/Textarea";
import { CmsUpload } from "@/components/Cms/Form/Upload";
import { CmsSelectMultiple } from "@/components/Cms/Form/SelectMultiple";
import { useState, useEffect } from "react";
import { handleFetchCustomerList } from "app/api/helper";

const { CmsLoader } = require("@/components/Cms");
const { CmsDivRow, CmsInput, CmsSelect } = require("@/components/Cms/Form");

export const ModalCreateContent = ({ formData, props, stateKey }) => {
  const { state, dispatch, handler } = props;

  if (!state[stateKey]) return null;
  if (state.IS_ON_LOADING) {
    return <CmsLoader title="Loading" customHeight={"300px"} />;
  }

  let {
    notificationName: inputnotificationName,
    notificationType: inputnotificationType,
    status: inputStatus,
    mobileImageUrl: inputMobileImageUrl,
    sendNotificationDate: inputSendNotificationDate,
    description: inputDescription,
    platform: inputPlatform,
    audience: inputAudience,
  } = formData;

  return (
    <>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputnotificationName}
          onChange={(e) => {
            handler.handleFormUpdate("notificationName", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputnotificationType}
          onChange={(e) => {
            handler.handleFormUpdate("notificationType", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputPlatform}
          onChange={(e) => {
            handler.handleFormUpdate("platform", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSwitch
          className={"gx-w-100"}
          {...inputStatus}
          style={{ width: "80px" }}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          onChange={(e) => {
            handler.handleFormUpdate("status", e);
          }}
          required={false}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsUpload
          className={"gx-w-100"}
          {...inputMobileImageUrl}
          name={"mobileImageUrl"}
          formUpdate={handler}
          action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsDate
          className={"gx-w-100"}
          {...inputSendNotificationDate}
          onChange={(date, dateString) => {
            handler.handleFormUpdate("sendNotificationDate", dateString);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputAudience}
          onChange={(e) => {
            handler.handleFormUpdate("audience", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsTextArea
          className={"gx-w-100"}
          {...inputDescription}
          required={true}
          resizeable={false}
          onChange={(e) => {
            handler.handleFormUpdate("description", e.target.value);
          }}
        />
      </CmsDivRow>
    </>
  );
};
