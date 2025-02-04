import { SortableHeader } from "@/components/Table/sortableHeader";
import { Divider } from "antd";

export const formFilterScheme = () => [
  {
    label: "Name",
    type: "Input",
    field: "name",
    value: "",
    width: "50%"
  },
  {
    label: "Code",
    type: "Input",
    field: "codes",
    value: "",
    width: "calc(100% - 110px)",
  },

  {
    label: "Apply Filter",
    type: "ButtonAction",
    disabled: false,
    width: "110px",
    style: "ant-btn gx-btn-secondary ",
  },
];

export const columnTableScheme = (
  setIsModalUpdateShow, setIsModalEditShow, dataSort, setDataSort
) => [
  {
    title: (
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="id"
      title="Id"
    />
    ),
    dataIndex: "id",
    key: "id",
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="name"
      title="Name"
    />
    ),
    dataIndex: "name",
    key: "name"
  },
  {
    title:(
      <SortableHeader
      dataSource={dataSort}
      onChange={setDataSort}
      dataKey="codes"
      title="Source"
    />
    ),
    dataIndex: "codes",
    key: "codes"
  },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    render: (text, row, index) => (
      <img src={`${row.logo}`} crossorigin="true" width={28} alt="test image" />
    )
  },
  {
    title: "Action",
    key: "action",
    width: 200,
    render: (text, record) => (
      <div>
        <button
          className="gx-mb-0 gx-btn-clear"
          onClick={() => 
            setIsModalEditShow({ 
              isLoadingPromise: false,
              data: record
            })
          }
        >
          Edit
        </button>
        <Divider type="vertical" />
        <button
          className="gx-mb-0 gx-btn-clear"
          onClick={() => 
            setIsModalUpdateShow({ 
              isLoadingPromise: false,
              data: record
            })
          }
        >
          Delete
        </button>
      </div>
    )
  }
]
