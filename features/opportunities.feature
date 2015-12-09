Feature: Opportunities

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
