const { expect } = require('chai');

describe("Trello Test - Suite", () => {
    before( () => {
        browser.url('https://trello.com/login');
        $('#username').waitForDisplayed();

        const emailInput = $('#username');
        const loginButton = $('#login-submit');

        emailInput.setValue('test.trello0624@outlook.com');
        loginButton.click();
        
        $('#password').waitForDisplayed();
        const passwordInput = $('#password');

        passwordInput.setValue('password0624');
        loginButton.click();
    });
    it('should send an error when a user tries to change their username to an existing username', async () => {
        
        const profileButton = await $('button[aria-label="Open member menu"]');
        await profileButton.click();

        const settingsButton = await $('a[data-testid="account-menu-profile"]');
        await settingsButton.click();

        const usernameField = await $('input[id="username"]');
        const saveButton = await $('button[type="submit"]');

        await usernameField.setValue('newusername');
        await saveButton.click();

        const profileError = await $('p[id="SaveProfileError_Field_username"]');
        await profileError.waitForDisplayed('timeout:10000');

        expect(await profileError.getText()).to.equal('Username is taken');
    });
});