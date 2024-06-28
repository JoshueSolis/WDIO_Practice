class profileComponents {
    get usernameField() {
        return $('input[id="username"]');
      }
    
      get saveButton() {
        return $('button[type="submit"]');
      }
    
      get successMessage() {
        return $('div[id="FlagGroup"]');
      }
    
      get userNameError() {
        return $('p[id="SaveProfileError_Field_username"]');
      }    
}

module.exports = profileComponents;