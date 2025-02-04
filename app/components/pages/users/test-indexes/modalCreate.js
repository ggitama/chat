import { PlusCircleOutlined } from "@ant-design/icons";

export const CardExtraModalCreate = ({props})=>{
  const [
    {},
    {setIsModalCreateShown}
  ] = props
  return (
    <>
      <button
        type="button"
        className="ant-btn ant-btn-primary gx-my-4 btn-sm"
        onClick={() =>
          setIsModalCreateShown({
            isLoadingPromise: false,
          })
        }
      >
       <div className="d-flex align-items-center">
          <PlusCircleOutlined />
          <span className="ml-1"> Create User </span>
        </div>   
      </button>
    </>
  )
}

// export const ModalCreate = ({ isModalShow=false })=>{
//   return (
//     <Modal open={isModalShow} title={false} footer={false} closeIcon={true}>
//       {isModalShow && (
//         <>
//           <div className="gx-fs-xl gx-font-wight-semi-bold gx-w-100 gx-text-center gx-mt-4">
//             Create New User
//           </div>
//         </>
//       )}
//     </Modal>
//   );
// }