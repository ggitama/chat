import React, { useState, useEffect } from "react";
import ModelHelper from "@/util/cms/model.helper";
import { formFieldValidation } from "@/util/formValidation";
import { schemaModal } from "../model/modal-edit.model";
import * as moment from "moment-timezone";

export const useModalEditHooks = (state, dispatch, stateKey) => {
  // only-single using useState instead of reducer
  const [formData, setFormData] = useState({});

  // listening to state.IS_SHOW_MODAL_VIEW value
  const stateValue = state[stateKey];

  const handleClearFormData = () => {
    Object.keys(formData).map((formKey) => {
      formData[formKey].value = "";
      return formKey;
    });
    setFormData({ ...formData });
  };

  const handleFormUpdate = (index, value, form = null) => {
    let tempDataForm = form ? { ...form } : { ...formData };

    let inputType = tempDataForm[index].type;
    let validationType = tempDataForm[index].validationType;
    let numericIndex = [
      "quota",
      "minimumTransaction",
      "maximumDiscount",
      "amount",
      "percentageDiscount",
    ];

    if (index == "productType") {
      tempDataForm.tourCode.hidden = true;
      tempDataForm.tourCode.required = false;

      tempDataForm.regionName.hidden = true;
      tempDataForm.regionName.required = false;

      tempDataForm.airlineCode.hidden = true;
      tempDataForm.airlineCode.required = false;

      tempDataForm.originCode.hidden = true;
      tempDataForm.originCode.required = false;

      tempDataForm.destinationCode.hidden = true;
      tempDataForm.destinationCode.required = false;

      tempDataForm.hotelCode.hidden = true;
      tempDataForm.hotelCode.required = false;

      if (value == "tour") {
        tempDataForm.tourCode.hidden = false;
        tempDataForm.tourCode.required = false;

        tempDataForm.regionName.hidden = false;
        tempDataForm.regionName.required = false;
      } else if (value == "flight") {
        tempDataForm.airlineCode.hidden = false;
        tempDataForm.airlineCode.required = false;

        tempDataForm.originCode.hidden = false;
        tempDataForm.originCode.required = false;

        tempDataForm.destinationCode.hidden = false;
        tempDataForm.destinationCode.required = false;
      } else if (value == "hotel") {
        tempDataForm.hotelCode.hidden = false;
        tempDataForm.hotelCode.required = false;
      }
    }

    if (index == "type") {
      if (value == "percentage") {
        tempDataForm.amount.type = "hidden";
        tempDataForm.percentageDiscount.type = "Input";
        tempDataForm.maximumDiscount.type = "Input";
        tempDataForm.amount.required = false;
        tempDataForm.percentageDiscount.required = true;
        tempDataForm.maximumDiscount.required = true;
      } else if (value == "amount") {
        tempDataForm.amount.type = "Input";
        tempDataForm.percentageDiscount.type = "hidden";
        tempDataForm.maximumDiscount.type = "hidden";
        tempDataForm.amount.required = true;
        tempDataForm.percentageDiscount.required = false;
        tempDataForm.maximumDiscount.required = false;
      } else {
        tempDataForm.amount.type = "hidden";
        tempDataForm.percentageDiscount.type = "hidden";
        tempDataForm.maximumDiscount.type = "hidden";
        tempDataForm.amount.required = false;
        tempDataForm.percentageDiscount.required = false;
        tempDataForm.maximumDiscount.required = false;
      }
    }

    switch (inputType) {
      case "Input":
        if (numericIndex.includes(index)) {
          value = parseInt(value.replace(/[.]/g, ""));
          tempDataForm[index].value = "";
        }
        if (value === "") {
          tempDataForm[index].value = value;
          break;
        }
        if (
          validationType !== "" &&
          validationType &&
          formFieldValidation(validationType, value)
        ) {
          tempDataForm[index].value = value;
          if (validationType == "numeric") {
            tempDataForm[index].value = value.toLocaleString("id-ID");
          }
        }
        break;
      default:
        tempDataForm[index].value = value;
        break;
    }

    setFormData({ ...tempDataForm });
  };

  useEffect(() => {
    if (stateValue && !stateValue.isPromise) {
      let dataRow = stateValue.dataRow;

      let startDate = dataRow?.startDate;
      let endDate = dataRow?.endDate;
      if (
        !moment
          .tz(dataRow?.startDate, "DD-MM-YYYY HH:mm", true, moment.tz.guess())
          .isValid()
      ) {
        startDate = moment
          .tz(dataRow?.startDate, "Etc/GMT+7")
          .add(7, "hours")
          .format("DD-MM-YYYY HH:mm");
        endDate = moment
          .tz(dataRow?.endDate, "Etc/GMT+7")
          .add(7, "hours")
          .format("DD-MM-YYYY HH:mm");
      }

      let tourCodes = dataRow?.tourCode;
      if (tourCodes != null) {
        tourCodes = tourCodes.split(",");
      }

      let regionNames = dataRow?.regionName;
      if (regionNames != null) {
        regionNames = regionNames.split(",");
      }

      let hotelCodes = dataRow?.hotelCode;
      let hotelNames = []
      if (hotelCodes != null) {
        // fetch data hotel
        hotelCodes = hotelCodes.split(",");
        let url = process.env.NEXT_PUBLIC_BASE_URL_API_BOOKING;

        Promise.all(
          hotelCodes.map((hotelCode) => {
            return fetch(url+'/v2/hotels/search?param='+hotelCode)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to fetch hotel data");
                }
                return response.json();
              })
              .then((data) => {
                // Lakukan sesuatu dengan data hotel yang telah di-fetch
                hotelNames.push(data.responseData[0].name)
              })
              .catch((error) => {
                console.error("Error fetching hotel data:", error);
              });
          })
        );
      }

      let airlineCodes = dataRow?.airlineCode;
      if (airlineCodes != null && airlineCodes.length > 0) {
        airlineCodes = airlineCodes.split(",");
      }

      let modalForm = schemaModal();
      ModelHelper.setter(modalForm, "uuid", dataRow?.uuid);
      ModelHelper.setter(modalForm, "productType", dataRow?.productType);
      ModelHelper.setter(modalForm, "type", dataRow?.type);
      ModelHelper.setter(modalForm, "platform", dataRow?.platform);
      ModelHelper.setter(modalForm, "promoCode", dataRow?.promoCode);
      ModelHelper.setter(modalForm, "promoName", dataRow?.promoName);
      ModelHelper.setter(
        modalForm,
        "promoDescription",
        dataRow?.promoDescription
      );
      ModelHelper.setter(modalForm, "tnc", dataRow?.tnc);
      ModelHelper.setter(
        modalForm,
        "desktopImageUrl",
        dataRow?.desktopImageUrl
      );
      ModelHelper.setter(modalForm, "mobileImageUrl", dataRow?.mobileImageUrl);
      ModelHelper.setter(modalForm, "startDate", startDate);
      ModelHelper.setter(modalForm, "endDate", endDate);
      ModelHelper.setter(modalForm, "quota", dataRow?.quota);
      ModelHelper.setter(
        modalForm,
        "minimumTransaction",
        dataRow?.minimumTransaction
      );
      ModelHelper.setter(
        modalForm,
        "percentageDiscount",
        dataRow?.percentageDiscount
      );
      ModelHelper.setter(
        modalForm,
        "maximumDiscount",
        dataRow?.maximumDiscount
      );
      ModelHelper.setter(modalForm, "amount", dataRow?.amount);
      ModelHelper.setter(modalForm, "isOncePerUser", dataRow?.isOncePerUser);
      ModelHelper.setter(modalForm, "isForEmployee", dataRow?.isForEmployee);
      ModelHelper.setter(modalForm, "isHidden", dataRow?.isHidden);
      ModelHelper.setter(modalForm, "tourCode", tourCodes);
      ModelHelper.setter(modalForm, "regionName", regionNames);
      ModelHelper.setter(modalForm, "hotelCode", hotelCodes);
      ModelHelper.setter(modalForm, "airlineCode", airlineCodes);
      ModelHelper.setter(
        modalForm,
        "destinationCode",
        dataRow?.destinationCode
      );
      ModelHelper.setter(modalForm, "originCode", dataRow?.originCode);

      if ("errors" in stateValue) {
        let errors = stateValue.errors;
        ModelHelper.setter(modalForm, "uuid", errors.uuid, "error");
        ModelHelper.setter(
          modalForm,
          "productType",
          errors.productType,
          "error"
        );
        ModelHelper.setter(modalForm, "type", errors.type, "error");
        ModelHelper.setter(modalForm, "platform", errors.platform, "error");
        ModelHelper.setter(modalForm, "promoCode", errors.promoCode, "error");
        ModelHelper.setter(modalForm, "promoName", errors.promoName, "error");
        ModelHelper.setter(
          modalForm,
          "promoDescription",
          errors.promoDescription,
          "error"
        );
        ModelHelper.setter(modalForm, "tnc", errors.tnc, "error");
        ModelHelper.setter(
          modalForm,
          "desktopImageUrl",
          errors.desktopImageUrl,
          "error"
        );
        ModelHelper.setter(
          modalForm,
          "mobileImageUrl",
          errors.mobileImageUrl,
          "error"
        );
        ModelHelper.setter(modalForm, "startDate", errors.startDate, "error");
        ModelHelper.setter(modalForm, "endDate", errors.endDate, "error");
        ModelHelper.setter(modalForm, "quota", errors.quota, "error");
        ModelHelper.setter(
          modalForm,
          "minimumTransaction",
          errors.minimumTransaction,
          "error"
        );
        ModelHelper.setter(
          modalForm,
          "percentageDiscount",
          errors.percentageDiscount,
          "error"
        );
        ModelHelper.setter(
          modalForm,
          "maximumDiscount",
          errors.maximumDiscount,
          "error"
        );
        ModelHelper.setter(modalForm, "amount", errors.amount, "error");
        ModelHelper.setter(
          modalForm,
          "isOncePerUser",
          errors.isOncePerUser,
          "error"
        );
        ModelHelper.setter(
          modalForm,
          "isForEmployee",
          errors.isForEmployee,
          "error"
        );
        ModelHelper.setter(modalForm, "isHidden", errors.isHidden, "error");
        ModelHelper.setter(modalForm, "tourCode", errors.tourCode, "error");
        ModelHelper.setter(modalForm, "regionName", errors.regionName, "error");
        ModelHelper.setter(modalForm, "hotelCode", errors.hotelCode, "error");
        ModelHelper.setter(
          modalForm,
          "airlineCode",
          errors.airlineCode,
          "error"
        );
        ModelHelper.setter(
          modalForm,
          "destinationCode",
          errors.destinationCode,
          "error"
        );
        ModelHelper.setter(modalForm, "originCode", errors.originCode, "error");
      }

      if (dataRow.type == "percentage") {
        modalForm.amount.type = "hidden";
        modalForm.percentageDiscount.type = "input";
        modalForm.maximumDiscount.type = "input";
        modalForm.amount.required = false;
        modalForm.percentageDiscount.required = true;
        modalForm.maximumDiscount.required = true;
      } else if (dataRow.type == "amount") {
        modalForm.amount.type = "input";
        modalForm.percentageDiscount.type = "hidden";
        modalForm.maximumDiscount.type = "hidden";
        modalForm.amount.required = true;
        modalForm.percentageDiscount.required = false;
        modalForm.maximumDiscount.required = false;
      } else {
        modalForm.amount.type = "hidden";
        modalForm.percentageDiscount.type = "hidden";
        modalForm.maximumDiscount.type = "hidden";
        modalForm.amount.required = false;
        modalForm.percentageDiscount.required = false;
        modalForm.maximumDiscount.required = false;
      }

      setFormData({
        ...modalForm,
      });
      handleFormUpdate("type", dataRow?.type, modalForm);
      handleFormUpdate("productType", dataRow?.productType, modalForm);
    }
  }, [stateValue]);

  return [
    { formData },
    { setFormData },
    {
      handleClearFormData,
      handleFormUpdate,
    },
  ];
};
