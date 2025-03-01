// const { test, expect } = require('@playwright/test');
// const HolidayCalculatorPage = require('../pageObjects/HolidayCalculatorPage');

// test('Full-Time Employee - 5-day Work Week - Holiday Calculation', async ({ page }) => {
//     const holidayCalculator = new HolidayCalculatorPage(page);

//     // Step 1: Navigate & Accept Cookies
//     await holidayCalculator.navigate();
//     await holidayCalculator.acceptCookies();

//     // Step 2: Complete the Form
//     await holidayCalculator.startCalculation();
//     await holidayCalculator.selectFullTimeEmployment();
//     await holidayCalculator.selectDaysWorkedPerWeek();
//     await holidayCalculator.selectFullLeaveYear();
//     await holidayCalculator.enterDaysWorked('5');

//     // Step 3: Verify the holiday entitlement result
//     const result = await holidayCalculator.getHolidayEntitlement();
//     expect(result).toContain('28 days');

//     console.log('✅ Holiday entitlement calculation successful: 28 days expected and found.');
// });

const { test, expect } = require('@playwright/test');
const fs = require('fs');
import Papa from 'papaparse';
const HolidayCalculatorPage = require('../pageObjects/HolidayCalculatorPage');

// Read CSV File
const csvData = fs.readFileSync('testData/holidayData.csv', 'utf8');
const testCases = Papa.parse(csvData, { header: true }).data;

// Parameterized Test for Different Work Patterns
testCases.forEach(({ days_worked, expected_holiday }) => {
    console.log("Parsed Test Cases:", testCases);
    test(`Calculate Holiday for ${days_worked} Days Worked`, async ({ page }) => {
        const holidayCalculator = new HolidayCalculatorPage(page);
        // Step 1: Navigate & Accept Cookies
        await holidayCalculator.navigate();
        await holidayCalculator.acceptCookies();

        // Step 2: Complete the Form
        await holidayCalculator.startCalculation();
        await holidayCalculator.selectFullTimeEmployment();
        await holidayCalculator.selectDaysWorkedPerWeek();
        await holidayCalculator.selectFullLeaveYear();
        await holidayCalculator.enterDaysWorked(days_worked);

        // Step 3: Verify the holiday entitlement result
        const result = await holidayCalculator.getHolidayEntitlement();
        expect(result).toContain(expected_holiday);

        console.log(`✅ Verified: ${days_worked} days → ${expected_holiday} expected.`);
    });
});
