describe("Trello Test - Suite", () => {
  before(async () => {});

  beforeEach(async () => {
    await browser.url("https://trello.com/login");
    await $("#username").waitForDisplayed();

    const emailInput = $("#username");
    const loginButton = $("#login-submit");

    await emailInput.setValue("test.trello0624@outlook.com");
    await loginButton.click();

    await $("#password").waitForDisplayed();
    const passwordInput = $("#password");

    await passwordInput.setValue("password0624");
    await loginButton.click();
  });

  it("should allow a user to log in successfully with valid credentials", async () => {
    const avatarButton = await $(
      'button[data-testid="header-member-menu-button"]'
    );
    await avatarButton.waitForDisplayed({ timeout: 10000 });

    expect(await avatarButton.isDisplayed()).to.be.true;
  });

  it("should allow a user to change their username", async () => {
    const profileButton = await $('button[aria-label="Open member menu"]');
    await profileButton.click();

    const settingsButton = await $('a[data-testid="account-menu-profile"]');
    await settingsButton.click();

    const usernameField = await $('input[id="username"]');
    const saveButton = await $('button[type="submit"]');

    await usernameField.setValue("newtestuser060624");
    await saveButton.click();

    const successMessage = await $('div[id="FlagGroup"]');
    await successMessage.waitForDisplayed("timeout:10000");

    expect(await successMessage.isDisplayed()).to.be.true;
  });

  it("should send an error when a user tries to change their username to an existing username", async () => {
    const profileButton = await $('button[aria-label="Open member menu"]');
    await profileButton.click();

    const settingsButton = await $('a[data-testid="account-menu-profile"]');
    await settingsButton.click();

    const usernameField = await $('input[id="username"]');
    const saveButton = await $('button[type="submit"]');

    await usernameField.setValue("newusername");
    await saveButton.click();

    const profileError = await $('p[id="SaveProfileError_Field_username"]');
    await profileError.waitForDisplayed("timeout:10000");

    expect(await profileError.getText()).to.equal("Username is taken");
  });

  it("should allow a user to create a new board", async () => {
    const createBoardButton = await $('li[data-testid="create-board-tile"]');
    await createBoardButton.click();

    const boardNameInput = await $(
      'input[data-testid="create-board-title-input"]'
    );
    const createButton = await $(
      'button[data-testid="create-board-submit-button"]'
    );

    await boardNameInput.setValue(`Board 1`);
    await createButton.click();

    const boardName = await $('input[data-testid="board-name-input"]');
    await boardName.waitForExist("timeout:10000");
    expect(await boardName.getText()) === "Board 1";
  });

  it("should allow a user to create a new list in a board", async () => {
    const boardLink = await $('div[title="Board 1"]');
    await boardLink.click();

    const addListButton = await $('button[data-testid="list-composer-button"]');
    await addListButton.click();

    const listNameInput = await $("textarea:focus-visible");
    const saveListButton = await $(
      'button[data-testid="list-composer-add-list-button"]'
    );

    await listNameInput.setValue(`New List`);
    await saveListButton.click();

    const newList = await $('textarea[aria-label="New List"]');
    expect(await newList.waitForExist({ timeout: 10000 })).to.be.true;
  });

  it("should allow a user to create a new card in a list", async () => {
    const boardLink = await $('div[title="Board 1"]');
    await boardLink.click();

    const addCardButton = await $('button[data-testid="list-add-card-button"]');
    await addCardButton.click();

    const cardTitleInput = await $(
      'textarea[data-testid="list-card-composer-textarea"]'
    );
    const addCardSubmitButton = await $(
      'button[data-testid="list-card-composer-add-card-button"]'
    );

    await cardTitleInput.setValue("New Card");
    await addCardSubmitButton.click();

    const newCard = await $('a[data-testid="card-name"]');

    expect(await newCard.getText()).to.equal("New Card");
  });

  it("should allow a user to assign a member to a card", async () => {
    const boardLink = await $('div[title="Board 1"]');
    await boardLink.click();

    const card = await $('a[data-testid="card-name"]');
    expect(await card.getText()) === "New Card";
    await card.click();

    const changeMembersButton = await $(
      'a[data-testid="card-back-members-button"]'
    );
    await changeMembersButton.click();

    const memberSelect = await $(
      'button[data-testid="choose-member-item-add-member-button"]'
    );
    const closeMemberSelector = await $('a[data-testid="popover-close"]');

    await memberSelect.click();
    await closeMemberSelector.click();

    const closeCardEditor = await $('span[data-testid="CloseIcon"]');
    await closeCardEditor.click();

    const memberButtonIndicator = await $(
      'button[data-testid="card-front-member"]'
    );

    await memberButtonIndicator.waitForExist({ timeout: 10000 });

    expect(await memberButtonIndicator.isDisplayed()).to.be.true;
  });

  it("should allow a user to filter cards by assigned user", async () => {
    const boardLink = await $('div[title="Board 1"]');
    await boardLink.click();

    const filtersButton = await $('span[data-testid="FilterIcon"]');
    await filtersButton.click();

    const userFilterSelect = await $('div[title="Cards assigned to me"]');
    await userFilterSelect.click();

    const filteredCards = await $$('button[data-testid="card-front-member"]');

    expect(filteredCards).to.be.an("array").that.is.not.empty;

    filteredCards.forEach(async (card) => {
      expect(await card.isDisplayed()).to.be.true;
    });

    const numberOfFilteredCards = filteredCards.length;
    expect(numberOfFilteredCards).to.equal(filteredCards.length);
  });
});
