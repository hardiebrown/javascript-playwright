class ResultsPage {
  constructor(page) {
    //Final Page summary
    this.resultText = page.getByTestId("result-info");
    this.startAgainLink = page.getByRole('link', { name: 'Start again' });
  }
  getHolidayEntitlementSummary() {
    return this.resultText;
  }
  async clickStartAgain() {
    await this.startAgainLink.click();
}
}

module.exports = ResultsPage;
