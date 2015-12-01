Given(/^I am on the Google image search page$/) do
  driver.get('https://images.google.com/')
end

When(/^I enter "([^"]*)" in the search box$/) do |keyword|
  driver.find_element(css: 'input[name="q"]').send_keys(keyword)
end

When(/^I click Search$/) do
  driver.find_element(css: 'button[name=btnG]').click
end

Then(/^I should see cute puppies!$/) do
  expect(driver.find_elements(css: '.rg_di').size).to be > 0
end
