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
    Then read the diceret in row 4 i guess, should say Phaedrum3

    Scenario: Checkboxes
    Then click on checkboxes
    Then read the current state of the checkboxes
    Then click the check boxes
    Then read the current state of the checkboxes
    Then just reclick the first one for fun
    Then read the current state of the checkboxes

    Scenario: Context Menu
    Then click on context menu
    Then right click the box and assert for the context menu for "You selected a context menu"

    Scenario: Digest Authentication
    Then unfortunetly has to be all in one go or its just cuz im a novice so ready the alert then click on digest authentication and enter the login info
    Then assert for "Congratulations! You must have the proper credentials."

#--------------------------------------------------------------------
    Scenario: Home tab is present
    Then click on disappearing elements
    Then check and assert for home tab

    Scenario: About tab is present
    Then click on disappearing elements
    Then check and assert for about tab

    Scenario: Contact Us tab is present
    Then click on disappearing elements
    Then check and assert for contact us tab

    Scenario: Portfolio tab is present
    Then click on disappearing elements
    Then check and assert for portfolio tab

    Scenario: Gallery tab is present
    Then click on disappearing elements
    Then check and assert for gallery tab
#--------------------------------------------------------------------

    Scenario: Drag and Drop
    Then click on Drag and Drop
    Then assert for a then b
    Then drag and drop a onto b
    Then assert for b then a

    Scenario: Dropdown
    Then click on Dropdown
    Then assert for option "Please select an option" when page is first loaded in
    Then select option 2
    Then assert for "Option 2" being selected

    Scenario: Dynamic Content
    Then click on Dynamic Content
    Then check for any broken images
    Then check for broken text
    Then just to flex list out all image icons by names 

#--------------------------------------------------------------------
    Scenario: Dynamic Controls checkbox
    Then click on dynamic controls
    Then check for checkbox
    Then remove checkbox
    Then assert for "It's gone!" dc

    Scenario: Dynamic Controls enableDisable
    Then click on dynamic controls
    Then enable the enable
    Then assert for status enabled "It's enabled!" dc
    Then disable for disable
    Then assert for status disabled "It's disabled!" dc
#--------------------------------------------------------------------

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

