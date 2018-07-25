# Product Engineer Code Sample

## Instructions

Please implement a form to create a new survey. A [mockup](./create-survey-form.png) is provided for visual reference on the inputs that should be included and how the form should look. It does not need to be pixel perfect. You'll need to fetch the locales that are supported on our platform to populate the select component. In addition to the form, add a "Success!" view that can look however you'd like.

## Implementation

I implemented the code with two main components (located in folder /src/components) one handling the Form and the other handling the Fetching of the locales. To keep things simple I didn't used Redux but it made sense to implement it as it would make testing more sustainable (those axiosMock calls can get messy and I could replace then for having a initialState).

For the UI library I chose to use Rebass that is a simplified CSS-in-JS library built on top of styled-components.

For testing I used react-testing-library instead of the usual enzyme. While it proved as a interesting way to test components it has some drawbacks because it's harder to test react components properties and interactions since you are always working over DOM.

For data fetching I resorted to simple axios calls, on a bigger project I would structure then either as redux actions (I'm personally a big fan of redux-axios-middleware).

Also in a bigger project it would made sense to use a router and keep the specific pages in a /src/pages folder.

## Tasks

To start the server run npm start

To run the test suite run npm test
