class HolidayCalculatorPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL; // Get BASE_URL from .env
    //accept cookies
    this.acceptCookiesButton = page.getByRole("button", {
      name: "Accept additional cookies",
    });
    //start now
    this.startNowButton = page.getByRole("button", { name: "Start now" });
  }

  async navigate() {
    await this.page.goto("/calculate-your-holiday-entitlement"); // ✅ Uses `baseURL` from Playwright config
  }
  async acceptCookies() {
    if (await this.acceptCookiesButton.isVisible()) {
      await this.acceptCookiesButton.click();
    }
  }
  async selectStartNow() {
    await this.startNowButton.click();
  }
}

module.exports = HolidayCalculatorPage;
