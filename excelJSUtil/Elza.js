const ExcelJs = require('exceljs')

async function scanColumn() {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("C:/Excel/ExcelTest.xlsx"); // Load file
    const worksheet = workbook.getWorksheet('Sheet1'); // Get sheet

    worksheet.getColumn(2).eachCell((cell, rowNumber) => { // Scan Column A (1st column)
        console.log(`Row ${rowNumber}: ${cell.value}`);
    });
}

scanColumn();
 