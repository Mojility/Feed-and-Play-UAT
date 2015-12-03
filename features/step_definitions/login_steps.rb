Given(/^I am on the home page$/) do
    driver.get('localhost:3001')
    sleep(3)
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

Then(/^I should see my profile page with my stagename "([^"]*)"$/) do |stage_name|
    sleep(2)
    expect(driver.find_elements(css: '.stagename')).to eq(stage_name)
end



When(/^I click to edit my profile$/) do
    sleep(2)
    driver.find_element(css: '.edit').click
end

When(/^I change my stagename to "([^"]*)"$/) do |stageName|
  sleep(2)
  driver.find_element(css: '.stage').clear()
  driver.find_element(css: '.stage').send_keys(stageName)
end

When(/^I click on update$/) do
  driver.find_element(css: '.update').click
end

When(/^I click on the my profile menu item$/) do
  driver.find_element(css: '.profile').click
end


When(/^I click on my team$/) do
  sleep(2)
  driver.find_element(css: '.team-name').click
end

When(/^I click on team management$/) do
  driver.find_element(css: '.management').click
end

When(/^I enter a "([^"]*)"$/) do |role|
  sleep(2)
  driver.find_element(css: '.role').send_keys(role)
end

When(/^I click on add$/) do
  driver.find_element(css: '.add').click
end

Then(/^I should see that "([^"]*)" added$/) do |role|
  sleep(2)
  expect(driver.find_elements(css: '.advertised')).to eq(role)
end
