import { Input } from "@/components/Form/input"
import NumberHelper from "@/util/cms/number.helper";
import { CmsErrorLabel } from "./ErrorLabel"
import { CmsFormLabel } from "./Label"
import moment from "moment";
import { DatePicker } from "antd";

export const CmsDate = (props)=>{

  let {
    label,
    value,
    disabled,
    required,
    onChange,
    error,
    showTime,
    placeholder,
    hidden,
    type,
    format
  } = props;
  let checkLabel = "check "+ label
  let randomId = NumberHelper.randomId() 
  let idLabel = checkLabel ? label : "field"
  idLabel = `${idLabel} ${randomId}`

  if(!format) format = "DD-MM-YYYY"
  if(!showTime) showTime = false
  
  return (
    <CmsFormLabel 
      label={label}
      id={idLabel}
      required={required}
      >

      <DatePicker 
        style={{ width: '100%' }}
        required={required}
        format={format}
        showTime={showTime}
        value={
          value !== undefined && value !== "" && value !== "-"?
          moment(value, format) : ""}
        onChange={onChange}
      />

      <CmsErrorLabel error={error} label={label}/>
    </CmsFormLabel>
  )
}