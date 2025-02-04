import { 
    CmsLoader, CmsCrumbs, CmsTable, 
    CmsFilter, CmsTableRow, 
} from "@/components/Cms"
import { 
    columnsTable, initialState, 
    crumbItems, useMainHooks, useModalEditHooks,
    reducer, schemeFilterTable, ModalEditContent,
    useModalCreateHooks, ModalCreateContent
} from "@/components/pages/vouchers/indexes"
import DataTableHelper from "@/util/cms/datatable.helper"
import { CmsModal } from "@/components/Cms/Modals"
import { useReducer, useEffect } from "react"
import { ModalDeleteContent } from "@/components/pages/vouchers/indexes/modals/ModalDeleteContent"
import { useModalDeleteHooks } from "@/components/pages/vouchers/indexes/hooks/modal-delete.hooks"
import { Row, Tabs } from "antd"
import { sharedTabModel } from "@/components/pages/vouchers/indexes/model/shared-tab.model"
import { useRouter } from "next/router"

const ScreenPage = (props) => {
    const pageTitle = "Voucher Discount"
    const { screenHeight, screenWidth } = props
    const tableHeight = DataTableHelper.tableHeight(screenHeight)
    const tableConfig = DataTableHelper.tableConfig(tableHeight)
    const [state, dispatch] = useReducer(reducer, initialState)

    const handler = useMainHooks( state, dispatch )
    const router = useRouter()

    useEffect(()=>{
        dispatch({type:"FORM_FILTER",data:schemeFilterTable()})
      },[])

    useEffect(() => {
        handler.handleGetListData()
    }, [handler.handleGetListData])

    if(state.IS_ON_LOADING && !state.DATA_LIST?.length){
        return ( <CmsLoader customHeight={tableHeight} text="Loading"/>)
    }

    return (
        <>
            <CmsTable
                title={pageTitle}
                btnActions={
                    <Row justify={'end'} style={{
                        margin: "-25px 0 -15px"
                    }}>
                        <button
                            type="button"
                            className="ant-btn ant-btn-primary gx-my-4 create-voucher-antavaya"
                            onClick={() =>
                                dispatch({type:"IS_SHOW_MODAL_CREATE",data:{
                                    isPromise:false
                                }})
                            }
                            >
                            <span>Create New Data</span>
                        </button>
                    </Row>
                }
                tableConfig={tableConfig}
                columnsTable={columnsTable}
                listData={state?.DATA_LIST}
                props={{state,dispatch,handler}}
                pageSizeOptions={[10,25,50,100]}
            >
                {console.log({props})}
                <CmsTableRow key={"prepend"}>
                    <CmsFilter
                        filterFormData={state.FORM_FILTER}
                        props={{state,dispatch,handler}}
                    />
                </CmsTableRow>
            </CmsTable>

            <CmsModal
                title={"Edit Voucher"}
                hasTitleKey={false}
                stateKey={"IS_SHOW_MODAL_EDIT"}
                props={{state,dispatch,handler}}
                modalHooks={useModalEditHooks}
                labelConfirm={"Update"}
                labelClose={"Close"}
                onClickClose={(footerHandler)=>{
                    footerHandler.handleClearFormData()
                }}
                onClickConfirm={(activeFormData,footerHandler)=>{
                    footerHandler.handleModalEditSubmit(activeFormData,
                    ()=>{
                        footerHandler.handleClearFormData()
                    })
                }}
                >
                <ModalEditContent></ModalEditContent>
            </CmsModal>
            <CmsModal
                title={"Create Voucher"}
                hasTitleKey={false}
                stateKey={"IS_SHOW_MODAL_CREATE"}
                props={{state,dispatch,handler}}
                modalHooks={useModalCreateHooks}
                labelConfirm={"Create"}
                labelClose={"Close"}
                onClickClose={(footerHandler)=>{
                    footerHandler.handleClearFormData()
                }}
                onClickConfirm={(activeFormData,footerHandler)=>{
                    footerHandler.handleModalCreateSubmit(activeFormData,
                    ()=>{
                        footerHandler.handleClearFormData()
                    })
                }}
                >
                <ModalCreateContent></ModalCreateContent>
            </CmsModal>
            <CmsModal
                title={"Delete Voucher"}
                hasTitleKey={false}
                stateKey={"IS_SHOW_MODAL_DELETE"}
                props={{state,dispatch,handler}}
                modalHooks={useModalDeleteHooks}
                labelConfirm={"Yes"}
                labelClose={"Close"}
                onClickClose={(footerHandler)=>{
                    footerHandler.handleClearFormData()
                }}
                onClickConfirm={(activeFormData,footerHandler)=>{
                    footerHandler.handleModalDeleteSubmit(activeFormData,
                    ()=>{
                        footerHandler.handleClearFormData()
                    })
                }}
                >

                <ModalDeleteContent></ModalDeleteContent>
            </CmsModal>

        </>
    )
}

export default ScreenPage