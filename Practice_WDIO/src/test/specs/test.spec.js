const LoginPage = require('./../../POM/pages/loginPage');
const loginPage = new LoginPage();
const NavBarHeader = require('./../../POM/components/common/navBarHeader.component');
const navBarHeader = new NavBarHeader();
const ProfileSettingsPage = require('./../../POM/pages/profileSettingsPage');
const profileSettingsPage = new ProfileSettingsPage();
const DashboardPage = require('./../../POM/pages/dashboardPage');
const dashboardPage = new DashboardPage();
const BoardPage = require('./../../POM/pages/boardPage');
const boardPage = new BoardPage();

describe('Trello Test - Suite', () => {
  before(async () => {});

  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('test.trello0624@outlook.com', 'password0624');
  });

  it('should allow a user to log in successfully with valid credentials', async () => {
    const isDisplayed = await loginPage.isAvatarButtonDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('should allow a user to change their username', async () => {
    await navBarHeader.openProfile();
    await navBarHeader.openSettingsAccount();
    await profileSettingsPage.changeUserName('newtestuser060624');

    const isDisplayed = await profileSettingsPage.isSuccessMessageDisplayed();

    expect(isDisplayed).to.be.true;
  });

  it('should send an error when a user tries to change their username to an existing username', async () => {
    await navBarHeader.openProfile();
    await navBarHeader.openSettingsAccount();
    await profileSettingsPage.changeUserName('newusername');

    const isUserNameErrorDisplayed = await profileSettingsPage.isUserNameErrorDisplayed();
    const errorMessage = await profileSettingsPage.getUsernameErrorMessage();

    expect(isUserNameErrorDisplayed).to.be.true;
    expect(errorMessage).to.equal('Username is taken');
  });

  it('should allow a user to create a new board', async () => {
    await dashboardPage.openCreateBoardModal();
    await dashboardPage.createBoard('Board 1');

    const isBoardHeaderDisplayed = await dashboardPage.isBoardHeaderDisplayed();
    const boardName = await dashboardPage.getBoardName();

    expect(isBoardHeaderDisplayed).to.be.true;
    expect(boardName).to.include('Board 1');
  });

  it('should allow a user to create a new list in a board', async () => {
    await boardPage.openBoard();
    const isBoardDisplayed = await dashboardPage.isBoardHeaderDisplayed();
    expect(isBoardDisplayed).to.be.true;
    await boardPage.createList('New List');

    const isListDisplayed = await boardPage.isListDisplayed();
    const listName = await boardPage.getListName();

    expect(isListDisplayed).to.be.true;
    expect(listName).to.include('New List');
  });

  it('should allow a user to create a new card in a list', async () => {
    await boardPage.openBoard();
    const isBoardDisplayed = await dashboardPage.isBoardHeaderDisplayed();
    expect(isBoardDisplayed).to.be.true;
    await boardPage.createCard('New Card');

    const isCardDisplayed = await boardPage.isCardDisplayed();
    const cardName = await boardPage.getCardName();

    expect(isCardDisplayed).to.be.true;
    expect(cardName).to.equal('New Card');
  });

  it('should allow a user to assign a member to a card', async () => {
    await boardPage.openBoard();
    const isBoardDisplayed = await dashboardPage.isBoardHeaderDisplayed();
    expect(isBoardDisplayed).to.be.true;

    const isCardDisplayed = await boardPage.isCardDisplayed();
    expect(isCardDisplayed).to.be.true;

    await boardPage.openCardEditor();
    await boardPage.assignMemberToCard();

    const isMemberAssignedToCard = await boardPage.isMemberAssignedToCard();
    expect(isMemberAssignedToCard).to.be.true;
  });

  it('should allow a user to filter cards by assigned user', async () => {
    await boardPage.openBoard();
    const isBoardDisplayed = await dashboardPage.isBoardHeaderDisplayed();
    expect(isBoardDisplayed).to.be.true;

    await boardPage.openFilters();
    await boardPage.filterByUser();

    const filteredCards = await boardPage.getFilteredCards();

    expect(filteredCards).to.be.an('array').that.is.not.empty;

    filteredCards.forEach(async (card) => {
      expect(await card.isDisplayed()).to.be.true;
    });

    const numberOfFilteredCards = filteredCards.length;
    expect(numberOfFilteredCards).to.equal(filteredCards.length);
  });
});
