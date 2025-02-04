import React, { useReducer, useEffect } from "react";
import { CmsTable, CmsTableRow, CmsFilter, CmsCrumbs, CmsLoader } 
    from "@/components/Cms"; 
import axios from "axios";
import { initialState, columnsTable,
    crumbItems, useMainHooks, useModalEditHooks,
    reducer, schemeFilterTable, ModalEditContent,
    useModalCreateHooks, ModalCreateContent } 
    from "@/components/pages/chat-users/indexes"; 
import DataTableHelper from "@/util/cms/datatable.helper"
import { Row } from "antd"
import { CmsModal } from "@/components/Cms/Modals"
import { ModalDeleteContent } from "@/components/pages/chat-users/indexes/modals/ModalDeleteContent"
import { useModalDeleteHooks } from "@/components/pages/chat-users/indexes/hooks/modal-delete.hooks"

const ScreenPage = (props) => {
    const pageTitle = "User Management"
    const [state, dispatch] = useReducer(reducer, initialState);
    const { screenHeight, screenWidth } = props
    const tableHeight = DataTableHelper.tableHeight(screenHeight)
    const tableConfig = DataTableHelper.tableConfig(tableHeight)
    const handler = useMainHooks( state, dispatch )

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
            pageSizeOptions={[10,25,50,100]}
        >
            <CmsTableRow key={"prepend"}>
                <CmsFilter
                    filterFormData={state.FORM_FILTER}
                    props={{state,dispatch,handler}}
                />
            </CmsTableRow>
        </CmsTable>

        <CmsModal
                        title={"Delete Push Notification"}
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
    );
};

export default ScreenPage;
