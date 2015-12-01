require 'selenium-webdriver'

def site_url
  ENV['SITE_URL']
end

def driver
  @driver ||= Selenium::WebDriver.for :firefox#, profile: Selenium::WebDriver::Firefox::Profile.new
end

After do
  driver.quit
end
