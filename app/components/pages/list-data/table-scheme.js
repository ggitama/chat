import RatingStar from "@/components/RatingStar";
import { Divider, Tag } from "antd";
import { blue, green, red } from "@ant-design/colors";
import Link from "next/link";
import { SortableHeader } from "@/components/Table/sortableHeader";

export const columnsTable = (setIsModalUpdateShow, setIsModalEditShow) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
    fixed: true,
    render: (text, record) => (
      <Link href={`/user/${record.key}`}>
        <a className="gx-link">{text}</a>
      </Link>
    ),
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    key: "thumbnail",
    align: "center",
    width: 100,
    render: () => (
      <img src="/images/widget/flying.png" width={28} alt="test image" />
    ),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: 70,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    width: 180,
    ellipsis: true,
  },
  {
    title: "Star",
    dataIndex: "star",
    key: "star",
    width: 120,
    render: (text, record) => (
      <RatingStar rating={record.star} width={16} height={16} margin={2} />
    ),
  },
  {
    title: "Status",
    key: "status",
    width: 100,
    align: "center",
    render: (text, record) => (
      <Tag
        color={record.status !== "Active" ? "red" : "green"}
        className="gx-m-1"
      >
        {record.status !== "Active" ? "Inactive" : "Active"}
      </Tag>
    ),
  },
  {
    title: "Status",
    key: "status",
    width: 100,
    align: "center",
    render: (text, record) => (
      <Tag
        color={record.status !== "Active" ? "red" : "green"}
        className="gx-m-1"
      >
        {record.status !== "Active" ? "Inactive" : "Active"}
      </Tag>
    ),
  },
  {
    title: "Status",
    key: "status",
    width: 100,
    align: "center",
    render: (text, record) => (
      <Tag
        color={record.status !== "Active" ? "red" : "green"}
        className="gx-m-1"
      >
        {record.status !== "Active" ? "Inactive" : "Active"}
      </Tag>
    ),
  },
  {
    title: "Status",
    key: "status",
    width: 100,
    align: "center",
    render: (text, record) => (
      <Tag
        color={record.status !== "Active" ? "red" : "green"}
        className="gx-m-1"
      >
        {record.status !== "Active" ? "Inactive" : "Active"}
      </Tag>
    ),
  },
  {
    title: "Status",
    key: "status",
    width: 100,
    align: "center",
    render: (text, record) => (
      <Tag
        color={record.status !== "Active" ? "red" : "green"}
        className="gx-m-1"
      >
        {record.status !== "Active" ? "Inactive" : "Active"}
      </Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    width: 200,
    render: (text, record) => (
      <div>
        <button
          className="gx-mb-0 gx-btn-clear"
          style={{ color: blue[5] }}
          onClick={() =>
            setIsModalEditShow({ isLoadingPromise: false, data: record })
          }
        >
          Edit
        </button>
        <Divider type="vertical" />
        <button
          className="gx-mb-0 gx-btn-clear"
          onClick={() =>
            setIsModalUpdateShow({ isLoadingPromise: false, data: record })
          }
          style={{ color: record.status === "Active" ? red[5] : green[5] }}
        >
          {record.status === "Active" ? "Inactivate" : "Activate"}
        </button>
      </div>
    ),
  },
];

export const columnsTableIntegrated = (
  setIsModalUpdateShow,
  setIsModalEditShow,
  dataSort,
  setDataSort
) => [
  {
    title: (
      <SortableHeader
        dataSource={dataSort}
        onChange={setDataSort}
        dataKey="transactionCode"
        title="Transaction Code"
      />
    ),
    dataIndex: "transactionCode",
    key: "transactionCode",
    width: 200,
    fixed: true,
    render: (text, record) => (
      <Link href={`/user/${record.transactionId}`}>
        <a className="gx-link">{text}</a>
      </Link>
    ),
  },
  {
    title: (
      <SortableHeader
        dataSource={dataSort}
        onChange={setDataSort}
        dataKey="customer Email"
        title="Email"
      />
    ),
    dataIndex: "customerEmail",
    key: "customerEmail",
    width: 150,
    ellipsis: true,
  },
  {
    title:    <SortableHeader
    dataSource={dataSort}
    onChange={setDataSort}
    dataKey="phoneNumber"
    title="Phone Number"
  />,
    dataIndex: "customerPhoneNumber",
    key: "customerPhoneNumber",
    width: 180,
    render: (text, record) => {
      return (
        <>
          {record.prefixPhone}
          {text} -ID
        </>
      );
    },
  },
  {
    title: "Tour Name",
    dataIndex: "tourName",
    key: "tourName",
    width: 300,
    ellipsis: true,
  },

  {
    title: "Status",
    dataIndex: "statusTransaction",
    key: "statusTransaction",
    width: 100,
    align: "center",
    render: (text, record) => {
      let classColor = "";
      const status = text ? text.toLowerCase() : text;
      switch (status) {
        case "expired":
          classColor = "red";
          break;

        case "ticketed":
          classColor = "blue";
          break;

        default:
          classColor = "grey";
          break;
      }
      return (
        <Tag color={classColor} className="gx-m-1">
          {text}
        </Tag>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    width: 200,
    render: (text, record) => (
      <div>
        <button
          className="gx-mb-0 gx-btn-clear"
          style={{ color: blue[5] }}
          onClick={() =>
            setIsModalEditShow({ isLoadingPromise: false, data: record })
          }
        >
          Edit
        </button>
        <Divider type="vertical" />
        <button
          className="gx-mb-0 gx-btn-clear"
          onClick={() =>
            setIsModalUpdateShow({ isLoadingPromise: false, data: record })
          }
          style={{ color: record.status === "Active" ? red[5] : green[5] }}
        >
          {record.status === "Active" ? "Inactivate" : "Activate"}
        </button>
      </div>
    ),
  },
];
