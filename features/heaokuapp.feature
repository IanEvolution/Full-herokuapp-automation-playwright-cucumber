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

#--------------------------------------------------------------------
    Scenario: Broken Images first image
    Then click on broken images
    Then wait to make sure then have time to load in
    Then check for first broken image

    Scenario: Broken Images second image
    Then click on broken images
    Then wait to make sure then have time to load in
    Then check for second broken image

    Scenario: Broken Images third image
    Then click on broken images
    Then wait to make sure then have time to load in
    Then check for third broken image
#--------------------------------------------------------------------

    Scenario: Challenging DOM
    Then click on chellenging dom
    Then read the diceret in row 4 i guess, should say Phaedrum3

#--------------------------------------------------------------------
    Scenario: Checkboxes round 1
    Then click on checkboxes
    Then read the current state of the checkboxes round 1

    Scenario: Checkboxes round 2
    Then click on checkboxes
    Then click the check boxes
    Then read the current state of the checkboxes round 2

    Scenario: Checkboxes round 3
    Then click on checkboxes
    Then click the check boxes
    Then just reclick the first one for fun
    Then read the current state of the checkboxes round 3
#--------------------------------------------------------------------

    Scenario: Context Menu
    Then click on context menu
    Then right click the box and assert for the context menu for "You selected a context menu"

    Scenario: Digest Authentication
    Then unfortunetly has to be all in one go or its just cuz im a novice so ready the alert then click on digest authentication and enter the login info
    Then assert for "Congratulations! You must have the proper credentials."

#--------------------------------------------------------------------
    Scenario: Disappearing Elements home
    Then click on disappearing elements
    Then check and assert for tab 1 to be "Home" tab

    Scenario: Disappearing Elements about
    Then click on disappearing elements
    Then check and assert for tab 2 to be "About" tab

    Scenario: Disappearing Elements contact
    Then click on disappearing elements
    Then check and assert for tab 3 to be "Contact Us" tab

    Scenario: Disappearing Elements portfolio
    Then click on disappearing elements
    Then check and assert for tab 4 to be "Portfolio" tab

    Scenario: Disappearing Elements gallery 
    Then click on disappearing elements
    Then check and assert for tab 5 to be "Gallery" tab
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

#--------------------------------------------------------------------
    Scenario: Dynamic Loading hidden
    Then click on dynamic Loading
    Then click on hidden Link
    Then click the start button on the dynamic load
    Then assert for the dynamic load "Hello World!" to appear

    Scenario: Dynamic Loading rendered
    Then click on dynamic Loading
    Then click on the rendered Link
    Then click the start button on the dynamic load
    Then assert for the dynamic load "Hello World!" to appear
#--------------------------------------------------------------------

    Scenario: Entry Ad
    Then click on entry ad
    Then assert that the modal window appeared
    Then close the modal
    Then reclick the modal activate
    Then assert that the modal window appeared

    Scenario: Exit Intent
    Then click exit Intent
    Then mouse out and assert for the modal

    Scenario: File Download
    Then click on file download
    Then click on the logo.png and assert for file Downloaded

    Scenario: File Upload
    Then click file Upload
    Then upload the logo.png file
    Then click the upload button 
    Then assert for txt that "File Uploaded!" and "logo.png" in the results screen

#--------------------------------------------------------------------
    Scenario: Floating Menu default
    Then click on floating menu
    Then assert for menu url to be defaut "https://the-internet.herokuapp.com/floating_menu"

    Scenario: Floating Menu home
    Then click on floating menu
    Then click home tab in floating menu
    Then assert for menu url to be home "https://the-internet.herokuapp.com/floating_menu#home"

    Scenario: Floating Menu news
    Then click on floating menu
    Then click news tab in floating menu
    Then assert for menu url to be news "https://the-internet.herokuapp.com/floating_menu#news"

    Scenario: Floating Menu contact
    Then click on floating menu
    Then click contact tab in floating menu
    Then assert for menu url to be contact "https://the-internet.herokuapp.com/floating_menu#contact"

    Scenario: Floating Menu about
    Then click on floating menu
    Then click about tab in floating menu
    Then assert for menu url to be about "https://the-internet.herokuapp.com/floating_menu#about"
#--------------------------------------------------------------------

    # Scenario: Forgot Password


    Scenario: Form Authentication
    Then click form authentication
    Then enter the user and password incorrectly and click login
    Then assert for the "Your password is invalid!" message on the form authentication
    Then clear both fields and enter the user and password correctly this time
    Then assert for the message "You logged into a secure area!" on the form authentication

#--------------------------------------------------------------------
    Scenario: Frames nested
    Then click on frames
    Then click on the nested link
    Then assert that "right" frame says "RIGHT"
    Then assert that "left" frame says "LEFT"
    Then assert that "middle" frame says "MIDDLE"
    Then assert that bottom frame says "BOTTOM"

    Scenario: Frames iframe
    Then click on frames
    Then click on the iframe link
    Then click the x on the pop up for fun
    Then assert for thet text in the paragraph thing "Your content goes here."
#--------------------------------------------------------------------

    @geolocation
    Scenario: Geolocation
    Then click on Geolocation
    Then click where am i
    Then assert for latitude to be "44.97408" and longitude to be "-124.010496"
    Then click see it on google
    Then zoom out a bit and take a screen shot

#--------------------------------------------------------------------
    Scenario: Horizontal Slider 1
    Then click on the horizontal Slider
    Then slide the slider to "1"
    Then assert for slider to be at "1"

    Scenario: Horizontal Slider 3.5
    Then click on the horizontal Slider
    Then slide the slider to "3.5"
    Then assert for slider to be at "3.5"

    Scenario: Horizontal Slider 5
    Then click on the horizontal Slider
    Then slide the slider to "5"
    Then assert for slider to be at "5"
#--------------------------------------------------------------------

#--------------------------------------------------------------------
    Scenario: Hovers user 1
    Then click on the Hovers
    Then hover over user "1" and assert for "name: user1" for text and is visible
    
    Scenario: Hovers user 2
    Then click on the Hovers
    Then hover over user "2" and assert for "name: user2" for text and is visible
    
    Scenario: Hovers user 3
    Then click on the Hovers
    Then hover over user "3" and assert for "name: user3" for text and is visible
#--------------------------------------------------------------------

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

