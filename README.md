# Argent Bank API

Project 11 during the Open Classroom cursus. It was meant practice more React, to discover Redux and global state-management, and use swagger as a tool to write comprehensive API endpoints and specifications. Design was not meant to be important but rather implementation of the desired features.
Original design as a template for the project can be seen in /designs
To start: 
-	start the server (instruction below) 
-	go to frontend/client and: npm run dev

## Original repository:

https://github.com/OpenClassrooms-Student-Center/Debuggez-une-application-React.JS

## About the swagger files:

- swagger.yaml was present from the start from the original repository.
- swagger_phase_2_v3.yaml is the last version after some final advice by the Mentor.
- swagger_phase_2_v2.yaml was my final proposition with a category list for transactions after Mentor's advice.
- swagger_phase_2_v1.yaml was my first approach using PUT instead of DELETE and POST in order to have less routes.

## Old Readme below:

This codebase contains the code needed to run the backend for Argent Bank.

## Getting Started

### Prerequisites

Argent Bank uses the following tech stack:

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```

### Instructions

1. Fork this repo
1. Clone the repo onto your computer
1. Open a terminal window in the cloned project
1. Run the following commands:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev:server

# Populate database with two users
npm run populate-db

# Frontend
# make sure you are in the right folder (cd frontend cd client)
npm run dev
```

Your server should now be running at http://locahost:3001 and you will now have two users in your MongoDB database!

## Populated Database Data

Once you run the `populate-db` script, you should have two users in your database:

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`


## API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

## Design Assets

Static HTML and CSS has been created for most of the site and is located in: `/designs`.

For some of the dynamic features, like toggling user editing, there is a mock-up for it in `/designs/wireframes/edit-user-name.png`.

And for the API model that you will be proposing for transactitons, the wireframe can be found in `/designs/wireframes/transactions.png`.