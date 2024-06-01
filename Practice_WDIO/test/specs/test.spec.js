describe("Trello Test - Suite", () => {

    it('should allow a new user to sign up successfully with valid details', async () => {
        await browser.url('https://trello.com/signup');

        const emailInput = await $('#email');
        const usernameInput = await $('#username');
        const passwordInput = await $('#password');
        const signUpButton = await $('#signup-button');

        await emailInput.setValue(`testuser+${Date.now()}@example.com`);
        await usernameInput.setValue(`testuser${Date.now()}`);
        await passwordInput.setValue('SecurePassword123');

        await signUpButton.click();

        const confirmationMessage = await $('.confirmation-message');
        await expect(confirmationMessage).toBeDisplayed();
        await expect(confirmationMessage).toHaveTextContaining('Please check your email to confirm your account.');
    });

    it('should allow a user to log in successfully with valid credentials', async () => {
        await browser.url('https://trello.com/login');

        const emailInput = await $('#user');
        const passwordInput = await $('#password');
        const loginButton = await $('#login');

        await emailInput.setValue('validuser@example.com');
        await passwordInput.setValue('ValidPassword123');
        
        await loginButton.click();

        const dashboard = await $('div[data-testid="home-navigation"]');
        await expect(dashboard).toBeDisplayed();
    });

    it('should allow a user to change their username', async () => {
        await browser.url('https://trello.com/login');

        const emailInput = await $('#user');
        const passwordInput = await $('#password');
        const loginButton = await $('#login');

        await emailInput.setValue('validuser@example.com');
        await passwordInput.setValue('ValidPassword123');
        
        await loginButton.click();

        const profileButton = await $('button[aria-label="Open member menu"]');
        await profileButton.click();

        const settingsButton = await $('a[href="/profile"]');
        await settingsButton.click();

        const usernameField = await $('#username');
        const saveButton = await $('button[type="submit"]');

        await usernameField.setValue('newusername');
        await saveButton.click();

        const successMessage = await $('.success-message');
        await expect(successMessage).toBeDisplayed();
        await expect(successMessage).toHaveTextContaining('Your username has been updated.');
    });

    it('should allow a user to create a new board', async () => {
        await browser.url('https://trello.com/login');

        const emailInput = await $('#user');
        const passwordInput = await $('#password');
        const loginButton = await $('#login');

        await emailInput.setValue('validuser@example.com');
        await passwordInput.setValue('ValidPassword123');
        
        await loginButton.click();

        const createBoardButton = await $('button[data-testid="create-board-button"]');
        await createBoardButton.click();

        const boardNameInput = await $('input[data-testid="create-board-title-input"]');
        const visibilityDropdown = await $('select[data-testid="create-board-visibility-input"]');
        const createButton = await $('button[data-testid="create-board-submit-button"]');

        await boardNameInput.setValue(`New Board ${Date.now()}`);
        await visibilityDropdown.selectByVisibleText('Public');
        await createButton.click();

        const boardPage = await $('div[data-testid="board-page"]');
        await expect(boardPage).toBeDisplayed();
    });

    it('should allow a user to create a new list in a board', async () => {
        await browser.url('https://trello.com/login');

        const emailInput = await $('#user');
        const passwordInput = await $('#password');
        const loginButton = await $('#login');

        await emailInput.setValue('validuser@example.com');
        await passwordInput.setValue('ValidPassword123');
        
        await loginButton.click();

        // Navegar a un tablero específico
        const boardLink = await $('a[data-testid="board-link"]');
        await boardLink.click();

        const addListButton = await $('button[data-testid="add-list-button"]');
        await addListButton.click();

        const listNameInput = await $('input[data-testid="list-name-input"]');
        const saveListButton = await $('button[data-testid="save-list-button"]');

        await listNameInput.setValue(`New List ${Date.now()}`);
        await saveListButton.click();

        const newList = await $('div[data-testid="list"]');
        await expect(newList).toBeDisplayed();
    });

    it('should allow a user to create a new card in a list', async () => {
        await browser.url('https://trello.com/login');

        const emailInput = await $('#user');
        const passwordInput = await $('#password');
        const loginButton = await $('#login');

        await emailInput.setValue('validuser@example.com');
        await passwordInput.setValue('ValidPassword123');
        
        await loginButton.click();

        // Navegar a un tablero específico
        const boardLink = await $('a[data-testid="board-link"]');
        await boardLink.click();

        const addCardButton = await $('button[data-testid="add-card-button"]');
        await addCardButton.click();

        const cardTitleInput = await $('textarea[data-testid="card-title-input"]');
        const addCardSubmitButton = await $('button[data-testid="add-card-submit-button"]');

        await cardTitleInput.setValue(`New Card ${Date.now()}`);
        await addCardSubmitButton.click();

        const newCard = await $('div[data-testid="card"]');
        await expect(newCard).toBeDisplayed();
    });

    it('should allow a user to assign a member to a card', async () => {
        await browser.url('https://trello.com/login');

        const emailInput = await $('#user');
        const passwordInput = await $('#password');
        const loginButton = await $('#login');

        await emailInput.setValue('validuser@example.com');
        await passwordInput.setValue('ValidPassword123');
        
        await loginButton.click();

        // Navegar a un tablero específico
        const boardLink = await $('a[data-testid="board-link"]');
        await boardLink.click();

        const card = await $('div[data-testid="card"]');
        await card.click();

        const changeMembersButton = await $('button[data-testid="change-members-button"]');
        await changeMembersButton.click();

        const memberSelect = await $('select[data-testid="member-select"]');
        const saveMemberButton = await $('button[data-testid="save-member-button"]');

        await memberSelect.selectByVisibleText('membername');
        await saveMemberButton.click();

        const assignedMember = await $('div[data-testid="assigned-member"]');
        await expect(assignedMember).toBeDisplayed();
    });

    it('should allow a user to filter cards by assigned user', async () => {
        await browser.url('https://trello.com/login');

        const emailInput = await $('#user');
        const passwordInput = await $('#password');
        const loginButton = await $('#login');

        await emailInput.setValue('validuser@example.com');
        await passwordInput.setValue('ValidPassword123');
        
        await loginButton.click();

        // Navegar a un tablero específico
        const boardLink = await $('a[data-testid="board-link"]');
        await boardLink.click();

        const filtersButton = await $('button[data-testid="filters-button"]');
        await filtersButton.click();

        const userFilterSelect = await $('select[data-testid="user-filter-select"]');

        await userFilterSelect.selectByVisibleText('membername');

        const filteredCard = await $('div[data-testid="filtered-card"]');
        await expect(filteredCard).toBeDisplayed();

        const otherCards = await $$('div[data-testid="card"]');
        for (let card of otherCards) {
            await expect(card).not.toBeDisplayed();
        }
    });

});