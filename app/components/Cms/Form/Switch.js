import NumberHelper from "@/util/cms/number.helper";
import { CmsErrorLabel } from "./ErrorLabel"
import { CmsFormLabel } from "./Label"
import { Switch } from "antd";

export const CmsSwitch = (props)=>{

  let {
    label,
    value,
    required,
    onChange,
    error,
    style,
    checkedChildren,
    unCheckedChildren,
    type
  } = props;
  let checkLabel = "check "+ label
  let randomId = NumberHelper.randomId() 
  let idLabel = checkLabel ? label : "field"
  idLabel = `${idLabel} ${randomId}`

  checkedChildren = checkedChildren || ''
  unCheckedChildren = unCheckedChildren || ''

  return (
    <CmsFormLabel 
      label={label}
      id={idLabel}
      required={required}
      >

      <Switch
        style={style}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        checked={value} 
        onChange={onChange}
      />

      <CmsErrorLabel error={error} label={label}/>
    </CmsFormLabel>
  )
}