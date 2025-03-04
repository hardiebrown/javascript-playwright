const { test, expect } = require("@playwright/test");
const testData = require("../../testData/holidayEntitlementData.json"); 
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");
const ResultsPage = require('../../pages/ResultsPage');
const LeaveDatePage = require('../../pages/LeaveDatePage'); 
const WorkPatternPage = require('../../pages/WorkPatternPage');

test(`Calculate Holiday for employee starting mid year with annualised hours.`, async ({ page }) => {
  //Initialize Page Objects
  const holidayCalculator = new HolidayCalculatorPage(page);
  const resultsPage = new ResultsPage(page);
  const leaveDatePage = new LeaveDatePage(page);
  const workPatternPage = new WorkPatternPage(page);
  const expectedStartDate = await leaveDatePage.getFormattedEntitlementDate(testData.startMidYearEmployee.employmentStartDate);
  const expectedLeaveYearStartDate = await leaveDatePage.getFormattedEntitlementDate(testData.startMidYearEmployee.employmentLeaveYearStartDate);

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
  await workPatternPage.selectHolidayEntitlement('annualised');
  await workPatternPage.selectWorkOutHolidayFor('starting');
  await leaveDatePage.enterEmploymentStartDate(testData.startMidYearEmployee.employmentStartDate);
  await leaveDatePage.enterLeaveYearStartDate(testData.startMidYearEmployee.employmentLeaveYearStartDate);
  });
  await test.step(`Verify the holiday entitlement is ${testData.startMidYearEmployee.expectedEntitlement}`, async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.startMidYearEmployee.expectedEntitlement);
  });
  await test.step("Verify form has the correct inputs", async () => {
  await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('No');
  await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('annualised hours');
  await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('for someone starting part way through a leave year');
  await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(expectedStartDate);
  await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(expectedLeaveYearStartDate);
  });
  await test.step(`Start again link is visible.`, async () => {
    await expect(resultsPage.startAgainLink).toBeVisible();
  });
  await test.step(`Verify URL.`, async () => {
    await expect(page).toHaveURL(/annualised-hours/);
  });
  console.log(
    `✅ Verified: ${testData.startMidYearEmployee.expectedEntitlement} holiday. 
    Start date -> ${expectedStartDate}. Leave Year Start Date -> ${expectedLeaveYearStartDate}`
  );
});
