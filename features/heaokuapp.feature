Feature: Herokuapp Feature

    Background: 
        Given open the "https://the-internet.herokuapp.com/" page

    Scenario: AB Testing
    Then click on AB Testing
    Then check the heading

    Scenario: Add Remove Elements
    Then click on add remove elements
    Then click add 5 times
    Then see if there are 5 elements
    Then click remove 2 times
    Then see if there are 3 elements

    Scenario: Basic Auth
    Then click on basic auth
    Then login with admin creds
    Then check for congrats message

    Scenario: Broken Images
    Then click on broken images
    Then wait to make sure then have time to load in
    Then check for broken images

    Scenario: Challenging DOM
    Then click on chellenging dom
    Then read the diceret in row 4 i guess, should way Phaedrum3

    # Scenario: Checkboxes


    # Scenario: Context Menu


    # Scenario: Digest Authentication


    # Scenario: Disappearing Elements


    # Scenario: Drag and Drop


    # Scenario: Dropdown


    # Scenario: Dynamic Content


    # Scenario: Dynamic Controls


    # Scenario: Dynamic Loading


    # Scenario: Entry Ad


    # Scenario: Exit Intent


    # Scenario: File Download


    # Scenario: File Upload


    # Scenario: Floating Menu


    # Scenario: Forgot Password


    # Scenario: Form Authentication


    # Scenario: Frames


    # Scenario: Geolocation


    # Scenario: Horizontal Slider


    # Scenario: Hovers


    # Scenario: Infinite Scroll


    # Scenario: Inputs


    # Scenario: JQuery UI Menus


    # Scenario: JavaScript Alerts


    # Scenario: JavaScript onload event error


    # Scenario: Key Presses


    # Scenario: Large & Deep DOM


    # Scenario: Multiple Windows


    # Scenario: Nested Frames


    # Scenario: Notification Messages


    # Scenario: Redirect Link


    # Scenario: Secure File Download


    # Scenario: Shadow DOM


    # Scenario: Shifting Content


    # Scenario: Slow Resources


    # Scenario: Sortable Data Tables


    # Scenario: Status Codes


    # Scenario: Typos


    # Scenario: WYSIWYG Editor

