import { Button, Modal, Switch, Select, DatePicker } from "antd";
import CircularProgress from "@/components/CircularProgress";
import { formFieldValidation } from "@/util/formValidation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import TextArea from "antd/lib/input/TextArea";
import { blue} from "@ant-design/colors";
import moment from "moment";

export const ModalEditForm = (props) => {
  const { isModalShow, handleModalShow, handleEditData } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({});

  const handleFormUpdate = (index, value) => {
    const tempDataForm = {...formData};

    if(tempDataForm[index].type == 'Date'){
      if(value && value != 'Invalid Date'){
        tempDataForm[index].value = moment(value, 'DD-MM-YYYY');
      }else{
        tempDataForm[index].value = "";
      }
    }else{
      let validationType = tempDataForm[index].validationType
      if (validationType && formFieldValidation(validationType, value)) {
        tempDataForm[index].value = value;
      }else if(!validationType){
        tempDataForm[index].value = value;
      }
    }

    if(index == 'type'){
      if(value == 'percentage'){
        tempDataForm.amount.type = 'hidden'
        tempDataForm.percentageDiscount.type = 'input'
        tempDataForm.maximumDiscount.type = 'input'
      }else if(value == 'amount'){
        tempDataForm.amount.type = 'input'
        tempDataForm.percentageDiscount.type = 'hidden'
        tempDataForm.maximumDiscount.type = 'hidden'
      }else{
        tempDataForm.amount.type = 'hidden'
        tempDataForm.percentageDiscount.type = 'hidden'
        tempDataForm.maximumDiscount.type = 'hidden'
      }
    }

    setFormData({...tempDataForm});
  };

  const handleGetDetailData = useCallback(async () => {
    let startDate = moment(isModalShow.data.startDate).format('DD-MM-YYYY');
    let endDate = moment(isModalShow.data.endDate).format('DD-MM-YYYY');
    const updateDataForm = {
      uuid:{
        value: isModalShow.data.uuid,
        validationType:"alphanumeric",
        type: "Input",
        label:"Uuid",
        required: true,
        error: "",
      },
      productType:{
        value: isModalShow.data.productType,
        type: "Select",
        label:"Product Type",
        options:[
          { value:"",label:"Please Select"},
          { value: "flight", label: "Flight" },
          { value: "hotel", label: "Hotel" },
          { value: "tour", label: "Tour" },
        ],
        required: true,
        error: "",
      },
      type:{
        value: isModalShow.data.type,
        type: "Select",
        label:"Promo Type",
        options:[
          { value:"",label:"Please Select"},
          { value: "amount", label: "Amount" },
          { value: "percentage", label: "Percentage" },
        ],
        required: true,
        error: "",
      },
      platform:{
        value: "",
        type: "Select",
        label:"Platform",
        options:[
          { value:"",label:"Please Select"},
          { value: "All", label: "All" },
          { value: "Web", label: "Web" },
          { value: "App", label: "App" },
        ],
        required: true,
        error: "",
      },
      promoCode:{
        value: isModalShow.data.promoCode,
        validationType:"alphanumeric",
        type: "Input",
        label:"Promo Code",
        required: true,
        error: "",
      },
      promoName:{
        value: isModalShow.data.promoName,
        validationType:"alphanumeric",
        type: "Input",
        label:"Promo Name",
        required: true,
        error: "",
      },
      promoDescription:{
        value: isModalShow.data.promoDescription,
        type: "InputArea",
        label:"Promo Description",
        required: true,
        error: "",
      },
      startDate:{
        value: startDate,
        type: "Date",
        label:"Start Date",
        required: true,
        error: "",
      },
      endDate:{
        value: endDate,
        type: "Date",
        label:"End Date",
        required: true,
        error: "",
      },
      quota:{
        value: isModalShow.data.quota,
        validationType:"numeric",
        type: "Input",
        label:"Quota",
        required: true,
        error: "",
      },
      minimumTransaction:{
        value: isModalShow.data.minimumTransaction,
        validationType:"numeric",
        type: "Input",
        label:"Minimum Transaction",
        required: true,
        error: "",
      },
      percentageDiscount:{
        value: isModalShow.data.percentageDiscount,
        validationType:"numeric",
        type: isModalShow.data.type == 'amount' ? 'hidden' : 'input',
        label:"Percentage Discount",
        required: true,
        error: "",
      },
      maximumDiscount:{
        value: isModalShow.data.maximumDiscount,
        validationType:"numeric",
        type: isModalShow.data.type == 'amount' ? 'hidden' : 'input',
        label:"Maximum Discount",
        required: true,
        error: "",
      },
      amount:{
        value: isModalShow.data.amount,
        validationType:"numeric",
        type: isModalShow.data.type == 'amount' ? 'hidden' : 'input',
        label:"Amount",
        required: true,
        error: "",
      },
      perUser:{
        value: isModalShow.data.perUser,
        validationType:"boolean",
        type: "Switch",
        label:"Is Per User",
        required: true,
        error: "",
      },
      isForEmployee:{
        value: isModalShow.data.isForEmployee,
        validationType:"boolean",
        type: "Switch",
        label:"Is For Employee",
        required: true,
        error: "",
      }
    };

    setIsLoading(false);
    setFormData(updateDataForm);
  }, [isModalShow])
  ;

  const handleUpdateData = () => {
    let dataForm = {}
    Object.keys(formData).map(formKey=>{
      if(formData[formKey].type == 'Date'){
        let date = typeof formData[formKey].value == 'string' ? formData[formKey].value : formData[formKey].value.format('DD-MM-YYYY')
        dataForm[formKey] = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
      }else{
        dataForm[formKey] = formData[formKey].value
      }
    })

    handleEditData(dataForm)
  }

  useEffect(() => {
    if (isModalShow && !isModalShow.isLoadingPromise) {
      setIsLoading(true);
      handleGetDetailData();
    }
  }, [handleGetDetailData]);
  return (
    <Modal open={isModalShow} title={false} footer={false} closeIcon={true}>
      {isModalShow && (
        <>
          <div className="gx-fs-xl gx-font-wight-semi-bold gx-w-100 gx-text-center gx-mt-4">
            Edit Voucher -{" "}
            <span style={{ color: blue[5] }}>
              {isModalShow && isModalShow.data.promoName}
            </span>{" "}
          </div>
          {isLoading ? (
            <CircularProgress
              className={"gx-w-100"}
              customHeight={"300px"}
              text={"Loading Data"}
            />
          ) : (
            <>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.productType.label} {formData.productType.required && <span className="text-red-200-color">*</span>}
                </label>
                <Select
                  style={{width:"100%"}}
                  defaultValue=""
                  required={formData.productType.required}
                  value={formData.productType.value}
                  options={[...formData.productType.options]}
                  onChange={(e)=>{
                    return handleFormUpdate("productType",e)
                  }}
                />
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.type.label} {formData.type.required && <span className="text-red-200-color">*</span>}
                </label>
                <Select
                  style={{width:"100%"}}
                  defaultValue=""
                  required={formData.type.required}
                  value={formData.type.value}
                  options={[...formData.type.options]}
                  onChange={(e)=>{
                    return handleFormUpdate("type",e)
                  }}
                />
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <React.Fragment>
                  {renderInput(formData, handleFormUpdate, 'promoCode')}
                </React.Fragment>
                </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <React.Fragment>
                  {renderInput(formData, handleFormUpdate, 'promoName')}
                </React.Fragment>
                </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.promoDescription.label} {formData.promoDescription.required && <span className="text-red-200-color">*</span>}
                </label>
                <TextArea
                  label={formData.promoDescription.label}
                  value={formData.promoDescription.value}
                  required={true}
                  onChange={(e) => { 
                    return handleFormUpdate('promoDescription', e.target.value)}}
                  error={formData.promoDescription.error}
                  className={"gx-w-100"}
                />
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.startDate.label} {formData.startDate.required && <span className="text-red-200-color">*</span>}
                </label>
                <React.Fragment>
                  {renderDate(formData, handleFormUpdate, 'startDate')}
               </React.Fragment>
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.endDate.label} {formData.endDate.required && <span className="text-red-200-color">*</span>}
                </label>
                <React.Fragment>
                  {renderDate(formData, handleFormUpdate, 'endDate')}
               </React.Fragment>
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <React.Fragment>
                    {renderInput(formData, handleFormUpdate, 'quota')}
                </React.Fragment>
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <React.Fragment>
                    {renderInput(formData, handleFormUpdate, 'minimumTransaction')}
                </React.Fragment>
                </div>
              { formData.type.value == 'amount' ? (<></>) : (
                  <>
                  <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                    <React.Fragment>
                        {renderInput(formData, handleFormUpdate, 'percentageDiscount')}
                    </React.Fragment>
                  </div>
                  </>
                )
              }
              { formData.type.value == 'amount' ? (<></>) : (
                  <>
                  <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                    <React.Fragment>
                        {renderInput(formData, handleFormUpdate, 'maximumDiscount')}
                    </React.Fragment>
                  </div>
                  </>
                )
              }
              { formData.type.value == 'percentage' ? (<></>) : (
                  <>
                  <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                    <React.Fragment>
                        {renderInput(formData, handleFormUpdate, 'amount')}
                    </React.Fragment>
                  </div>
                  </>
                )
              }
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
              <label className="gx-fs-m gx-mb-2">
                  {formData.perUser.label} {formData.perUser.required && <span className="text-red-200-color">*</span>}
                </label>
                <Switch defaultChecked onChange={(e) => { return handleFormUpdate('perUser', e)}} />
                </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
              <label className="gx-fs-m gx-mb-2">
                  {formData.isForEmployee.label} {formData.isForEmployee.required && <span className="text-red-200-color">*</span>}
                </label>
                <Switch defaultChecked onChange={(e) => { return handleFormUpdate('isForEmployee', e)}} />
                </div>

              <div className="gx-w-100 gx-flex-row gx-justify-content-center gx-mt-4">
                <Button
                  className="gx-btn-outline-info gx-px-4"
                  onClick={() => handleModalShow()}
                  disabled={isModalShow && isModalShow.isLoadingPromise}
                >
                  Cancel
                </Button>
                <Button
                  className="gx-btn-info gx-px-4"
                  loading={isModalShow && isModalShow.isLoadingPromise}
                  onClick={() => handleUpdateData()}
                >
                  Update
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
}

const renderDate = (formData, handleFormUpdate, index) => {
    return (
      <DatePicker 
        style={{ width: '100%' }}
        required={true}
        format={"DD-MM-YYYY"}
        value={
          formData[index].value !== "" ?
          moment(formData[index].value, 'DD-MM-YYYY') : ""}
        onChange={ (date, dateString) => {
            handleFormUpdate(index, dateString);
          } 
        } 
      />
    )
}

const renderInput = (formData, handleFormUpdate, index) => {
  return (
    <Input
      label={formData[index].label}
      value={formData[index].value}
      required={true}
      onChange={(e) => { return handleFormUpdate(index, e.target.value)}}
      error={formData[index].error}
      className={"gx-w-100"}
    />
  )
}
