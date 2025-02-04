import { Modal } from "antd"

export const CmsModalCreate = ({props,children})=>{
  const {
    state
  } = props

  return (
    <Modal 
      open={state.IS_SHOW_MODAL_CREATE} 
      title={false} 
      footer={false} 
      closeIcon={true}
      >
    </Modal>
  )
}

export * from "./CmsModal"