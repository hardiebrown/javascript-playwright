const { test, expect } = require("@playwright/test");
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");

test(`Form Validation for days worked per week value.`, async ({ page }) => {
  const holidayCalculator = new HolidayCalculatorPage(page);
  await test.step("Open the Holiday Entitlement Calculator", async () => {
    await holidayCalculator.navigate();
  });
  await test.step("Accept Cookies if they are visible", async () => {
    await holidayCalculator.acceptCookies();
  });
  await test.step("Select start now button", async () => {
    await holidayCalculator.selectStartNow();
  });
  await test.step("Naviagte to Days Worked per Week input", async () => {
    await holidayCalculator.selectNoIrregularHours();
    await holidayCalculator.selectDaysWorkedPerWeek();
    await holidayCalculator.selectFullLeaveYear();
  });
  await test.step("Validate negative value.", async () => {
    await holidayCalculator.enterDaysWorked('-5');
    await holidayCalculator.isErrorVisible();
    await holidayCalculator.validateErrorMessage('There are only 7 days in a week. Please check and enter a correct value.');
  });
  await test.step("Validate only 7 days in a week.", async () => {
    await holidayCalculator.enterDaysWorked('7.1');
    await holidayCalculator.isErrorVisible();
    await holidayCalculator.validateErrorMessage('There are only 7 days in a week. Please check and enter a correct value.');
  });
  console.log(`✅ Verified form valiation for days per week.`);
});
