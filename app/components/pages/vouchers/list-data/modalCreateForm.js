import { Button, Modal, Select, DatePicker, Switch } from "antd";
import { blue } from "@ant-design/colors";
import { useEffect, useState } from "react";
import { Input } from "@/components/Form/input";
import { formFieldValidation } from "@/util/formValidation";
import CircularProgress from "@/components/CircularProgress";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

export const ModalCreateForm = (props) => {
  const { isModalShow, handleModalShow, handleCreateData } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState([]);

  const handleFormUpdate = (index, value) => {
    const tempDataForm = {...formData};
    
    let validationType = tempDataForm[index].validationType
    if (validationType && formFieldValidation(validationType, value)) {
      tempDataForm[index].value = value;
    }else if(!validationType){
      tempDataForm[index].value = value;
    }

    if(index == 'type'){
      if(value == 'percentage'){
        tempDataForm.amount.type = 'hidden'
        tempDataForm.percentageDiscount.type = 'input'
        tempDataForm.maximumDiscount.type = 'input'
      }else{
        tempDataForm.amount.type = 'input'
        tempDataForm.percentageDiscount.type = 'hidden'
        tempDataForm.maximumDiscount.type = 'hidden'
      }
    }

    setFormData({...tempDataForm});
  };

  const buildForm = () => {
    let dataForm = {}
    Object.keys(formData).map(formKey=>{
      if(formData[formKey].type == 'Date'){
        let date = typeof formData[formKey].value == 'string' ? formData[formKey].value : formData[formKey].value.format('DD-MM-YYYY')
        dataForm[formKey] = moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
      }else{
        dataForm[formKey] = formData[formKey].value
      }
    })
    console.log(dataForm);
    handleModalShow.data = dataForm
    handleCreateData()
  }

  useEffect(() => {
    if (isModalShow && !isModalShow.isLoadingPromise) {
      setFormData({
          productType:{
            value: "",
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
            value: "",
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
            value: "",
            validationType:"alphanumeric",
            type: "Input",
            label:"Promo Code",
            required: true,
            error: "",
          },
          promoName:{
            value: "",
            validationType:"alphanumeric",
            type: "Input",
            label:"Promo Name",
            required: true,
            error: "",
          },
          promoDescription:{
            value: "",
            type: "InputArea",
            label:"Promo Description",
            required: true,
            error: "",
          },
          startDate:{
            value: "",
            type: "Date",
            label:"Start Date",
            required: true,
            error: "",
          },
          endDate:{
            value: "",
            type: "Date",
            label:"End Date",
            required: true,
            error: "",
          },
          quota:{
            value: "",
            validationType:"numeric",
            type: "Input",
            label:"Quota",
            required: true,
            error: "",
          },
          minimumTransaction:{
            value: "",
            validationType:"numeric",
            type: "Input",
            label:"Minimum Transaction",
            required: true,
            error: "",
          },
          percentageDiscount:{
            value: "",
            validationType:"numeric",
            type: "hidden",
            label:"Percentage Discount",
            required: true,
            error: "",
          },
          maximumDiscount:{
            value: "",
            validationType:"numeric",
            type: "hidden",
            label:"Maximum Discount",
            required: true,
            error: "",
          },
          amount:{
            value: "",
            validationType:"numeric",
            type: "hidden",
            label:"Amount",
            required: true,
            error: "",
          },
          perUser:{
            value: true,
            validationType:"boolean",
            type: "Switch",
            label:"Is Per User",
            required: true,
            error: "",
          },
          isForEmployee:{
            value: true,
            validationType:"boolean",
            type: "Switch",
            label:"Is For Employee",
            required: true,
            error: "",
          }
      });
      setIsLoading(false);
    }
  }, [isModalShow]);
  return (
    <Modal open={isModalShow} title={false} footer={false} closeIcon={true}>
      {isModalShow && (
        <>
          <div className="gx-fs-xl gx-font-wight-semi-bold gx-w-100 gx-text-center gx-mt-4">
            Create New Voucher
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
                <Input
                  label={formData.promoCode.label}
                  value={formData.promoCode.value}
                  required={formData.promoCode.required}
                  onChange={(e) => { return handleFormUpdate('promoCode', e.target.value)}}
                  error={formData.promoCode.error}
                  className={"gx-w-100"}
                />
                </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <Input
                  label={formData.promoName.label}
                  value={formData.promoName.value}
                  required={true}
                  onChange={(e) => { return handleFormUpdate('promoName', e.target.value)}}
                  error={formData.promoName.error}
                  className={"gx-w-100"}
                />
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
                <DatePicker 
                  style={{ width: '100%' }}
                  required={true}
                  format="DD-MM-YYYY"
                  onChange={ (date, dateString) => {
                      handleFormUpdate('startDate', dateString);
                    } 
                  } 
                />
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <label className="gx-fs-m gx-mb-2">
                  {formData.endDate.label} {formData.endDate.required && <span className="text-red-200-color">*</span>}
                </label>
                <DatePicker 
                  style={{ width: '100%' }}
                  required={true}
                  format="DD-MM-YYYY"
                  onChange={ (date, dateString) => {
                      handleFormUpdate('endDate', dateString);
                    } 
                  } 
                />
              </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <Input
                  label={formData.quota.label}
                  value={formData.quota.value}
                  required={true}
                  onChange={(e) => { return handleFormUpdate('quota', e.target.value)}}
                  error={formData.quota.error}
                  className={"gx-w-100"}
                />
                </div>
              <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                <Input
                  label={formData.minimumTransaction.label}
                  value={formData.minimumTransaction.value}
                  required={true}
                  onChange={(e) => { return handleFormUpdate('minimumTransaction', e.target.value)}}
                  error={formData.minimumTransaction.error}
                  className={"gx-w-100"}
                />
              </div>
              { formData.percentageDiscount.type == 'hidden' ? (<></>) 
                : (
                <>
                  <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                    <Input
                      label={formData.percentageDiscount.label}
                      value={formData.percentageDiscount.value}
                      required={true}
                      onChange={(e) => { return handleFormUpdate('percentageDiscount', e.target.value)}}
                      error={formData.percentageDiscount.error}
                      className={"gx-w-100"}
                    />
                    </div>
                    </>
                )
              }
              { formData.maximumDiscount.type == 'hidden' ? (<></>) 
                : (
                <>
                  <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                    <Input
                      label={formData.maximumDiscount.label}
                      value={formData.maximumDiscount.value}
                      required={true}
                      onChange={(e) => { return handleFormUpdate('maximumDiscount', e.target.value)}}
                      error={formData.maximumDiscount.error}
                      className={"gx-w-100"}
                    />
                    </div>
                    </>
                )
              }
              { formData.amount.type == 'hidden' ? (<></>) 
                : (
                <>
                  <div className="gx-w-100 gx-flex gx-flex-row gx-mt-4">
                    <Input
                      label={formData.amount.label}
                      value={formData.amount.value}
                      required={true}
                      type={formData.amount.type}
                      onChange={(e) => { return handleFormUpdate('amount', e.target.value)}}
                      error={formData.amount.error}
                      className={"gx-w-100"}
                    />
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
                  onClick={() => buildForm()}
                >
                  Create
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};
