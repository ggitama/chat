import { 
  CmsCrumbs, 
  CmsFilter, 
  CmsLoader, CmsTable, CmsTableRow,
} from "@/components/Cms"
import { CmsButton } from "@/components/Cms/Buttons"
import { CmsModal } from "@/components/Cms/Modals"
import { 
  columnsTable,
  crumbItems, initialState, reducer, 
  schemeFilterTable, 
  useMainHooks,
  useModalEditHooks,
  useModalEditPasswordHooks, 
  userModalAddUserHooks, 
  ModalEditContent, ModalResetPasswordContent, ModalAddUserContent, useEffectMains, 
} from "@/components/pages/users/indexes"

import DataTableHelper from "@/util/cms/datatable.helper"
import { Col, Divider, Row } from "antd"
import { useEffect, useReducer } from "react"

const ScreenPage = (props)=>{
  const pageTitle = "User Management"

  const{screenHeight,screenWidth} = props
  const tableHeight = DataTableHelper.tableHeight(screenHeight)
  const tableConfig = DataTableHelper.tableConfig(tableHeight)

  const [state,dispatch] = useReducer(reducer,initialState)

  useEffect(()=>{
    dispatch({type:"FORM_FILTER",data:schemeFilterTable()})
  },[])

  const handler = useMainHooks(state,dispatch)

  useEffect(()=>{
    handler.handleGetRoleList()
    handler.handleGetListData()
  },[])

  useEffectMains(state,handler)

  if(state.IS_ON_LOADING && !state.DATA_LIST?.length){
    return (<CmsLoader customHeight={tableHeight} text="Loading"/>)
  }

  return (
  <>
    <CmsCrumbs
      items={crumbItems()}
    />
    
    <CmsTable
      title={pageTitle}
      tableConfig={tableConfig}
      columnsTable={columnsTable}
      listData={state?.DATA_LIST}
      props={{state,dispatch,handler}}
      pageSizeOptions={[10,25,50,100]}
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
    >
      {/* <CmsTableRow key={"prepend"}>
        <CmsButton
        title={"Add New"}
        onClick={()=>{
          dispatch({
            type:"IS_SHOW_MODAL_CREATE",data:{
              isPromise:false,
            }
          })
        }}
        />
        <CmsFilter
          filterFormData={state.FORM_FILTER}
          props={{state,dispatch,handler}}
        />
      </CmsTableRow> */}

    </CmsTable>

    <CmsModal
      title={"User Detail"}
      hasTitleKey={"email"}
      stateKey={"IS_SHOW_MODAL_EDIT"}
      props={{state,dispatch,handler}}
      modalHooks={useModalEditHooks}
      labelConfirm={"Update User"}
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
          }
        )
      }}
    >
      <ModalEditContent></ModalEditContent>

      <Divider orientation="left" style={{
        fontWeight:"bold"
        }}> 
        Action(s) 
      </Divider>
      <Row>
        <Col style={{marginLeft:16}}>
          <CmsButton 
            title={"Reset Password"} 
            type={"secondary"}
            onClick={()=>{
              const modalEditData = state.IS_SHOW_MODAL_EDIT
              dispatch({
                type:"IS_SHOW_MODAL_RESET",data:{
                  isPromise:false,
                  dataRow:modalEditData?.dataRow
                }
              })
            }}
          ></CmsButton>
        </Col>
      </Row>
    </CmsModal>

    <CmsModal
      title={"Reset Password"}
      hasTitleKey={"email"}
      stateKey={"IS_SHOW_MODAL_RESET"}
      props={{state,dispatch,handler}}
      modalHooks={useModalEditPasswordHooks}
      labelConfirm={"Reset Password"}
      labelClose={"Close"}
      onClickClose={(footerHandler)=>{
        footerHandler.handleClearFormData()
      }}
      onClickConfirm={(activeFormData,footerHandler)=>{
        footerHandler.handleResetPassword(activeFormData,
          // passing callback so it's readble for the button action
          // execute after submit done
          ()=>{
            footerHandler.handleClearFormData()
          }
        )
      }}
    >
      <ModalResetPasswordContent></ModalResetPasswordContent>
    </CmsModal>

    <CmsModal
      title={"New User"}
      hasTitleKey={false}
      stateKey={"IS_SHOW_MODAL_CREATE"}
      props={{state,dispatch,handler}}
      modalHooks={userModalAddUserHooks}
      labelConfirm={"Create User"}
      labelClose={"Close"}
      onClickClose={(footerHandler)=>{
        footerHandler.handleClearFormData()
      }}
      onClickConfirm={(activeFormData,footerHandler)=>{
        footerHandler.handleModalAddSubmit(activeFormData,
          // passing callback so it's readble for the button action
          // execute after submit done
          ()=>{
            footerHandler.handleClearFormData()
          }
        )
      }}
    >
      <ModalAddUserContent></ModalAddUserContent>
    </CmsModal>

  </>
  )
}

export default ScreenPage