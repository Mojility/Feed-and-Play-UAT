When(/^I click on my team$/) do
  # sleep(2) # DON'T JUST SLEEP INDISCRIMINANTLY! This slows down the tests horribly
  wait.until { driver.find_element(css: '.team-name') } # DO THIS INSTEAD

  driver.find_element(css: '.team-name').click
end

When(/^I click on team management$/) do
  driver.find_element(css: '.management').click
end

When(/^I enter a "([^"]*)"$/) do |role|
  # sleep(2) # DON'T JUST SLEEP INDISCRIMINANTLY! This slows down the tests horribly
  wait.until { driver.find_element(css: '.role') } # DO THIS INSTEAD

  driver.find_element(css: '.role').send_keys(role)
end

When(/^I click on add$/) do
  driver.find_element(css: '.add').click
end

Then(/^I should see that "([^"]*)" added$/) do |role|
  # sleep(2) # DON'T JUST SLEEP INDISCRIMINANTLY! This slows down the tests horribly
  wait.until { driver.find_elements(css: '.advertised').size == 2 } # DO THIS INSTEAD

  # expect(driver.find_element(css: '.advertised').text).to eq(role) - FAILS - you have all roles displayed with class "advertised" so this can't possibly work, the call will only ever return the first
  elements = driver.find_elements(css: '.advertised') # pluralized find_elements because we want to get the array of matching items (elements matching the class "advertised")
  expect(elements[0].text).to eq('writer') # because this first one comes from the seeds.rb
  expect(elements[1].text).to eq(role) # because this one was the one you just created, and will appear second
end
