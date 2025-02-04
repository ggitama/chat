import RatingStar from "@/components/RatingStar";
import { Divider, Tag } from "antd";
import { blue, green, red } from "@ant-design/colors";
import Link from "next/link" 

export const columnsTable = (setIsModalUpdateShow, setIsModalEditShow) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 70,
  },
  {
    title: "Code",
    dataIndex: "codes",
    key: "codes",
    width: 180,
    ellipsis: true,
  },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    align: "center",
    width: 100,
    render: () => (
      <img src="/images/widget/flying.png" width={28} alt="test image" />
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
