import NumberHelper from "@/util/cms/number.helper";
import { Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CmsErrorLabel } from "./ErrorLabel"
import { CmsFormLabel } from "./Label"

export const CmsTextArea = (props)=>{

  let {
    label,
    value,
    disabled,
    required,
    className,
    onChange,
    error,
    isSingleLine,
    placeholder,
    rows=4,
    resizeable=true
  } = props;
  let checkLabel = "check "+ label
  let randomId = NumberHelper.randomId() 
  let idLabel = checkLabel ? label : "field"
  idLabel = `${idLabel} ${randomId}`

  let textAreaClassName = (!isSingleLine) ? "ant-input" : ""
  let styleResizeable = (resizeable==false) ? {resize:"none"} : {}
  return (
    <CmsFormLabel 
      label={label}
      id={idLabel}
      required={required}
      isSingleLine={isSingleLine}
      >

      <TextArea
        style={{
          ...styleResizeable
        }}
        placeholder={placeholder}
        disabled={disabled}
        id={idLabel}
        className={`${textAreaClassName} ${className}`}
        value={value}
        required={required}
        onChange={onChange}
        rows={rows}
      />

      <CmsErrorLabel error={error} label={label}/>
    </CmsFormLabel>
  )
}