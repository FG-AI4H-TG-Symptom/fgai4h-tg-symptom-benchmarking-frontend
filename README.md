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

## Building and deploying

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

### Deploying to production

*This process requires a high access level to the GitHub repository.*

1. Define the necessary environment variables (matching `.env.development`) in [GitHub Secrets](https://github.com/FG-AI4H-TG-Symptom/fgai4h-tg-symptom-benchmarking-frontend/settings/secrets)
2. Pushing to master triggers a [GitHub Action](https://github.com/FG-AI4H-TG-Symptom/fgai4h-tg-symptom-benchmarking-frontend/actions?query=workflow%3A%22Build+and+upload+image%22)
    1. It builds the React app
    2. then places it in an nginx docker image
    3. and uploads it to [Docker Hub](https://hub.docker.com/repository/docker/fgai4htgsymptom/mmvb-frontend)
3. A separate build pipeline pulls this image and deploys it to Ada infrastructure. *Details not public.*

## Project Structure

The project aims to follow a "normal" React/Redux folder layout and file naming pattern, so familiarize yourself with 
these technologies and their common usage first.

### Top level folders

#### .github

Hosts GitHub Action workflow definitions used for linting PRs and building/deploying.

#### deploy

Auxiliary files relevant for the deployment process only.

#### public

Static assets, including the `index.html` file. Note that the source for the logos (`logo.svg`) resides in the `src`
directory and is included as an ES6-style import.

#### src

All source code, structure documented below

### Source folders

`src/index.tsx` is the entry point and mounts the React app to the DOM.

#### src/components

All React components, independent of whether they're representational, wrappers or what is commonly called "pages" or 
"views". They are grouped first by concept (AI implemetations, case sets, ...) and then by view.

Substructure documented below.

#### src/data

Everything related to managing the required data: fetching/saving (with Sagas), managing it locally (with Redux)
and being aware of the shapes and availability (with TypeScript types).

Again, there is a subfolder for each concept.

#### src/util

Anything not suitable above, including a few selected missing type definitions for imports.

### React component folders

A typical folder structure would consist of the following:

`{CONCEPT}{ACTION}Component.style.tsx`  
Styled components which are exclusive for this component

`{CONCEPT}{ACTION}Component.tsx`   
Representational component (unaware of redux!) taking data and action handlers as parameters

`{CONCEPT}{ACTION}Contaier.tsx`
Requests loading of data and fetches data from store, using hooks

`index.ts`  
re-exports {CONCEPT}{ACTION}Container component


### TypeScript

Everything should be written in TypeScript, even if the setup allows for cross-referencing JavaScript and TypeScript.
Especially interactions with Redux both heavily employ but also profit from strong contracts.
If necessary use `any` (or `as any`), preceded by a `// eslint-disable-next-line @typescript-eslint/no-explicit-any`.
In almost all cases the need for `any` indicates either an actual error or there is a (maybe complex way) of expressing
it with concise types.

## Used tooling

### React scripts

`react-scripts` is a package that comes with `create-react-app`. It provides opaque scripts for locally running, serving
and hot-reloading the React app, a test command (Jest, currently not used), and a build command. Internally this is based
on Babel and Webpack, but doesn't need any manual configuration (there is no Webpack config!).

### ESLint

ESLint is used for JavaScript and TypeScript linting. It's configured in `.eslintrc.json` but is mostly inherited from
[eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), amended with
TypeScript rules and a few overrides.

### Prettier

Prettier is used for code formatting. It's opinionated, so only very few overrides have been added to `.prettierrc`. In
rare cases there are incompatibilies between ESLint and Prettier, in that case it's usually easiest to re-phrase the 
specific snippet.

### Husky

Husky is a pre-commit tool and should prevent you from committing code that is not linted or well formated.

## Hints

### Schemas and generated typings

The Berlin model is managed in [this repository](https://github.com/FG-AI4H-TG-Symptom/fgai4h-tg-symptom-models-schemas).

The JSON schema itself should be place in `src/data/caseSets/berlinModel.schema.json`.

Run 
```
npx json-schema-to-typescript src/data/caseSets/berlinModel.schema.json src/data/caseSets/berlinModelTypes.ts --unreachableDefinitions
```

after updating the schema to update the generated typing (in `src/data/caseSets/berlinModelTypes.ts`) accordingly.


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
