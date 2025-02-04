export const CmsDivRow = (
  props,
)=>{
  const {
    children,
  } = props
  
  return (
    <div className={`gx-flex gx-flex-column gx-w-100`}>
      {children}
    </div>
  )
}