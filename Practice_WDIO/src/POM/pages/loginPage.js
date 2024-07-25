const loginComponents = require('./../components/login/login.components');

class loginPage {
  constructor() {
    this.LoginComponents = new loginComponents();
  }

  async open() {
    await browser.url('https://trello.com/login');
  }

  async login(email, password) {
    await this.LoginComponents.emailInput.waitForDisplayed();
    await this.LoginComponents.emailInput.setValue(email);
    await this.LoginComponents.loginButton.click();
    await this.LoginComponents.passwordInput.waitForDisplayed();
    await this.LoginComponents.passwordInput.setValue(password);
    await this.LoginComponents.loginButton.click();
  }

  async isAvatarButtonDisplayed() {
    return this.LoginComponents.avatarButton.waitForDisplayed({ timeout: 10000 });
  }
}

module.exports = loginPage;
