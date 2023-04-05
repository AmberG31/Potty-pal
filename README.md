![Logo](https://raw.githubusercontent.com/AmberG31/Potty-pal/main/frontend/public/mini-logo.svg)

# Potty-Pals

Potty Pals is a toilet finding web app. It has a number of features that can be easily accessed from a UI to generate a list of toilets in a particular location. The app displays the 'Potty Pal' logo, as a pins on a map with easy to read pop-ups offering information about specific toilets, including facilities, pricing and ratings.

## Features

- Login/Sign-Up
- Add toilet
- Review Toilet
- Add toilet image
- View Toilets
- Map Pin with geolocation

## Prerequisites

You have to make sure that `mongodb`, `npm` and `node` have been installed in your local machine before running the project. If not, follow the steps below.

- npm

  ```sh
  npm install npm@latest -g
  npm -v
  ```

- nvm & node

  ```sh
  # visit https://github.com/nvm-sh/nvm on how to install nvm
  nvm install node
  node -v
  ```

- mongodb
  ```sh
  brew tap mongodb/brew
  brew install mongodb-community@5.0
  brew services start mongodb-community@5.0
  ```

---

## Running Tests

To run tests, run the following commands

```bash
  cd backend

  npm run test
```

```bash
  cd frontend

  npm run test
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/AmberG31/Potty-pal
```

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Tech Stack

This project was built with the following tools:

- [![React][react-shield]][react-url]
- [![mongodb][mongodb-shield]][mongodb-url]
- [![express][express-shield]][express-url]
- [![tailwindcss][tailwindcss-shield]][tailwindcss-url]
- [![Cypress][cypress-shield]][cypress-url]
- [![Jest][jest-shield]][jest-url]

[typescript-shield]: https://img.shields.io/badge/Typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[circleci-shield]: https://img.shields.io/badge/circleci-000000?style=for-the-badge&logo=circleci&logoColor=white
[circleci-url]: https://circleci.com/
[jest-shield]: https://img.shields.io/badge/jest-c21325?style=for-the-badge&logo=jest&logoColor=white
[jest-url]: https://jestjs.io/
[react-shield]: https://img.shields.io/badge/reactjs-20232a?style=for-the-badge&logo=react&logoColor=61dafb
[react-url]: https://reactjs.org/
[cypress-shield]: https://img.shields.io/badge/cypress-007780?style=for-the-badge&logo=cypress&logoColor=white
[cypress-url]: https://www.cypress.io/
[tailwindcss-shield]: https://img.shields.io/badge/tailwindcss-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8
[tailwindcss-url]: https://tailwindcss.com/
[mongodb-shield]: https://img.shields.io/badge/mongodb-023430?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/
[express-shield]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
