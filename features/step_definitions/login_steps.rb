Given(/^I am on the home page$/) do
  driver.get(site_url)
  sleep(3) # Need to sleep to wait for the browsersync element to hide
end

When(/^I click the login link$/) do
  driver.find_element(css: 'a.login').click
end

When(/^I enter my username "([^"]*)"$/) do |email|
  driver.find_element(css: '#email').send_keys(email)
end

When(/^I enter my password "([^"]*)"$/) do |password|
  driver.find_element(css: '#password').send_keys(password)
end

When(/^I click the log in button$/) do
  driver.find_element(css: 'button[type=submit]').click
end

