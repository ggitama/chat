
export const TableShowData = ({dataSource})=>{
  return (
    <div className="ant-table ant-table-small ant-table-bordered mb-4">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            <tbody className="ant-table-tbody">
              {dataSource.map((row,index)=>{
                let rowKey = row.key || row.label
                rowKey = `test-${rowKey}-${index}`
                return (
                  <tr 
                    key={rowKey}
                    data-row-key={rowKey}
                    className="ant-table-row ant-table-row-level-0"
                    >
                    <td
                      key={`${rowKey}-td-0`}
                      style={{width:"20%"}} 
                      className="ant-table-cell"
                      >{row.label}</td>
                    <td 
                      key={`${rowKey}-td-1`}
                      className="ant-table-cell"
                      >{row.value}</td>
                  </tr>
                ) 
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const TableWrapper = ({children})=>{
  return (
    <div className="ant-table ant-table-small ant-table-bordered mb-4">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table>
            {children}
          </table>
        </div>
      </div>
    </div>
  )
}