Given(/^I am on the home page$/) do
    driver.get('localhost:3001')
    sleep(3)
end

When(/^I click the login link$/) do
    driver.find_element(css: 'a.login').click
end

When(/^I enter my username "([^"]*)"$/) do |keyword|
    driver.find_element(css: '#email').send_keys(keyword)
end

When(/^I enter my password "([^"]*)"$/) do |keyword|
    driver.find_element(css: '#password').send_keys(keyword)
end

When(/^I click the log in button$/) do
    driver.find_element(css: 'button[type=submit]').click
end

Then(/^I should see my profile page with my stagename "([^"]*)"$/) do |keyword|  
    expect(driver.find_elements(css: '.stagename')).to eq(keyword)
end