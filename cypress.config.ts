import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
import { Workbook } from 'exceljs';
import * as fs from 'fs';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more.
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    preprocessor(config, {
      typescript: require.resolve("typescript"),
    }),
  );

  // Add the Excel reading task
  on('task', {
    readExcel({ filePath, sheetName, columnName, rowName }) {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const workbook = new Workbook();
      return workbook.xlsx.readFile(filePath).then(() => {
        const worksheet = workbook.getWorksheet(sheetName);
        if (!worksheet) {
          throw new Error(`Sheet "${sheetName}" not found.`);
        }

        const headerRow = worksheet.getRow(1);
        const values = headerRow.values;

        if (!values || !Array.isArray(values)) {
          throw new Error(`Header row values are not valid.`);
        }

        const columnIndex = values.indexOf(columnName);
        if (columnIndex === -1) {
          throw new Error(`Column "${columnName}" not found.`);
        }

        let cellValue: any = null;
        worksheet.eachRow((row) => {
          if (row.getCell(1).value === rowName) {
            cellValue = row.getCell(columnIndex).value;
          }
        });

        if (cellValue === null) {
          throw new Error(`Row "${rowName}" not found.`);
        }

        return cellValue;
      });
    }
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    baseUrl: "https://example.cypress.io",
    defaultCommandTimeout: 1000,
    specPattern: 'cypress/e2e/features/*.feature',
    supportFile: 'dist/cypress/support/e2e.js', // Point to the output directory where compiled JS files are located
    setupNodeEvents,
  },
});
