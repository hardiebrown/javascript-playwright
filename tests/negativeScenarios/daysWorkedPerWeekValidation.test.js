const { test, expect } = require("@playwright/test");
const testData = require("../../testData/holidayEntitlementData.json"); 
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");
const WorkPatternPage = require('../../pages/WorkPatternPage');

test(`Form Validation for days worked per week value.`, async ({ page }) => {
  // Initialize Page Objects
  const holidayCalculator = new HolidayCalculatorPage(page);
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

  await test.step("Navigate to Days Worked per Week input", async () => {
    await workPatternPage.selectIrregularHours('no');
    await workPatternPage.selectHolidayEntitlement('days');
    await workPatternPage.selectWorkOutHolidayFor('full_year');
  });
  for (const { scenario, input, expectedError } of testData.daysWorkedPerWeekValidation) {
    await test.step(`Validate ${scenario}`, async () => {
      await workPatternPage.enterDaysWorked(input);
      expect.soft(await workPatternPage.getErrorElement()).toBeVisible();
      expect.soft(await workPatternPage.getErrorElement()).toContainText(expectedError);
    });
  }
  console.log(`✅ Verified form validation for days per week.`);
});
