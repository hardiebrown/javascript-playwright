const { test, expect } = require("@playwright/test");
const testData = require("../../testData/holidayEntitlementData.json"); 
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");
const ResultsPage = require('../../pages/ResultsPage');
const WorkPatternPage = require('../../pages/WorkPatternPage');
const LeaveDatePage = require('../../pages/LeaveDatePage'); 


test(`Calculate Holiday for irregular hours employee with ${testData.irregularHoursEmployee.shiftHours} hour shifts.`, async ({ page }) => {
  //Initialize Page objects
  const holidayCalculator = new HolidayCalculatorPage(page);
  const resultsPage = new ResultsPage(page);
  const workPatternPage = new WorkPatternPage(page);
  const leaveDatePage = new LeaveDatePage(page);
  const expectedLeaveYearDate = await leaveDatePage.getFormattedEntitlementDate(testData.irregularHoursEmployee.employmentLeaveYearStartDate);

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
    await workPatternPage.selectIrregularHours('yes');
    await leaveDatePage.enterEmploymentStartDate(testData.irregularHoursEmployee.employmentLeaveYearStartDate);
    await workPatternPage.selectHolidayEntitlement('shifts');
    await workPatternPage.selectWorkOutHolidayFor('full_year');
    await workPatternPage.enterShiftHours(testData.irregularHoursEmployee.shiftHours);
    await workPatternPage.enterNoOfShifts(testData.irregularHoursEmployee.noOfShifts);
    await workPatternPage.enterShiftDays(testData.irregularHoursEmployee.shiftDays);

  });
  await test.step(`Verify the holiday entitlement is ${testData.irregularHoursEmployee.expectedEntitlement}`, async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.irregularHoursEmployee.expectedEntitlement)
  });
  await test.step("Verify form has the correct inputs", async () => {
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('Yes')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('shifts')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText('for a full leave year')
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(expectedLeaveYearDate);
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.irregularHoursEmployee.shiftHours)
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.irregularHoursEmployee.noOfShifts)
    await expect(resultsPage.getHolidayEntitlementSummary()).toContainText(testData.irregularHoursEmployee.shiftDays)

  });
  await test.step(`Start again link is visible.`, async () => {
    await expect(resultsPage.startAgainLink).toBeVisible();
  });
  await test.step(`Verify URL.`, async () => {
    await expect(page).toHaveURL(/shift-worker/);
  });


  console.log(`✅ Verified: Calculate Holiday for irregular hours employee with ${testData.irregularHoursEmployee.shiftHours} hour shifts.`);
});
