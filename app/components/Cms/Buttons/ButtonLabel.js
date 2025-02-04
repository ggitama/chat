import ColorHelper from "@/util/cms/color.helper"

export const ButtonLabel = ({
  onClick,
  label
})=>{
  return (
    <button
      className="gx-mb-0 gx-btn-clear"
      style={{ 
        color: ColorHelper.blue() 
      }}
      onClick={onClick}
    >
      <span> {label} </span>
    </button>
  )
}