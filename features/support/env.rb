require 'selenium-webdriver'

def site_url
  ENV['SITE_URL'] || 'http://localhost:3001'
end

def init_db
  system('cd ../Feed-and-Play-Server && docker-compose run api bundle exec rake db:seed')
end

def driver
  @driver ||= Selenium::WebDriver.for :firefox#, profile: Selenium::WebDriver::Firefox::Profile.new
end

def wait
  @wait ||= Selenium::WebDriver::Wait.new(timeout: 30)
end

Before do
  init_db
end

After do
  driver.quit
end
