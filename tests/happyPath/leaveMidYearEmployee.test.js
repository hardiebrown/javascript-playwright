const { test, expect } = require("@playwright/test");
const testData = require("../../testData/holidayEntitlementData.json"); 
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");
const ResultsPage = require('../../pages/ResultsPage');
const LeaveDatePage = require('../../pages/LeaveDatePage'); 
const WorkPatternPage = require('../../pages/WorkPatternPage');

test(`Calculate Holiday for employee leaving mid year with compressed hours`, async ({ page }) => {
  //Initialize Page Objects 
  const holidayCalculator = new HolidayCalculatorPage(page);
  const resultsPage = new ResultsPage(page);
  const leaveDatePage = new LeaveDatePage(page);
  const workPatternPage = new WorkPatternPage(page);
  const expectedEndDate = await leaveDatePage.getFormattedEntitlementDate(testData.leaveMidYearEmployee.employmentEndDate);
  const expectedLeaveYearDate = await leaveDatePage.getFormattedEntitlementDate(testData.leaveMidYearEmployee.employmentLeaveYearStartDate);

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
    await workPatternPage.selectHolidayEntitlement('compressed');
    await workPatternPage.selectWorkOutHolidayFor('leaving');
    await leaveDatePage.enterEmploymentEndDate(testData.leaveMidYearEmployee.employmentEndDate);
    await leaveDatePage.enterLeaveYearStartDate(testData.leaveMidYearEmployee.employmentLeaveYearStartDate);
    await workPatternPage.enterHoursWorked(testData.leaveMidYearEmployee.hoursWorked);
    await workPatternPage.enterDaysWorked(testData.leaveMidYearEmployee.daysWorked);
  });
  await test.step("Verify the holiday entitlement is 65 hours and 24 minutes", async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.leaveMidYearEmployee.expectedEntitlement)
  });
  await test.step("Verify form has the correct inputs", async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('No')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('compressed hours')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('for someone leaving part way through a leave year')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(expectedEndDate)
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(expectedLeaveYearDate)
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.leaveMidYearEmployee.hoursWorked)
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.leaveMidYearEmployee.daysWorked)
  });
  await test.step(`Start again link is visible.`, async () => {
    await expect(resultsPage.startAgainLink).toBeVisible();
  });
  await test.step(`Verify URL.`, async () => {
    await expect(page).toHaveURL(/compressed-hours/);
  });
  console.log(
    `✅ Verified: ${testData.startMidYearEmployee.expectedEntitlement} holiday. 
    Start date -> ${expectedEndDate}. Leave Year Start Date -> ${expectedLeaveYearDate}`
  );
});
