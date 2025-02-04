import { SortableHeader } from "@/components/Table/sortableHeader"

const DataTableHelper = {
  tableHeight:(screenHeight)=>{
    // return screenHeight - 380
    return null
  },
  tableConfig:(heightTable)=>{
    return {
      bordered:true,
      // false pagination to use custom pagination 
      // for server-side pagination
      pagination:false,
      size:"small",
      showHeader:true,
      scroll:{y:heightTable}
    }
  },
  rowNumber:(index,{ pageSize=10, currentPage=0})=>{
    let rowIndex = pageSize*(currentPage-1)
    return rowIndex+index+1
  },
  columnAutoByWeight:(columns)=>{

    let totalWeight = columns.map(row=>row.weight ? row.weight : 0).reduce((a,b)=>{
      return a + b
    },0)

    let eachPro = 100/totalWeight
    return columns.map(row=>{
      row.width = row.weight * eachPro
      return row
    })
  },
  sortableAttr:({dataIndex,key,title,props})=>{
    let {
      state,
      dispatch,
      handler
    } = props

    return {
      title:()=>{
        return <SortableHeader
          dataSource={state?.DATA_SORT}
          onChange={(data)=>{
            handler.sortableOnChange(data)
          }}
          dataKey={dataIndex}
          title={title ? title : dataIndex}
        />
      },
      dataIndex,
      key:(key) ? key : dataIndex
    }
  }
}

export default DataTableHelper