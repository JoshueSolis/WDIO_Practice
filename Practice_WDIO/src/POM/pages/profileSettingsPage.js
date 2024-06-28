const profileComponents = require('./../components/profileComponents/profileSettingsComponents');

class profileSettingsPage {
  constructor(){
    this.ProfileComponents = new profileComponents();
  }

  async changeUserName(newUsername) {
    await this.ProfileComponents.usernameField.setValue(newUsername);
    await this.ProfileComponents.saveButton.click();
  }

  async isSuccessMessageDisplayed() {
    return this.ProfileComponents.successMessage.waitForDisplayed({ timeout: 10000 });
  }

  async isUserNameErrorDisplayed() {
    return this.ProfileComponents.userNameError.waitForDisplayed({ timeout: 10000 });
  }

  async getUsernameErrorMessage() {
    return this.ProfileComponents.userNameError.getText();
  }
}

module.exports = profileSettingsPage;
