# The Label Creator

## ``What Does It Do?``

### Problem
  Companies that ship out a number of different items on one skid need a way to create a pack slip, carton labels, and skid labels.  From my experience, this would require typing out the same data more than once.

### Solution
  With this application, companies no longer need to iterate over the same data more than once.  By simply entering all of the information in the creator_page, all of the data is then modified to create:
* Pack Slip
* Carton Labels
* Skid Papers



## ``Getting Started``

### Node
* You will need to have node.js installed on your local system.  You can do this by following the directions listed [here](https://nodejs.org/en/). 

### Dependencies
* Once Node is installed. In the project directory, you will need to  install all of the package.json dependencies, this can be done by running:
    ```
    npm install
    ```

### Development Mode
* The development mode can be ran by using the command.
    ```
    npm run start
    ``` 
*All features will not be able to be used in the development       mode, because the back-end is needed to store data.  You can create a non-functional (pre-determined data) development mode by following the insructions in the: `creator.js`, `label.js`, `packSlip.js`, and `shipTo.js` files.*



### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
