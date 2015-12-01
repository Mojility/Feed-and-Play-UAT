Feature: Log in

  Scenario: As a User of Feed And Play, I can Log In
    Given I am on the home page
    When I click the login link
    And I enter my username "john@smith.com"
    And I enter my password "1"
    And I click the log in button
    Then I should see my profile page with my stagename "???"
