const boardComponents = require("./../components/board/board.components");

class boardPage {
  constructor() {
    this.BoardComponents = new boardComponents();
  }

  async openBoard() {
    await this.BoardComponents.boardLink.click();
  }

  async createList(listName) {
    await this.BoardComponents.addListButton.click();
    await this.BoardComponents.listNameInput.setValue(listName);
    await this.BoardComponents.saveListButton.click();
  }

  async isListDisplayed() {
    return this.BoardComponents.listName.waitForDisplayed({ timeout: 10000 });
  }
  
  async getListName() {
    return this.BoardComponents.listName.getText();
  }

  async createCard(cardTitle) {
    await this.BoardComponents.addCardButton.click();
    await this.BoardComponents.cardTitleInput.setValue(cardTitle);
    await this.BoardComponents.addCardSubmitButton.click();
  }

  async isCardDisplayed() {
    return this.BoardComponents.cardName.waitForDisplayed({ timeout:10000 });
  }

  async getCardName() {
    return this.BoardComponents.cardName.getText();
  }

  async openCardEditor() {
    await this.BoardComponents.cardName.click();
  }

  async assignMemberToCard() {
    await this.BoardComponents.changeMembersButton.click();
    await this.BoardComponents.memberSelect.click();
    await this.BoardComponents.closeMemberSelector.click();
    await this.BoardComponents.closeCardEditor.click();
  }

  async isMemberAssignedToCard() {
    return this.BoardComponents.memberButtonIndicator.waitForDisplayed({ timeout:10000 });
  }

  async openFilters() {
    await this.BoardComponents.filtersButton.click();
  }

  async filterByUser() {
    await this.BoardComponents.userFilterSelect.click();
  }

  async getFilteredCards() {
    return await $$('button[data-testid="card-front-member"]');
  }
}

module.exports = boardPage;
