const { test, expect } = require("@playwright/test");
const testData = require("../../testData/holidayEntitlementData.json"); 
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");
const ResultsPage = require('../../pages/ResultsPage');
const WorkPatternPage = require('../../pages/WorkPatternPage');

test(`Calculate Holiday for part time ${testData.partTimeEmployee.hoursWorked} worked per week.`, async ({ page }) => {
  //Initialize Page objects
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
    await workPatternPage.selectHolidayEntitlement('hours');
    await workPatternPage.selectWorkOutHolidayFor('full_year');
    await workPatternPage.enterHoursWorked(testData.partTimeEmployee.hoursWorked);
    await workPatternPage.enterDaysWorked(testData.partTimeEmployee.daysWorked);
  });
  await test.step(`Verify the holiday entitlement is ${testData.partTimeEmployee.hoursWorked}`, async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.partTimeEmployee.expectedEntitlement)
  });
  await test.step("Verify form has the correct inputs", async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('No')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('hours worked per week')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('for a full leave year')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.partTimeEmployee.hoursWorked)
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.partTimeEmployee.daysWorked)
  });
  await test.step(`Start again link is visible.`, async () => {
    await expect(resultsPage.startAgainLink).toBeVisible();
  });
  await test.step(`Verify URL.`, async () => {
    await expect(page).toHaveURL(/hours-worked-per-week/);
  });


  console.log(`✅ Verified: Calculate Holiday for ${testData.partTimeEmployee.hoursWorked} worked per week.`);
});
