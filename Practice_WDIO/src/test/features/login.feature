@smoke
Feature: Login Trello and create a board

    Background:
        Given I am loged into Trello
    
    @login
    Scenario: I loged in succesfully
        Then I should see the avatar button
    
    @profile
    Scenario: Change username succesfully
        When I navigate to the profile settings
        And I change the username to "newtestuser060624"
        Then I should see a success message
    
    @profile
    Scenario: Display error for exisitng username
        When I navigate to the profile settings
        And I change the username to "newusername"
        Then I should see an error message "Username is taken"