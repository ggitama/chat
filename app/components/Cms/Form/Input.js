import { Input } from "@/components/Form/input"
import NumberHelper from "@/util/cms/number.helper";
import { CmsErrorLabel } from "./ErrorLabel"
import { CmsFormLabel } from "./Label"

export const CmsInput = (props)=>{

  let {
    label,
    value,
    disabled,
    required,
    className,
    onChange,
    action,
    ref,
    error,
    placeholder,
    hidden,
    type
  } = props;
  let checkLabel = "check "+ label
  let randomId = NumberHelper.randomId() 
  let idLabel = checkLabel ? label : "field"
  idLabel = `${idLabel} ${randomId}`

  let hiddenInput = hidden ? "hidden" : "input"
  let typeInput = type || hiddenInput

  if(typeInput == 'hidden'){
    return (
      <Input
        className={`ant-input ${className}`}
        id={idLabel}
        type={typeInput}
        disabled={disabled}
        value={value}
        onChange={onChange}
        action={action}
        placeholder={placeholder ? placeholder : ""}
      />

    )
  }
  return (
    <CmsFormLabel 
      label={label}
      id={idLabel}
      required={required}
      >

      <Input
        className={`ant-input ${className}`}
        id={idLabel}
        type={typeInput}
        disabled={disabled}
        value={value}
        onChange={onChange}
        action={action}
        placeholder={placeholder ? placeholder : ""}
      />

      <CmsErrorLabel error={error} label={label}/>
    </CmsFormLabel>
  )
}