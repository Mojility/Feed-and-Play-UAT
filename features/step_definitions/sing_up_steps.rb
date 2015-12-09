Given(/^I am on the signup page$/) do
    driver.get(site_url+'/signup')
end

When(/^I fill out "([^"]*)" for the stage name field$/) do |stageName|
      driver.find_element(css: '.stagename').send_keys(stageName)
end

When(/^I fill out "([^"]*)" for the first name field$/) do |firstName|
      driver.find_element(css: '.firstname').send_keys(firstName)
end

When(/^I fill out "([^"]*)" for the last name field$/) do |lastName|
      driver.find_element(css: '.lastname').send_keys(lastName)
end

When(/^I fill out "([^"]*)" for the email field$/) do |email|
      driver.find_element(css: '.email').send_keys(email)
end

When(/^I fill out "([^"]*)" for the password field$/) do |pass|
      driver.find_element(css: '.password').send_keys(pass)
end

When(/^I click the create profile button$/) do
    driver.find_element(css: '.small').click
end
