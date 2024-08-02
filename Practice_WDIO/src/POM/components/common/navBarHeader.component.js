class navBarComponent {
  get profileButton() {
    return $('button[aria-label="Open member menu"]');
  }
  get settingsAccountButton() {
    return $('a[data-testid="account-menu-profile"]');
  }

  async openProfile() {
    await this.profileButton.click();
  }

  async openSettingsAccount() {
    await this.settingsAccountButton.click();
  }
}

module.exports = navBarComponent;
