class HolidayCalculatorPage {
    constructor(page) {
        this.page = page;
        this.acceptCookiesButton = page.locator('button[data-accept-cookies="true"]');
        this.startNowButton = page.locator('a.govuk-button');
        this.fullTimeRadio = page.locator('#response-1'); // Select Full-Time
        this.daysWorkedRadio = page.getByLabel('Days worked per week');
        this.fullLeaveYearRadio = page.getByLabel('for a full leave year');
        this.daysInput = page.locator('#response');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.resultText = page.locator('#result-info');
    }

    async navigate() {
        await this.page.goto('https://www.gov.uk/calculate-your-holiday-entitlement');
    }

    async acceptCookies() {
        if (await this.acceptCookiesButton.isVisible()) {
            await this.acceptCookiesButton.click();
        }
    }

    async startCalculation() {
        await this.startNowButton.click();
    }

    async selectFullTimeEmployment() {
        await this.fullTimeRadio.click();
        await this.continueButton.click();
    }

    async selectDaysWorkedPerWeek() {
        await this.daysWorkedRadio.click();
        await this.continueButton.click();
    }

    async selectFullLeaveYear() {
        await this.fullLeaveYearRadio.click();
        await this.continueButton.click();
    }

    async enterDaysWorked(days) {
        await this.daysInput.fill(days);
        await this.continueButton.click();
    }

    async getHolidayEntitlement() {
        return await this.resultText.textContent();
    }
}

module.exports = HolidayCalculatorPage;
