
export const CmsErrorLabel = (props)=>{
  const {
    error,
    label
  } = props
  
  return (
    <div className="gx-fs-xs text-red-200-color gx-mt-1">
      {error && label + " " + error}
    </div>
  )
}