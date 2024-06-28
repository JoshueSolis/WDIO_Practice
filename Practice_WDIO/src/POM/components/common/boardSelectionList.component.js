class boardSelectionList {
  get createBoardButton() {
    return $('li[data-testid="create-board-tile"]');
  }

  get boardNameInput() {
    return $('input[data-testid="create-board-title-input"]');
  }

  get createButton() {
    return $('button[data-testid="create-board-submit-button"]');
  }

  get boardName() {
    return $('h1[data-testid="board-name-display"]');
  }
}

module.exports = boardSelectionList;
