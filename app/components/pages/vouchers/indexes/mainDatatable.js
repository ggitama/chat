import IconWithTextCard from "@/components/Metrics/IconWithTextCard";
import CircularProgress from "@/components/CircularProgress";
import DynamicFilter from "@/components/Form/DynamicFilter";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import { Button, Card, Col, Pagination, Row, Table, Tabs, Collapse, Popover } from "antd";
import { itemsTab } from "./table-scheme";
import { MinusOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  FileExcelFilled,
  FileExcelOutlined,
  FilterFilled,
  FilterOutlined,
} from "@ant-design/icons";

export const MainLoader = ({ heightTable }) => {
  return (
    <>
      <CircularProgress
        className={"gx-w-100"}
        customHeight={heightTable}
        text={"Loading Data"}
      />
    </>
  );
};

export const TabNav = ({ props, children }) => {
  const [
    { activeTab, isShowFilter },
    { setActiveTab, setIsShowFilter },
    { handlerFilterSchema, handlerPagingChangePage },
  ] = props;

  const itemsTabProps = [
    {
      activeTab,
      sectionContent: children,
    },
    { setActiveTab },
    {},
  ];

  return (
    <>
      <Tabs
        defaultActiveKey={activeTab[0]}
        items={itemsTab({ props: [...itemsTabProps] })}
        onChange={(currentKey) => {
          setActiveTab([currentKey]);
          handlerFilterSchema(currentKey);
        }}
      />
    </>
  );
};

export const FilterPage = ({ props }) => {
  const [{ isShowFilter, activeTab }, { setIsShowFilter, setIsOnLoading }] = props;
  return <></>;
};

export const DynamicFilterPage = ({ props }) => {
  const [
    { filterFormData, errorFilterMessage },
    { setIsShowFilter },
    { handlerFilterEvents, handlerFilterUpdate, handlerFilterSubmit },
    { dispatch }
  ] = props;

  const dataFilter = {
    data: filterFormData,
    handle: handlerFilterEvents,
    onChange: handlerFilterUpdate,
    onSubmit: handlerFilterSubmit,
  };
  return (
    <>
      <Card
        bodyStyle={{padding:"0px 0px"}}
        className="mb-2"
      >
        <Collapse
          ghost
          expandIcon={({ isActive }) => {
            let iconCollapse = isActive ? (
              <MinusOutlined className="mr-2 gx-fs-xl" />
            ) : (
              <PlusOutlined className="mr-2 gx-fs-xl" />
            );
            let labelContent = !isActive ? "Show" : "Hide";

            return (
              <Popover content={`${labelContent} Filter`}>{iconCollapse}</Popover>
            );
          }}
          expandIconPosition={"end"}
          onChange={(isCollapseActive) => {
            dispatch({
              type: "IS_SHOW_FILTER",
              data: isCollapseActive.length ? true : false,
            });
          }}
        >
          <CollapsePanel 
            header={<b>Filter</b>} 
            style={{ margin: 0 }}
          >
            <DynamicFilter
              data={filterFormData}
              isBreakRow
              className={"mb-8"}
              dataFilter={{ ...dataFilter }}
              errorMessage={errorFilterMessage}
            />
          </CollapsePanel>
        </Collapse>
      </Card>
    </>
  );
};

export const TablePage = ({ props }) => {
  const [
    {
      tableConfig,
      listData,
      isOnLoading,
      pageSize,
      currentPage,
      columnsTable,
      state,
      dispatch,
      handler,
    },
    { setIsModalCreateShown, setIsModalEditShown, setIsModalUpdateShow },
    {},
  ] = props;

  const columnsTableProps = [
    { pageSize, currentPage, state, dispatch, handler },
    { setIsModalCreateShown, setIsModalEditShown, setIsModalUpdateShow },
  ];
  return (
    <>
      <Table
        className="gx-table-responsive gx-fs-xs mt-4"
        {...tableConfig}
        columns={columnsTable({ props: [...columnsTableProps] })}
        dataSource={listData}
        loading={isOnLoading}
      />
    </>
  );
};

export const TablePagination = ({ props }) => {
  const [
    { pageSize, currentPage, totalData, isOnLoading },
    {},
    { handlerPagingChangePageSize, handlerPagingChangePage },
  ] = props;
  return (
    <>
      <div className="gx-w-100 gx-flex-row gx-justify-content-end gx-mt-4">
        <Pagination
          showSizeChanger
          pageSize={pageSize}
          pageSizeOptions={[10, 25, 50, 100]}
          current={currentPage}
          total={totalData}
          disabled={isOnLoading}
          onShowSizeChange={(current, size) => {
            handlerPagingChangePageSize(size);
          }}
          onChange={(page) => {
            handlerPagingChangePage(page);
          }}
        />
      </div>
    </>
  );
};
