Feature:

  Scenario: As a public visitor, I should be able to sign up
    Given I am on the signup page
    And I fill out "bla" for the stage name field
    And I fill out "first" for the first name field
    And I fill out "last" for the last name field
    And I fill out "a@b.com" for the email field
    And I fill out "pass" for the password field
    And I click the create profile button
    Then I should see my profile page with my stagename "bla"
