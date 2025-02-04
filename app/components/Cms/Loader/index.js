import CircularProgress from "@/components/CircularProgress"

export const CmsLoader = ({text,customHeight})=>{
  return (
    <CircularProgress
      className={"gx-w-100"}
      customHeight={customHeight}
      text={text}
    />
  )
}