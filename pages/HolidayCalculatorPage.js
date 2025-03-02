class HolidayCalculatorPage {
    constructor(page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL; // Get BASE_URL from .env
        //accept cookies
        this.acceptCookiesButton = page.getByRole('button', { name: 'Accept additional cookies' });
        //start now
        this.startNowButton =  page.getByRole('button', { name: 'Start now' });
        //Does the employee work irregular hours?
        this.noIrregularHours = page.getByLabel('No');
        this.yesIrregularHours = page.getByLabel('Yes');
        //Is the holiday entitlement based on:
        this.daysWorkedRadio = page.getByLabel('days worked per week');
        this.hoursWorkedRadio = page.getByLabel('hours worked per week');
        this.annualisedHoursRadio = page.getByLabel('annualised hours');
        this.compressedHoursRadio = page.getByLabel('compressed hours');
        //Do you want to work out holiday for:
        this.fullLeaveYearRadio = page.getByLabel('for a full leave year');
        this.startMidYearRadio = page.getByLabel('for someone starting part way through a leave year');
        this.leaveMidYearRadio = page.getByLabel('for someone starting and leaving part way through a leave year');
        //Date Inputs for employemnt start date 
        this.employmentStartDay = page.getByLabel('Day');
        this.employmentStartMonth = page.getByLabel('Month');
        this.employmentStartYear = page.getByLabel('Year');
        //Date Inputs for employment leave year start date
        this.employmentLeaveYearStartDay = page.getByLabel('Day');
        this.employmentLeaveYearStartMonth = page.getByLabel('Month');
        this.employmentLeaveYearStartYear = page.getByLabel('Year');
        //Inputs
        this.daysInput = page.getByTestId('response');
        this.hoursInput = page.getByTestId('response');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.resultText = page.locator('#result-info');
        //Error Messages
        this.errorMessage = page.getByTestId('error-summary');
    }

    async navigate() {
        await this.page.goto('/calculate-your-holiday-entitlement'); // ✅ Uses `baseURL` from Playwright config
    }
    async acceptCookies() {
        if (await this.acceptCookiesButton.isVisible()) {
            await this.acceptCookiesButton.click();
        }
    }
    async selectStartNow() {
        await this.startNowButton.click();
    }
    async selectNoIrregularHours() {
        await this.noIrregularHours.click();
        await this.continueButton.click();
    }
    async selectDaysWorkedPerWeek() {
        await this.daysWorkedRadio.click();
        await this.continueButton.click();
    }
    async selectAnnualisedHours() {
        await this.annualisedHoursRadio.click();
        await this.continueButton.click();
    }
    async selectCompressedHoursRadio() {
        await this.compressedHoursRadio.click();
        await this.continueButton.click();
    }
    async selectHoursWorkedPerWeek() {
        await this.hoursWorkedRadio.click();
        await this.continueButton.click();
    }
    async selectFullLeaveYear() {
        await this.fullLeaveYearRadio.click();
        await this.continueButton.click();
    }
    async selectStartMidYear() {
        await this.startMidYearRadio.click();
        await this.continueButton.click();
    }
    async selectleaveMidYearRadio() {
        await this.leaveMidYearRadio.click();
        await this.continueButton.click();
    }
    async enterEmploymentStartDate(day, month, year) {
        await this.employmentStartDay.fill(day);
        await this.employmentStartMonth.fill(month);
        await this.employmentStartYear.fill(year);
        await this.continueButton.click();
    }
    async enterLeaveYearStartDate(day, month, year) {
        await this.employmentLeaveYearStartDay.fill(day);
        await this.employmentLeaveYearStartMonth.fill(month);
        await this.employmentLeaveYearStartYear.fill(year);
        await this.continueButton.click();
    }
    async enterDaysWorked(days) {
        await this.daysInput.fill(days);
        await this.continueButton.click();
    }
    async enterHoursWorked(hours) {
        await this.hoursInput.fill(hours);
        await this.continueButton.click();
    }
    async getHolidayEntitlement() {
        return await this.resultText.textContent();
    }
    async isErrorVisible() {
        return await this.errorMessage.isVisible(); 
      }
    async validateErrorMessage(message) {
        return await this.errorMessage.textContent(message);
    }
}

module.exports = HolidayCalculatorPage;