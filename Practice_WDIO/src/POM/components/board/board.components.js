class boardComponents {
  get boardLink() {
    return $('div[title="Board 1"]');
  }

  get addListButton() {
    return $('button[data-testid="list-composer-button"]');
  }

  get listNameInput() {
    return $('textarea:focus-visible');
  }

  get saveListButton() {
    return $('button[data-testid="list-composer-add-list-button"]');
  }

  get listName() {
    return $('h2[data-testid="list-name"]');
  }

  get addCardButton() {
    return $('button[data-testid="list-add-card-button"]');
  }

  get cardTitleInput() {
    return $('textarea[data-testid="list-card-composer-textarea"]');
  }

  get addCardSubmitButton() {
    return $('button[data-testid="list-card-composer-add-card-button"]');
  }

  get cardName() {
    return $('a[data-testid="card-name"]');
  }

  get changeMembersButton() {
    return $('a[data-testid="card-back-members-button"]');
  }

  get memberSelect() {
    return $('button[data-testid="choose-member-item-add-member-button"]');
  }

  get closeMemberSelector() {
    return $('a[data-testid="popover-close"]');
  }

  get closeCardEditor() {
    return $('span[data-testid="CloseIcon"]');
  }

  get memberButtonIndicator() {
    return $('button[data-testid="card-front-member"]');
  }

  get filtersButton() {
    return $('span[data-testid="FilterIcon"]');
  }

  get userFilterSelect() {
    return $('div[title="Cards assigned to me"]');
  }
}

module.exports = boardComponents;
