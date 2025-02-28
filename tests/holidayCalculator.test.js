// const { test, expect } = require('@playwright/test');

// test('Full-Time Employee - 5-day Work Week - Holiday Calculation', async ({ page }) => {
//     // Step 1: Navigate to the calculator
//     await page.goto('https://www.gov.uk/calculate-your-holiday-entitlement');

//     // Step 2: Handle cookie consent banner (if it appears)
//     const acceptCookiesButton = page.locator('button[data-accept-cookies="true"]'); // Update this selector if needed
//     if (await acceptCookiesButton.isVisible()) {
//         await acceptCookiesButton.click();
//     }

//     // Step 3: Click "Start now"
//     await page.locator('a.govuk-button').click();

//     await page.locator('#response-1').click();
//     await page.getByRole('button', { name: 'Continue' }).click();

//     await page.getByLabel('Days worked per week').click();
//     await page.getByRole('button', { name: 'Continue' }).click();
//     // Step 4: Select "Full-time"
//     await page.getByLabel('for a full leave year').click();
//     await page.getByRole('button', { name: 'Continue' }).click();

//     // Step 7: Enter "5" working days per week
//     await page.locator('#response').fill('5');
//     await page.getByRole('button', { name: 'Continue' }).click();

//     // Step 8: Verify the holiday entitlement result
//     const resultText = await page.locator('#result-info').textContent();
//     expect(resultText).toContain('28 days');

//     console.log('✅ Holiday entitlement calculation successful: 28 days expected and found.');
// });
const { test, expect } = require('@playwright/test');
const HolidayCalculatorPage = require('../pageObjects/HolidayCalculatorPage');

test('Full-Time Employee - 5-day Work Week - Holiday Calculation', async ({ page }) => {
    const holidayCalculator = new HolidayCalculatorPage(page);

    // Step 1: Navigate & Accept Cookies
    await holidayCalculator.navigate();
    await holidayCalculator.acceptCookies();

    // Step 2: Complete the Form
    await holidayCalculator.startCalculation();
    await holidayCalculator.selectFullTimeEmployment();
    await holidayCalculator.selectDaysWorkedPerWeek();
    await holidayCalculator.selectFullLeaveYear();
    await holidayCalculator.enterDaysWorked('5');

    // Step 3: Verify the holiday entitlement result
    const result = await holidayCalculator.getHolidayEntitlement();
    expect(result).toContain('28 days');

    console.log('✅ Holiday entitlement calculation successful: 28 days expected and found.');
});
