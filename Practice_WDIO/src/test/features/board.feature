@smoke
Feature: Boards, lists and cards Management

    Background: 
        Given I am loged into Trello

    @board    
    Scenario: Create a new Board
        When I create a new board named "Board 1"
        Then the board should be created
    @board   
    Scenario: Create a new list on a board
        When I create a new list named "New List"
        Then the list should be created

    @card
    Scenario: Create a new card in a list
        When I create a new card named "New Card"
        Then the card should be created
    
    @card
    Scenario: Assign a member to a card
        When I assign a member to the a card
        Then the member should be assigned to the card
    
    @filter
    Scenario: Filter cards by assigned user
        When I filter cards by user
        Then I should see the filtered cards