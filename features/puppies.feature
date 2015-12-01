Feature: Google Search

  Scenario: Search for puppies
    Given I am on the Google image search page
    When I enter "puppies" in the search box
    And I click Search
    Then I should see cute puppies!
