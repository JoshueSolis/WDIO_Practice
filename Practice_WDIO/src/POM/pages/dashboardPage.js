const boardList = require("./../components/common/boardSelectionList.component");

class dashboardPage {
  constructor() {
    this.BoardList = new boardList();
  }

  async openCreateBoardModal() {
    await this.BoardList.createBoardButton.click();
  }

  async createBoard(boardName) {
    await this.BoardList.boardNameInput.setValue(boardName);
    await this.BoardList.createButton.click();
  }

  async isBoardHeaderDisplayed() {
    return this.BoardList.boardName.waitForDisplayed({ timeout: 10000 });
  }

  async getBoardName() {
    return this.BoardList.boardName.getText();
  }
}

module.exports = dashboardPage;
