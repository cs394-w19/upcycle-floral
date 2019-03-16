This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.



## SYSTEM REQUIREMENTS

- node.js v10.15.0
- firebase v6.5.0


## How to download and install the code

Clone the repository to your desktop using git clone or downloading ZIP

```bash
$ git clone https://github.com/cs394-w19/upcycle-floral.git [your-local-directory]
```
Once you set up the repository cd to the folder and then run 'npm install'

```bash
$ cd upcycle-floral
$ npm install
```


## How to build and deploy the app on firebase

### Using firebase
1. Go to [firebase website](https://firebase.google.com/) and sign up using Google account
2. Go to [firebase console](firebase website](https://firebase.google.com/)) and Add project.
3. Project name can be anything and create project. In our case, we are using "abcde-c998a"
4. Go back to your termainal and run the following to intall firebase globally and initialize firebase: 
```bash
$ npm install -g firebase-tools
$ firebase init
```
5. Then select Database, Hosting, and Storage using spacebar and choose the project "abcde-c998a"
6. Open up database.rules.json and edit
```json
{
  "rules": {
    ".read": "auth != true",
    ".write": "auth != true"
  }
}
```
7. Then, your terminal will ask "What do you want to use as your public directory? (public)". Type "build"
8. Open another terminal window and do
```bash
$ npm run build
```
9. Go back to your original terminal where we were setting up firebase. Press enter.
10. Type 'y' and press enter to 'configured as a single-page app'
11. Type 'N'to "File build/index.html already exists. Overwrite?"
12. Run the following
```bash
$ firebase deploy
```

In our case we wil build and deploy our app on firebase.
```bash
$ cd upcycle-floral
$ npm install
```
#### Done!

## Platform constraints for development

## Platform constraints for deployment 

## Dependencies not handle by app's package manager

## Current Limitations

