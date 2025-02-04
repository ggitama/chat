import { Button } from "antd"

export const CmsButton = ({
  title,onClick,type="primary",className="",
  size="middle"
})=>{
  return (
    <Button 
      type={type} 
      onClick={onClick} 
      className={className}
      size={size}
    > {title}</Button>
  )
}

export const CmsButtonInfo = ({
  title,onClick,type="primary",
  className,
})=>{
  return (
    <CmsButton
      title={title} type={type} onClick={onClick} 
      className={`gx-btn-info ${className}`}
    />
  )
}

export const CmsButtonWarning = ({
  title,onClick,type="primary",
  className,
})=>{
  return (
    <CmsButton
      title={title} type={type} onClick={onClick} 
      className={`gx-btn-warning ${className}`}
    />
  )
}

export * from "./ButtonLabel"