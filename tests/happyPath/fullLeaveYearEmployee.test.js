const { test, expect } = require('@playwright/test');
const testData = require("../../testData/holidayEntitlementData.json"); 
const HolidayCalculatorPage = require('../../pages/HolidayCalculatorPage');
const ResultsPage = require('../../pages/ResultsPage');
const WorkPatternPage = require('../../pages/WorkPatternPage');

// Parameterized Test for Different dat sets
testData.fullLeaveYearEmployee.forEach(({ daysWorked, expectedEntitlement }) => {
    test(`Calculate Holiday for full leave year employee with ${daysWorked} Days Worked per week.`, async ({ page }) => {
        //Initialize Page Objects
        const holidayCalculator = new HolidayCalculatorPage(page);
        const resultsPage = new ResultsPage(page);
        const workPatternPage = new WorkPatternPage(page);

        await test.step("Open the Holiday Entitlement Calculator", async () => {
            await holidayCalculator.navigate();
        });
        await test.step("Accept Cookies if they are visible", async () => {
            await holidayCalculator.acceptCookies();
        });
        await test.step("Select start now button", async () => {
            await holidayCalculator.selectStartNow();
        });
        await test.step("Complete the form", async () => {
            await workPatternPage.selectIrregularHours('no');
            await workPatternPage.selectHolidayEntitlement('days');
            await workPatternPage.selectWorkOutHolidayFor('full_year');
            await workPatternPage.enterDaysWorked(daysWorked);
        });
        await test.step(`Verify the holiday entitlement is ${expectedEntitlement}`, async () => {
            await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(expectedEntitlement);
        });
        await test.step("Verify form has the correct inputs", async () => {
            await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('No')
            await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('days worked per week')
            await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('for a full leave year')
            await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(daysWorked)
        });
        await test.step(`Start again link is visible.`, async () => {
            await expect(resultsPage.startAgainLink).toBeVisible();
        });
        await test.step(`Verify URL.`, async () => {
            await expect(page).toHaveURL(/days-worked-per-week/);
        });
        console.log(`✅ Verified: ${daysWorked} days → ${expectedEntitlement} expected.`);
    });
});
