Feature: The app - Logging in

  Scenario: User cannot log in with locked user credentials
    When I clicked on App Menu
    Then I clicked on login Menu option
    Then I enter username as alice@example.com and password as 10203040
    When I clicked on login button
    Then I check login is unsuccessful with text Sorry, this user has been locked out.

  Scenario: User cannot log in with invalid username and password
    When I clicked on App Menu
    Then I clicked on login Menu option
    Then I enter username as 1@2.com and password as f-o-o
    Then I clicked on login button
    Then I check login is unsuccessful with text Provided credentials do not match any user in this service.

  Scenario: User cannot log in without entering any username and password
    When I clicked on App Menu
    Then I clicked on login Menu option
    Then I enter username as "" and password as ""
    Then I clicked on login button
    Then I check login is unsuccessful with text Username is required

  Scenario: User cannot log in without entering a password
    When I clicked on App Menu
    Then I clicked on login Menu option
    Then I enter username as bob@example.com and password as ""
    Then I clicked on login button
    Then I check login is unsuccessful with text Password is required

  Scenario: User can log in with standard user credentials
    When I clicked on App Menu
    Then I clicked on login Menu option
    Then I enter username as bob@example.com and password as 10203040
    Then I clicked on login button
    Then I check login is successful