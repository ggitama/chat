import { Breadcrumb, Card } from "antd"

export const CmsCrumbs = ({
  items
})=>{
  return (
    <>
      {items && (
        <Card 
          bodyStyle={{marginLeft:"8px"}}
          size="small"
          className="mb-2">
            <Breadcrumb  routes={[...items]}/>
        </Card>
      )}
    </>
  )
}