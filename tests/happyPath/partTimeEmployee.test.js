const { test, expect } = require("@playwright/test");
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");

test(`Calculate Holiday for 20 hours Worked`, async ({ page }) => {
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
  await test.step("Complete the form", async () => {
    await holidayCalculator.selectNoIrregularHours();
    await holidayCalculator.selectHoursWorkedPerWeek();
    await holidayCalculator.selectFullLeaveYear();
    await holidayCalculator.enterHoursWorked("20");
    await holidayCalculator.enterDaysWorked("3");
  });
  await test.step("Verify the holiday entitlement is 112 hours", async () => {
    const holidayEntitlement = await holidayCalculator.getHolidayEntitlement();
    expect(holidayEntitlement).toContain("112 hours");
  });
  await test.step("Verify form has the correct inputs", async () => {
    const holidayEntitlement = await holidayCalculator.getHolidayEntitlement();
    expect(holidayEntitlement).toContain("No");
    expect(holidayEntitlement).toContain("hours worked per week");
    expect(holidayEntitlement).toContain("for a full leave year");
    expect(holidayEntitlement).toContain("20.0");
    expect(holidayEntitlement).toContain("3.0");
  });
  // await test.step("Verify URL", async () => {
  //   await expect(page).toHaveURL(`${baseURL}/calculate-your-holiday-entitlement/y/regular/hours-worked-per-week/full-year/20.0/3.0`);
  // });
  console.log(`✅ Verified: 20 hours at 3 days per week → 112 hours expected.`);
});
