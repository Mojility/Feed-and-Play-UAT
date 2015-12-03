Feature: Log in

  Scenario: As a User of Feed And Play, I can Log In
    Given I am on the home page
    When I click the login link
    And I enter my username "john@smith.com"
    And I enter my password "1"
    And I click the log in button
    Then I should see my profile page with my stagename "the smith"

  Scenario: As a User of Feed and Play, I can change my stagename
    Given I am on the home page
    When I click the login link
    And I enter my username "john@smith.com"
    And I enter my password "1"
    And I click the log in button
    When I click to edit my profile
    And I change my stagename to "Silly Person"
    And I click on update
    And I click on the my profile menu item
    Then I should see my profile page with my stagename "Silly Person"

  Scenario: As a User of Feed and Play, I can advertise a new open position
    Given I am on the home page
    When I click the login link
    And I enter my username "john@smith.com"
    And I enter my password "1"
    And I click the log in button
    When I click on my team
    And I click on team management
    And I enter a "role"
    And I click on add
    Then I should see that "role" added
