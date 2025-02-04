import { ExclamationCircleFilled } from "@ant-design/icons"
import { Button } from "antd"
import { orange, blue } from "@ant-design/colors";


const { CmsLoader } = require("@/components/Cms")
const { CmsDivRow, CmsInput, CmsSelect } = require("@/components/Cms/Form")

export const ModalDeleteContent = ({
  formData,props,
  stateKey
})=>{
  const {
    state,
    dispatch,
    handler
  }=props

  if(!state[stateKey]) return null
  if(state[stateKey].isPromise) return null
  if(state.IS_ON_LOADING){
    return (
      <CmsLoader title="Loading" customHeight={"300px"}/>
    )
  }

  return (
    <>
      <div className="gx-w-100 gx-flex-row gx-justify-content-center">
        <ExclamationCircleFilled
          style={{ fontSize: "72px", color: orange[5] }}
        />
      </div>
      <div className="gx-fs-xl gx-font-wight-semi-bold gx-w-100 gx-text-center gx-mt-4">
        Are you sure to{" "}
        
        Delete {" "}
        popup - {state[stateKey]?.dataRow?.title}
        <span style={{ color: blue[5] }}>
        </span>{}
        ?
      </div>
    </>
  )
}