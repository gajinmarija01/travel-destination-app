# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### How to run the project

- `git clone` this repo
- install the dependencies with `npm run install`
- run the local server with `npm start`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

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

## App Specificities

This travel destination app allows users to explore various travel destinations, view details about each location, and save their favorite spots. Key features include:

- **Destination Search**: Users can search for travel destinations by name or category.
- **Detailed Views**: Each destination has a detailed view with images, descriptions, and user reviews.

## Features

- **Search Destinations**: Type in the search bar to find destinations and select one from the dropdown.
- **View Destination Details**: See detailed information about the selected destination, including nearby places.
- **Explore Nearby Destinations**: Click on a nearby destination to view its details and see its nearby places.
- **Deep Linking**: The app supports URL-based state, so you can bookmark or share a link that restores the current destination.
- **Error Handling**: Provides loading indicators and error messages when fetching data.
- **Keyboard Accessible**: Fully accessible via keyboard, including navigation through the search dropdown and nearby places.

## Tech Stack

- **React**: UI library for building the frontend.
- **TypeScript**: Strongly typed JavaScript for reliable and maintainable code.
- **Material-UI**: A React component library for building beautiful, responsive user interfaces.
- **React Router**: Handles URL-based state and deep linking using query parameters.
- **Axios**: For making API calls (mocked API for destination details).
- **Debounce**: To optimize search performance and prevent unnecessary API calls.

## Usage

- **Search for a destination**: Start typing the name of a destination in the search bar.
- **Select a destination**: Click on a destination from the dropdown or use the keyboard to navigate and press Enter.
- **View details**: Once a destination is selected, its details will be displayed, including nearby destinations.
- **Explore nearby destinations**: Click on any of the nearby destinations to view their details.
- **Deep linking**: You can bookmark or share the URL, and it will restore the selected destination when the page is reloaded.

## Deep Linking Example

If you select Paris, France, the URL will be updated to something like:
http://localhost:3000/?destinationId=1
Sharing or bookmarking this link will allow users to reload the app and see details about Paris directly.

## Keyboard Accessibility

The Autocomplete component used for the search bar is fully keyboard accessible:

- **Tab**: Focus on the input field.
- **Arrow keys**: Navigate through the dropdown options.
- **Enter**: Select an option.
- **Esc**: Close the dropdown.
  The nearby destinations are also accessible via keyboard navigation.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
