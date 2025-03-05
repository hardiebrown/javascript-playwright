class WorkPatternPage {
    constructor(page) {
    //Does the employee work irregular hours?
    this.irregularHoursOptions = {
        yes: page.getByRole("radio", { name: "Yes" }),
        no: page.getByRole("radio", { name: "No" }),
      };
      this.holidayEntitlementOptions = {
        days: page.getByRole("radio", { name: "days worked per week" }),
        hours: page.getByRole("radio", { name: "hours worked per week" }),
        annualised: page.getByRole("radio", { name: "annualised hours" }),
        compressed: page.getByRole("radio", { name: "compressed hours" }),
        shifts: page.getByRole("radio", { name: "shifts" }),
      };
      // Do you want to work out holiday for:
      this.workOutHolidayForOptions = {
        full_year: page.getByRole("radio", { name: "for a full leave year" }),
        starting: page.getByRole("radio", { name: "for someone starting part way through a leave year" }),
        leaving: page.getByRole("radio", { name: "for someone leaving part way through a leave year" }),
        starting_and_leaving: page.getByRole("radio", { name: "for someone starting and leaving part way through a leave year" }),
      };
      //Inputs
      this.daysInput = page.getByRole('textbox', { name: 'Days worked' });
      this.hoursInput = page.getByRole('textbox', { name: 'Hours worked' });
      this.shiftHours = page.getByRole('textbox', { name: 'How many hours in each shift' });
      this.noOfShifts = page.getByRole('textbox', { name: 'How many shifts will be worked per shift pattern' });
      this.shiftDays = page.getByRole('textbox', { name: 'How many days in the shift pattern' });
      //Error Messages
      this.errorMessage = page.getByTestId("error-summary");
      //Continue Button
      this.continueButton = page.getByRole("button", { name: "Continue" });
    }
    async selectIrregularHours(option) {
        const selectedOption = this.irregularHoursOptions[option.toLowerCase()];
        if (!selectedOption) {
          throw new Error("Invalid option. Use 'yes' or 'no'");
        }
        await selectedOption.click();
        await this.continueButton.click();
      }
      async selectHolidayEntitlement(option) {
        const selectedOption = this.holidayEntitlementOptions[option.toLowerCase()];
        if (!selectedOption) {
          throw new Error(
            "Invalid option. Choose from: days, hours, casual, annualised, compressed, shifts."
          );
        }
        await selectedOption.click();
        await this.continueButton.click();
      }
      async selectWorkOutHolidayFor(option) {
        const selectedOption = this.workOutHolidayForOptions[option.toLowerCase()];
        if (!selectedOption) {
          throw new Error(
            "Invalid option. Choose from: full_year, starting, leaving, starting_and_leaving."
          );
        }
        await selectedOption.click();
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
      async enterShiftHours(hours) {
        await this.shiftHours.fill(hours);
        await this.continueButton.click();
      }
      async enterNoOfShifts(shifts) {
        await this.noOfShifts.fill(shifts);
        await this.continueButton.click();
      }
      async enterShiftDays(days) {
        await this.shiftDays.fill(days);
        await this.continueButton.click();
      }
      getErrorElement() {
        return this.errorMessage;
      }
  }
  
  module.exports = WorkPatternPage;
  


