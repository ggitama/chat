const CmsTable = ({ columnsTable, listData }) => {
  console.log('Received listData:', listData); // Periksa apakah data diterima dengan benar

  if (!Array.isArray(listData) || listData.length === 0) {
    return <p>No data available</p>; // Tampilkan pesan jika data kosong
  }

  return (
    <table>
      <thead>
        <tr>
          {columnsTable.map((col) => (
            <th key={col.key}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {listData.map((item, index) => (
          <tr key={index}>
            {columnsTable.map((col) => (
              <td key={col.key}>{item[col.dataIndex]}</td> 
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CmsTable;
