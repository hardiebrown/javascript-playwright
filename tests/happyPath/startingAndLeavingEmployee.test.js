const { test, expect } = require("@playwright/test");
const testData = require("../../testData/holidayEntitlementData.json"); 
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");
const ResultsPage = require('../../pages/ResultsPage');
const WorkPatternPage = require('../../pages/WorkPatternPage');
const LeaveDatePage = require('../../pages/LeaveDatePage'); 


test(`Calculate Holiday for employee starting and leaving with ${testData.startingAndLeavingEmployee.hoursWorked} hours orked per week.`, async ({ page }) => {
  //Initialize Page objects
  const holidayCalculator = new HolidayCalculatorPage(page);
  const resultsPage = new ResultsPage(page);
  const workPatternPage = new WorkPatternPage(page);
  const leaveDatePage = new LeaveDatePage(page);
  const expectedStartDate = await leaveDatePage.getFormattedEntitlementDate(testData.startingAndLeavingEmployee.employmentStartDate);
  const expectedEndDate = await leaveDatePage.getFormattedEntitlementDate(testData.startingAndLeavingEmployee.employmentEndDate);

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
    await workPatternPage.selectWorkOutHolidayFor('starting_and_leaving');
    await leaveDatePage.enterEmploymentStartDate(testData.startingAndLeavingEmployee.employmentStartDate);
    await leaveDatePage.enterLeaveYearStartDate(testData.startingAndLeavingEmployee.employmentEndDate);
    await workPatternPage.enterHoursWorked(testData.startingAndLeavingEmployee.hoursWorked);
    await workPatternPage.enterDaysWorked(testData.startingAndLeavingEmployee.daysWorked);
  });
  await test.step(`Verify the holiday entitlement is ${testData.startingAndLeavingEmployee.expectedEntitlement}`, async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.startingAndLeavingEmployee.expectedEntitlement)
  });
  await test.step("Verify form has the correct inputs", async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('No')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('hours worked per week')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('for someone starting and leaving part way through a leave year')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(expectedStartDate);
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(expectedEndDate);
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.startingAndLeavingEmployee.hoursWorked)
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.startingAndLeavingEmployee.daysWorked)
  });
  await test.step(`Start again link is visible.`, async () => {
    await expect(resultsPage.startAgainLink).toBeVisible();
  });
  await test.step(`Verify URL.`, async () => {
    await expect(page).toHaveURL(/hours-worked-per-week/);
  });


  console.log(`✅ Verified: Calculate Holiday for ${testData.startingAndLeavingEmployee.hoursWorked} worked per week.`);
});
