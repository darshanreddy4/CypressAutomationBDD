export class ExcelUtilities {
    static getCellValue(filePath: string, sheetName: string, columnName: string, rowName: string): Cypress.Chainable<any> {
        return cy.task<any>('readExcel', { filePath, sheetName, columnName, rowName });
    }
}
