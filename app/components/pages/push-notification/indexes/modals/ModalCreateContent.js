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
    displayName: inputDisplayName,
    email: inputEmail,
    status: inputStatus,
    phoneNumber: inputPhoneNumber,
    photoURL: inputPhotoURL,
  } = formData;

  return (
    <>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputDisplayName}
          onChange={(e) => {
            handler.handleFormUpdate("displayName", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputEmail}
          onChange={(e) => {
            handler.handleFormUpdate("email", e.target.value);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsSelect
          {...inputStatus}
          onChange={(e) => {
            handler.handleFormUpdate("status", e);
          }}
        />
      </CmsDivRow>
      <CmsDivRow>
        <CmsInput
          className={"gx-w-100"}
          {...inputPhoneNumber}
          onChange={(e) => {
            handler.handleFormUpdate("phoneNumber", e.target.value);
          }}
        />
      </CmsDivRow>
      {/* <CmsDivRow>
        <CmsUpload
          className={"gx-w-100"}
          {...inputPhotoURL}
          name={"photoURL"}
          formUpdate={handler}
          action={`${process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING}/resources/submit`}
        />
      </CmsDivRow> */}
     
    </>
  );
};
