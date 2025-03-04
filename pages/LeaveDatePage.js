const { format, parse } = require('date-fns'); 

class LeaveDatePage {
    constructor(page) {
        //Date Inputs for employemnt start date
        this.employmentStartDay = page.getByRole('textbox', { name: "Day"});
        this.employmentStartMonth = page.getByRole('textbox', { name: "Month"});
        this.employmentStartYear = page.getByRole('textbox', { name: "Year"});
        //Date Inputs for employment end date
        this.employmentEndDateDay = page.getByRole('textbox', { name: "Day"});
        this.employmentEndDateMonth = page.getByRole('textbox', { name: "Month"});
        this.employmentEndDateYear = page.getByRole('textbox', { name: "Year"});
        //Date Inputs for employment leave year start date
        this.employmentLeaveYearStartDay = page.getByRole('textbox', { name: "Day"});
        this.employmentLeaveYearStartMonth = page.getByRole('textbox', { name: "Month"});
        this.employmentLeaveYearStartYear = page.getByRole('textbox', { name: "Year"});
        //Continue button
        this.continueButton = page.getByRole("button", { name: "Continue" });
    }

    // Function to format dates inside the Page Object
    formatDate({ day, month, year }, dateFormat = 'd MMMM yyyy') {
        return format(parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date()), dateFormat);
    }
    async enterEmploymentStartDate({ day, month, year }) {
        await this.employmentStartDay.fill(day);
        await this.employmentStartMonth.fill(month);
        await this.employmentStartYear.fill(year);
        await this.continueButton.click();
    }
    async enterEmploymentEndDate({day, month, year}) {
        await this.employmentEndDateDay.fill(day);
        await this.employmentEndDateMonth.fill(month);
        await this.employmentLeaveYearStartYear.fill(year);
        await this.continueButton.click();
    }
    async enterLeaveYearStartDate({day, month, year}) {
        await this.employmentLeaveYearStartDay.fill(day);
        await this.employmentLeaveYearStartMonth.fill(month);
        await this.employmentLeaveYearStartYear.fill(year);
        await this.continueButton.click();
    }
    async getFormattedEntitlementDate(dateObject) {
        return this.formatDate(dateObject);
    }
  }
  
  module.exports = LeaveDatePage;
  