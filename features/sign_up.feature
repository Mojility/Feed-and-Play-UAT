Feature:

  Scenario: As a public visitor, I should be able to sign up
    Given I am on the home page
    When I click the sign up link
    And I fill out "??" for the XYZ field
    And I fill out "??" for the XYZ field
    And I fill out "??" for the XYZ field
    And I fill out "??" for the XYZ field
    And I click the create profile button
    Then I should be logged in and viewing my profile page
