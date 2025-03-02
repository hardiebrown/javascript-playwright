const { test, expect } = require("@playwright/test");
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");

test(`Calculate Holiday for employee starting mid year with annualised hours.`, async ({ page }) => {
  const holidayCalculator = new HolidayCalculatorPage(page);
  // Step 1: Navigate & Accept Cookies
  await holidayCalculator.navigate();
  await holidayCalculator.acceptCookies();
  // Step 2: Complete the Form
  await holidayCalculator.selectStartNow();
  await holidayCalculator.selectNoIrregularHours();
  await holidayCalculator.selectAnnualisedHours();
  await holidayCalculator.selectStartMidYear();
  await holidayCalculator.enterEmploymentStartDate('01','05','2024');
  await holidayCalculator.enterLeaveYearStartDate('01','01','2024');
  // Step 3: Verify the holiday entitlement result
  const holidayEntitlement = await holidayCalculator.getHolidayEntitlement();
  expect(holidayEntitlement).toContain("3.74 weeks");
  //Step 7: Does the employee work irregular hours or for part of the year?
  expect(holidayEntitlement).toContain("No");
  //Step 6: Is the holiday entitlement based on:
  expect(holidayEntitlement).toContain("annualised hours");
  //Step 5: Do you want to work out holiday.
  expect(holidayEntitlement).toContain("for someone starting part way through a leave year");
  //Step 5: Do you want to work out holiday.
  expect(holidayEntitlement).toContain("1 May 2024");
  //Step 7: Number of days worked per week?
  expect(holidayEntitlement).toContain("1 January 2024");
  console.log(
    `✅ Verified: 3.74 weeks holiday with annualised hours. Employee start date 01/05/2024. Leave Year start date 01/01/2025.`
  );
});
