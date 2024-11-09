import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ytesting from "../pages/page_impl/ytesting";
import ytestingObj from "../pages/pageobjects/ytesting.obj";
import { ExcelUtilities } from '../../support/ExcelUtilities';


Given("user is able to enter Url",() =>{

//     const visted = ytesting.Vistpage();
//     console.log(`the page is accessable: ${visted}`)
//     cy.fixture("SIT_env").then((testdatavalue) => {
//         cy.log(" the value is "+ testdatavalue.field2.Extra.Address)

//     })
//    cy.log("the css is "+  ytestingObj.Search)



     const filePath = 'Api.xlsx'; // Update this to your actual file path
        const sheetName = 'Sheet1'; // Name of the sheet
        const columnName = 'REQUEST_PAYLOAD'; // Name of the column to look for
        const rowName = 'Two'; // Name of the row to look for

        ExcelUtilities.getCellValue(filePath, sheetName, columnName, rowName).then((value) => {
            cy.log(`Retrieved value: ${value}`);
            expect(value).to.exist; // Example assertion
        });
})