---
description: Get to know how you can develop the API!
---

# Running the API


* Install the `pnpm` package:

```bash
npm i pnpm
```

* Deploy install dependencies:

```bash
pnpm install
```
* Now make a database names as `Pherify` from mysqlworkbench or any other

* Now you will find a `init.sql` file inside `src/sql` run this file locally in mysqlworkbench or any other tool

* Start the server in development mode:

```bash
pnpm start
```
* The Final Step, visit: <a href="http://localhost:5050/api/api-docs">Localhost API docs</a> . Here you will find all the API routes and details.

## Tech Used

* Node js
* Express
* Sequelize (mysql ORM)
* mysql
* typescript
* swagger (for api documentation)

## Database Schemas
* `globalContacts` : This table consists all the details of users that are registered and non registered
* `contactList` : This table store all the Contacts (phonebook) that a logged in user have
* `user` : This Tables is used to store user details (login, register)

## API Endpoints
* `/auth/register` : to create an account
* `/auth/login` : to login into app
* `/user/markSpam` : to mark a phone number as spam
* `/user/list` : to list all the users/contacts (includes search). If you want to search on the basis of phone number the key would be `phone` and for name the key would be `name`