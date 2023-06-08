import { Workbook } from "exceljs"

const exportToExcel = (worksheetName, tableHead, sortedData, ...propertyName) => {


    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet(`${worksheetName}`)

    tableHead.forEach((column, index) => {
        worksheet.getCell(1, index + 1).value = column.title;
    })

    sortedData.value.forEach((data, rowIndex, array) => {
        
        // there's no columnIndex here 
        propertyName.forEach((a, columnIndex, c) => {
          worksheet.getCell(rowIndex + 2, columnIndex + 1).value = `${data[a]}`
        })
    
    })

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "user_data.xlsx";
        a.click();
        URL.revokeObjectURL(url);
      })

}

export default exportToExcel