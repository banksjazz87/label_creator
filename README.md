# The Label Creator

## What Does It Do?

### ``Problem``
  Companies that ship out a number of different items on one skid need a way to create a pack slip, carton labels, and skid labels.  From my experience, this would require typing out the same data more than once.

### ``Solution``
  With this application, companies no longer need to iterate over the same data more than once.  By simply entering all of the information in the creator_page, all of the data is then modified to create:
* Pack Slip
* Carton Labels
* Skid Papers
<br/>
<br/>

## Features

### ``Login page``
For demo purposes the username is "Demo" and the password is "demo123".

### ``Options Page``
The options page gives you the opportunity to either create a new document or search for a previous document.  You can search by Job#, PO# or company name.

### ``Creator Page``
**The creator page gives you the ability to:**
* Create an entirely new document.
* Modify an already exisiting document.
* Delete the current document.

You will need to be sure to click the 'Submit' button and then then the 'Save' button, in order to save the document to the database.

**Math functions provided in the Creator Page:**
* Commas are placed automatically, for all numbers.

**Handling items that have cartons at different quantitites.**
* You will have to type the total quantity needed and total shipped on two seperate lines, with the carton with the differing quantity on a line of its own.

| qtyNeed   | itemDescription   | packsRolls  | qtyPerCarton  | numOfCartons  | qtyShipped  |
| --------  | ---------------   | ----------  | ------------  | ------------  | ----------  |
| 200       | Bananas           | 50          | 150           | 1             | 200         |
| 200       | Bananas           | 50          | 50            | 1             | 200         |

The pack slip will turn this two line item, into one line.

### ``Pack Slip Page``
The pack slip page displays the data from the creator page in a way that resembles a stylized Excel sheet.

**Math functions provided in the Creator Page:**
* The sum of all of the items is automatically calculated.
* The sum of all of the cartons is automatically calculated.

### ``Labels Page``
This page gives the user the ability to select each label and print out the required number that they need.  The number of copies needed for each label is provided at the top of the page.  Once you have printed all of the required labels, an alert message appears to let you know that all of the labels have been printed.

### ``Ship To Page``
This page provides the tag that should be placed on the front and the back of a skid.  This contains the ship from address, ship to address, and PO#.
<br/>
<br/>

## Getting Started

### ``Node``
You will need to have node.js installed on your local system.  You can do this by following the directions listed [here](https://nodejs.org/en/). 

### ``Dependencies``
Once Node is installed. In the project directory, you will need to  install all of the package.json dependencies, this can be done by running:

    
    npm install

### ``Change Directory``
You will need to enter into the correct directory in you terminal.

    cd my-app
    

### ``Development Mode``

The development mode will run on http://localhost:3000. The development mode can be ran by using the command.

    
    npm run start
    
*All features will not be able to be used in the development       mode, because the back-end is needed to store data.  You can create a non-functional (pre-determined data) development mode by following the insructions in the: `creator.js`, `label.js`, `packSlip.js`, and `shipTo.js` files.*

### ``Production Mode``
The server will run on http://localhost:4500. The entire application can be ran by entering the following commands. 

    npm run build
    npm run server
<br/>
<br/>
    
## Dependencies
<hr/>

* cors
* express
* mongodb
* nodemon
* react
* react-dom
* react-router-dom
* react-scripts
* web-vitals
<br/>
<br/>

## Summary
This application is going to remove a lot of redundancies in my place of current employment.  We will go from typing each item twice, to only once, and we will only need to create one document, rather than three.  This should save a lot of time, and gives me a launching pad to possibly create other applications that will further expedite the shipping process.  

If you would like to have any features added or if you would like to make any, just shoot me a message or a pull request.  Thanks for checking this out.
