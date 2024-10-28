Feature: The app - Logging in

  Scenario Outline: User attempts to login with different credentials
    When I clicked on App Menu
    Then I clicked on login Menu option
    Then I enter username as <username> and password as <password>
    When I clicked on login button
    Then I should see <result>

    Examples:
      | username          | password | result                                                             |
      | alice@example.com | 10203040 | I check login is unsuccessful with text Sorry, this user has been locked out. |
      | 1@2.com          | f-o-o    | I check login is unsuccessful with text Provided credentials do not match any user in this service. |
      | ""               | ""       | I check login is unsuccessful with text Username is required |
      | bob@example.com  | ""       | I check login is unsuccessful with text Password is required |
      | bob@example.com  | 10203040 | I check login is successful |