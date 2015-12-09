Then(/^I should see my profile page with my stagename "([^"]*)"$/) do |stage_name|
  sleep(2) # DON'T JUST SLEEP INDISCRIMINANTLY! This slows down the tests horribly
  # what could you wait for on the page that would indicate that this page has finished loading?

  expect(driver.find_element(css: '.stagename').text).to eq(stage_name)
end

When(/^I click to edit my profile$/) do
  # sleep(2) # DON'T JUST SLEEP INDISCRIMINANTLY! This slows down the tests horribly
  wait.until { driver.find_element(css: '.edit') } # DO THIS INSTEAD

  driver.find_element(css: '.edit').click
end

When(/^I change my stagename to "([^"]*)"$/) do |stageName|
  # sleep(2) # DON'T JUST SLEEP INDISCRIMINANTLY! This slows down the tests horribly
  wait.until { driver.find_element(css: '.stage') } # DO THIS INSTEAD

  driver.find_element(css: '.stage').clear()
  driver.find_element(css: '.stage').send_keys(stageName)
end

When(/^I click on update$/) do
  driver.find_element(css: '.update').click
end

When(/^I click on the my profile menu item$/) do
  driver.find_element(css: '.profile').click
end

