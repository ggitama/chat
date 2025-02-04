import DynamicFilter from "@/components/Form/DynamicFilter"
import { MinusOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { Button, Card, Col, Collapse, Popover, Row } from "antd"
import CollapsePanel from "antd/lib/collapse/CollapsePanel"
import { useState } from "react"
import { CmsButton, CmsButtonInfo, CmsButtonWarning } from "../Buttons"

export const CmsFilter = ({
  filterFormData,
  props,
})=>{

  let isHasFilterPage = filterFormData && filterFormData.length
  if(!isHasFilterPage) return null

  let filterContent = (<CmsFilterContent {...{filterFormData,props}}></CmsFilterContent>)

  return (
    <>
      <Card
        bodyStyle={{padding:"0px 0px"}}
        className="mb-2"
      >
        {filterContent}
      </Card>
    </>
  )
}

export const CmsFilterContent = ({
  filterFormData,
  props
})=>{
  const {
    dispatch
  } = props
  
  return (
    <Collapse
      ghost
      expandIcon={({isActive})=>{
        let iconCollapse = isActive ? (
          <MinusOutlined className="mr-2 gx-fs-xl" />
        ) : (
          <PlusOutlined className="mr-2 gx-fs-xl" />
        )
        let labelContent = !isActive ? "Show" : "Hide"

        return (
          <Popover content={`${labelContent} Filter`}>
            {iconCollapse}
          </Popover>
        )
      }}
      expandIconPosition={"end"}
      onChange={(isCollapseActive)=>{
        dispatch({type:"IS_SHOW_FILTER",data:isCollapseActive.length ? true : false})
      }}
    >
      <CollapsePanel
        header={(<b>Filter</b>)}
        style={{margin:0}}
      >
        <DynamicFilterPage 
          filterFormData={filterFormData}
          props={props}
        />
      </CollapsePanel>
    </Collapse>
  )
}

const DynamicFilterPage = ({
  filterFormData,
  props
})=>{
  const {
    state,
    handler
  } = props

  if( 
    !filterFormData 
    || !filterFormData.length 
    || !state.IS_SHOW_FILTER
  ){
    return null
  }
  
  const btnActions = filterFormData.filter(row=>["ButtonAction","ButtonDownload"].includes(row.type))
  const formOnly = filterFormData.filter(row=>["ButtonAction","ButtonDownload"].includes(row.type)==false)
  const dataFilter={
    data:formOnly,
    handle:handler?.filterEvent,
    onChange:handler?.filterOnChange,
    onSubmit:handler?.filterOnSubmit,
    onDownload:handler?.filterOnDownload
  }

  return (
    <>
      <Card bordered={false}
        style={{marginBottom:0}}
        bodyStyle={{padding:0}} 
      >
        <DynamicFilter
          data={formOnly}
          isBreakRow
          className={"mb-8"}
          dataFilter={{...dataFilter}}
          errorMessage={state?.message?.errorFilter}
        />
      </Card>

      {(
        btnActions.length && 
          <Row style={{
            borderTop:"#d9d9d9 solid 1px",
            paddingLeft:30,
            paddingRight:28,
            marginLeft:-17,
            marginRight:-17,
            }}>
            <Col flex={1}>
              <ButtonActions actions={btnActions} dataFilter={dataFilter}></ButtonActions>
            </Col>
          </Row>
        )}
    </>
  )
}

const ButtonActions = ({
  actions,dataFilter
})=>{
  let actionFilter = actions.filter(row=>row.type=="ButtonAction").shift()
  let actionDownload = actions.filter(row=>row.type=="ButtonDownload").shift()

  return (
    <Card bordered={false}
      bodyStyle={{
        paddingLeft:0,paddingRight:0,
        paddingTop:15,
        paddingBottom:0,
      }} 
      style={{marginBottom:0}}
    >
      <Row>
          <Col flex={1}>
            <Row style={{marginLeft:14}}>
                {actionFilter && (
                  <CmsButtonWarning 
                    title={actionFilter.label} 
                    className={`mb-0 ${actionFilter.style}`}
                    onClick={()=>{
                      dataFilter.onSubmit()
                    }}
                    />
                )}
            </Row>
          </Col>
          <Col flex={1}>
            <Row justify={"end"} style={{marginRight:14}}>
                {
                  actionDownload && (
                    <CmsButtonInfo 
                      title={actionDownload.label} 
                      className={`mb-0 ${actionDownload.style}`}
                      onClick={()=>{
                        dataFilter.onDownload()
                      }}
                    />
                  )
                }
            </Row>
          </Col>
      </Row>
    </Card>
  )
}