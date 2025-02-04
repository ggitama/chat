import NumberHelper from "@/util/cms/number.helper";
import { Select } from "antd";
import { CmsErrorLabel } from "./ErrorLabel"
import { CmsFormLabel } from "./Label"

export const CmsSelect = (props)=>{

  let {
    label,
    value,
    disabled,
    required,
    className,
    onChange,
    error,
    defaultValue,
    options,
    hidden,
    isSingleLine,
    placeholder,
  } = props;

  if(!label) return null;
  let checkLabel = "check "+ label
  let randomId = NumberHelper.randomId() 
  let idLabel = checkLabel ? label : "field"
  idLabel = `${idLabel} ${randomId}`
  let option_value = options ? options : []
  let selectClassName = (!isSingleLine) ? "ant-input" : ""

  let hiddenInput = hidden ? "hidden" : "input"

  if(hidden){
    return ""
  }

  return (
    <CmsFormLabel 
      label={label}
      id={idLabel}
      required={required}
      isSingleLine={isSingleLine}
      field
      >

      <Select
        placeholder={placeholder}
        disabled={disabled}
        id={idLabel}
        className={`${selectClassName} ${className}`}
        defaultValue={defaultValue}
        required={required}
        value={value}
        options={[...options]}
        onChange={onChange}
      />

      <CmsErrorLabel error={error} label={label}/>
    </CmsFormLabel>
  )
}