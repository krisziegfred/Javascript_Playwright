const ExcelJs = require('exceljs')

async function excelTest() {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("C:/Excel/ziggyTest.xlsx");
    const worksheet = workbook.addWorksheet("2025 WK14");
    await workbook.xlsx.writeFile("C:/Excel/ziggyTest.xlsx");

}

excelTest();