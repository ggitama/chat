import { 
    CmsLoader, CmsCrumbs, CmsTable, 
    CmsFilter, CmsTableRow 
} from "@/components/Cms"
import { 
    columnsTable, initialState, 
    crumbItems, useMainHooks, useModalEditHooks,
    reducer, schemeFilterTable, ModalEditContent,
    useModalCreateHooks, ModalCreateContent
} from "@/components/pages/bank/indexes"
import DataTableHelper from "@/util/cms/datatable.helper"
import { CmsModal } from "@/components/Cms/Modals"
import { useReducer, useEffect } from "react"
import { ModalDeleteContent } from "@/components/pages/bank/indexes/modals/ModalDeleteContent"
import { useModalDeleteHooks } from "@/components/pages/bank/indexes/hooks/modal-delete.hooks"
import { Row } from "antd"

const ScreenPage = (props) => {
    const pageTitle = "Bank Management"
    const { screenHeight, screenWidth } = props
    const tableHeight = DataTableHelper.tableHeight(screenHeight)
    const tableConfig = DataTableHelper.tableConfig(tableHeight)
    const [state, dispatch] = useReducer(reducer, initialState)

    const handler = useMainHooks( state, dispatch )

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
            <CmsCrumbs
                items={ crumbItems() }
            />
            <CmsTable
                title={pageTitle}
                btnActions={
                    <Row justify={'end'} style={{
                        margin: "-25px 0 -15px"
                    }}>
                        <button
                            type="button"
                            className="ant-btn ant-btn-primary gx-my-4"
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
                pageSizeOptions={[3,5,10,25,50,100]}
            >
                <CmsTableRow key={"prepend"}>
                    <CmsFilter
                        filterFormData={state.FORM_FILTER}
                        props={{state,dispatch,handler}}
                    />
                </CmsTableRow>
            </CmsTable>

            <CmsModal
                title={"Edit Bank"}
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
                    // passing callback so it's readble for the button action
                    // execute after submit done
                    ()=>{
                        footerHandler.handleClearFormData()
                    })
                }}
                >
                <ModalEditContent></ModalEditContent>
            </CmsModal>
            <CmsModal
                title={"Create Bank"}
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
                    // passing callback so it's readble for the button action
                    // execute after submit done
                    ()=>{
                        // footerHandler.handleClearFormData()
                    })
                }}
                >
                <ModalCreateContent></ModalCreateContent>
            </CmsModal>
            <CmsModal
                title={"Delete Bank"}
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
                    // passing callback so it's readble for the button action
                    // execute after submit done
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