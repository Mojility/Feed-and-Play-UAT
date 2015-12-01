Given(/^I am on the signup page$/) do
    driver.get('localhost:3001/signup')
end

When(/^I fill out "([^"]*)" for the stage name field$/) do |keyword|
      driver.find_element(css: '.stagename').send_keys(keyword)
end

When(/^I fill out "([^"]*)" for the first name field$/) do |keyword|
      driver.find_element(css: '.firstname').send_keys(keyword)
end

When(/^I fill out "([^"]*)" for the last name field$/) do |keyword|
      driver.find_element(css: '.lastname').send_keys(keyword)
end

When(/^I fill out "([^"]*)" for the email field$/) do |keyword|
      driver.find_element(css: '.email').send_keys(keyword)
end

When(/^I fill out "([^"]*)" for the password field$/) do |keyword|
      driver.find_element(css: '.password').send_keys(keyword)
end

When(/^I click the create profile button$/) do
    driver.find_element(css: '.small').click
end

Then(/^I should be logged in and viewing my profile page$/) do
    pending # Write code here that turns the phrase above into concrete actions
end
