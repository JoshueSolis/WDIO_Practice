class loginComponents {
  get emailInput() {
    return $('#username');
  }

  get loginButton() {
    return $('#login-submit');
  }

  get passwordInput() {
    return $('#password');
  }

  get avatarButton() {
    return $('button[data-testid="header-member-menu-button"]');
  }
}
module.exports = loginComponents;
