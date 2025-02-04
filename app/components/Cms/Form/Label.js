export const CmsFormLabel = (
  props,
)=>{
  const {
    id,
    label,
    required,
    children,
    isSingleLine,
    field
  } = props
  
  let fullWidthClass = (!isSingleLine) ? "gx-flex gx-flex-column gx-w-100" : " "
  return (
    <div className={`${fullWidthClass}`}>
    {label && (
      <label
        className="gx-fs-m gx-mb-2"
        htmlFor={id}
      >
        {label} {required && <span className="text-red-200-color">*</span>}
      </label>
    )}
    {children}
  </div>
  )
}

export const CmsCurrencySpan = (
  props
)=>{
  const {
    currency="Rp.",
    isNegative=false,
    children
  } = props

  return (
  <div style={{display:"flex"}}>
    <span style={{width:"30%"}}>
      {isNegative ? "- " : ""}{currency}
    </span>
    <span style={{width:"70%",textAlign:"right"}}>
      {children}
    </span>
  </div>
  )
}