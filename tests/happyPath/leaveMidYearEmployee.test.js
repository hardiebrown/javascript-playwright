const { test, expect } = require("@playwright/test");
const HolidayCalculatorPage = require("../../pages/HolidayCalculatorPage");

test(`Calculate Holiday for employee leaving mid year with compressed hours`, async ({ page }) => {
  const holidayCalculator = new HolidayCalculatorPage(page);
  // Step 1: Navigate & Accept Cookies
  await holidayCalculator.navigate();
  await holidayCalculator.acceptCookies();
  // Step 2: Complete the Form
  await holidayCalculator.selectStartNow();
  await holidayCalculator.selectNoIrregularHours();
  await holidayCalculator.selectCompressedHoursRadio();
  await holidayCalculator.selectleaveMidYearRadio();
  await holidayCalculator.enterEmploymentStartDate('01','05','2024');
  await holidayCalculator.enterLeaveYearStartDate('01','01','2025');
  await holidayCalculator.enterHoursWorked('35');
  await holidayCalculator.enterDaysWorked('5');
  // Step 3: Verify the holiday entitlement result
  const holidayEntitlement = await holidayCalculator.getHolidayEntitlement();
  expect(holidayEntitlement).toContain("132 hours and 6 minutes");
  expect(holidayEntitlement).toContain("No");
  expect(holidayEntitlement).toContain("compressed hours");
  expect(holidayEntitlement).toContain("for someone starting and leaving part way through a leave year");
  expect(holidayEntitlement).toContain("1 May 2024");
  expect(holidayEntitlement).toContain("1 January 2025");
  expect(holidayEntitlement).toContain("35.0");
  expect(holidayEntitlement).toContain("5.0");
  console.log(
    `✅ Verified: 132 hours and 6 minutes holiday with compressed hours. Employee leave date 01/05/2024. Leave Year start date 01/01/2025.`
  );
});
