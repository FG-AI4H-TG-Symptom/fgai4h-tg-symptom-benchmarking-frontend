# FG AI4H TG Symptom – Benchmarking frontend

## Getting started

These instructions only apply to the frontend!
The backend has [its own repository](https://github.com/babylonhealth/itu_who_2019_symptom_assessment_mmv_benchmark) 
with the respective installation instructions.

### Prerequisites
- make sure you have a recent-ish version of `node` & `npm` installed
  (consider using [nvm](https://github.com/nvm-sh/nvm))

### Setting up
1. Clone the repository  
    `git clone https://github.com/FG-AI4H-TG-Symptom/fgai4h-tg-symptom-benchmarking-frontend.git`
2. Install dependencies  
    `npm i`
3. Start the development server  
    `npm start`
4. The frontend is available then on [http://localhost:3000](http://localhost:3000)

### Local production build

1. Configure the environment
   1. Copy `.env.development` to `.env.production` (the latter is ignored by git)
   2. Adjust values in `.env.production` as need
2. Build  
   `npm run build`
3. Serve using Docker
   1. Create an image  
      `docker build -t mmvb_frontend .`
   2. Start a container
      `docker run --name "mmvb_frontend" -d -p 8000:80 mmvb_frontend:latest`
4. If you don't have Docker: Serve using Python3 (or use any other static file server of your choice)  
   `python3 -m http.server --directory build 8000`  
   *This does not provide a History API fallback, i.e. you must always start navigating to `/`.*
   *Paths like `/cases` won't be accessible directly.*   
5. The production frontend is now available on [http://localhost:8000](http://localhost:8000)

## Project Structure
*Updated project structure will be documented soon*

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## React / `create-react-app`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
