# Cucumber UAT Starter Project

This is a simple blank starter project for doing automated User
Acceptance Testing with cucumber and selenium for web based
applications.

By automating some degree of your User Acceptance Testing, you can
eliminate a lot of manual labour before shipping your product.

### Pro Tip

Plan what your product needs to do using User Stories - you should be
able to express your User Stories directly as Feature cards, track each
User Story / Feature card through your production process as you build
it out. Everyone on your team will be clear about when the feature is
"finished", because at the end you can run your Feature card through
Cucumber and should be able to make it pass.

Using Cucumber to automate some baseline User Acceptance Testing before
shipping your product can help save you from embarrassing mistakes.

## Requirements

This project requires a functional Ruby environment, and the Firefox
browser to be installed.

## Getting Started

Fork this repository and clone it onto your local machine.

If you use RVM to manage your Ruby installations, you probably want to
set up an isolated gemset for your UAT testing.

```
rvm --create 2.2@uat
```

Then, you need to ensure you have bundler installed and install the
dependencies.

```
gem install bundler
bundle install
```

You will now have the cucumber command at your disposal. You can run the
sample feature check by typing

```
cucumber
```

At this point, your Firefox browser will open, go to the Google image
search page, and search for puppies. The check will pause for 10 seconds
on the search results before exiting.

## From here...

Once your environment is up and running, you are free to start creating
your own features using Cucumber and Selenium.
