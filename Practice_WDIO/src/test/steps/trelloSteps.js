const { Given, When, Then } = require('@wdio/cucumber-framework');

const loginPage = require('./../../POM/pages/loginPage');
const BoardPage = require('./../../POM/pages/boardPage');
const DashboardPage = require('./../../POM/pages/dashboardPage');
const ProfileSettingsPage = require('./../../POM/pages/profileSettingsPage');
const NavBarHeader = require('./../../POM/components/common/navBarHeader.component');

const LoginPage = new loginPage();
const boardPage = new BoardPage();
const navBarHeader = new NavBarHeader();
const dashboardPage = new DashboardPage();
const profileSettingsPage = new ProfileSettingsPage();

Given('I am loged into Trello', async function () {
  await LoginPage.open();
  await LoginPage.login('test.trello0624@outlook.com', 'password0624');
});

Then('I should see the avatar button', async function () {
  const isDisplayed = await LoginPage.isAvatarButtonDisplayed();
  expect(isDisplayed).to.be.true;
});

When('I navigate to the profile settings', async function () {
  await navBarHeader.openProfile();
  await navBarHeader.openSettingsAccount();
});

When('I change the username to {string}', async function (username) {
  await profileSettingsPage.changeUserName(username);
});

Then('I should see a success message', async function () {
  const isDisplayed = await profileSettingsPage.isSuccessMessageDisplayed();
  expect(isDisplayed).to.be.true;
});

Then('I should see an error message {string}', async function (message) {
  const errorMessage = await profileSettingsPage.getUsernameErrorMessage();
  expect(errorMessage).to.equal(message);
});

When('I create a new board named {string}', async function (boardName) {
  await dashboardPage.openCreateBoardModal();
  await dashboardPage.createBoard(boardName);
});

Then('the board should be created', async function () {
  const isBoardHeaderDisplayed = await dashboardPage.isBoardHeaderDisplayed();
  const boardName = await dashboardPage.getBoardName();
  expect(isBoardHeaderDisplayed).to.be.true;
  expect(boardName).to.include('Board 1');
});

When('I create a new list named {string}', async function (listName) {
  await boardPage.openBoard();
  await boardPage.createList(listName);
});

Then('the list should be created', async function () {
  const isListDisplayed = await boardPage.isListDisplayed();
  const listName = await boardPage.getListName();
  expect(isListDisplayed).to.be.true;
  expect(listName).to.include('New List');
});

When('I create a new card named {string}', async function (cardName) {
  await boardPage.openBoard();
  await boardPage.createCard(cardName);
});

Then('the card should be created', async function () {
  const isCardDisplayed = await boardPage.isCardDisplayed();
  const cardName = await boardPage.getCardName();
  expect(isCardDisplayed).to.be.true;
  expect(cardName).to.equal('New Card');
});

When('I assign a member to the a card', async function () {
  await boardPage.openBoard();
  await boardPage.openCardEditor();
  await boardPage.assignMemberToCard();
});

Then('the member should be assigned to the card', async function () {
  const isMemberAssignedToCard = await boardPage.isMemberAssignedToCard();
  expect(isMemberAssignedToCard).to.be.true;
});

When('I filter cards by user', async function () {
  await boardPage.openBoard();
  await boardPage.openFilters();
  await boardPage.filterByUser();
});

Then('I should see the filtered cards', async function () {
  const filteredCards = await boardPage.getFilteredCards();
  expect(filteredCards).to.be.an('array').that.is.not.empty;

  for (const card of filteredCards) {
    const isDisplayed = await card.isDisplayed();
    expect(isDisplayed).to.be.true;
  }

  const numberOfFilteredCards = filteredCards.length;
  expect(numberOfFilteredCards).to.equal(filteredCards.length);
});
