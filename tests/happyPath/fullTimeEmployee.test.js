const { test, expect } = require('@playwright/test');
const fs = require('fs');
import Papa from 'papaparse';
const HolidayCalculatorPage = require('../../pages/HolidayCalculatorPage');

// Read CSV File
const csvData = fs.readFileSync('testData/holidayData.csv', 'utf8');
const testCases = Papa.parse(csvData, { header: true }).data;

// Parameterized Test for Different Work Patterns
testCases.forEach(({ days_worked, expected_holiday }) => {
    // console.log("Parsed Test Cases:", testCases);
    test(`Calculate Holiday for ${days_worked} Days Worked`, async ({ page }) => {
        const holidayCalculator = new HolidayCalculatorPage(page);
        // Step 1: Navigate & Accept Cookies
        await holidayCalculator.navigate();
        await holidayCalculator.acceptCookies();
        // Step 2: Complete the Form
        await holidayCalculator.selectStartNow();
        await holidayCalculator.selectNoIrregularHours();
        await holidayCalculator.selectDaysWorkedPerWeek();
        await holidayCalculator.selectFullLeaveYear();
        await holidayCalculator.enterDaysWorked(days_worked);
        // Step 3: Verify the holiday entitlement result
        const holidayEntitlement = await holidayCalculator.getHolidayEntitlement();
        expect(holidayEntitlement).toContain(expected_holiday);
        //Step 7: Does the employee work irregular hours or for part of the year?
        expect(holidayEntitlement).toContain("No");
        //Step 6: Is the holiday entitlement based on:
        expect(holidayEntitlement).toContain("days worked per week");
        //Step 5: Do you want to work out holiday.
        expect(holidayEntitlement).toContain("for a full leave year");
        //Step 7: Number of days worked per week?
        expect(holidayEntitlement).toContain(days_worked);
        console.log(`✅ Verified: ${days_worked} days → ${expected_holiday} expected.`);
    });
});
