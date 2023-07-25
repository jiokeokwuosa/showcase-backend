# Showcase App
A Typescript/Node JS(Express) backend server

## Features

- Users can signup
- Users can login
- User can retrive profile data
- Users can make API call with axios

## Technologies

- Typescript
- Node JS(Express)
- Prisma
- CockroachDB (based on PostgreSQL)
- Mocha

## Requirements and Installation

To install and run this project you would need to have installed:
- Node Js
- Git

To run:
```
$ git clone https://github.com/jiokeokwuosa/showcase-backend.git
$ cd showcase-backend
$ create .env and add the necessarily values as seen in .env.sample file
$ npm install
$ npm run migration(for migration)
$ npm run dev
```

## Testing
```
- Unit Test: npm run test
```

## Tracker stories

None

## Template UI

None

## API

The API is currently in version 1 (v1) and can be accessed locally via [http://localhost:yourPortNumber/api/](http://localhost:yourPortNumber/api/)

## API Documentation Link

None

## Endpoints

| Endpoint                                         | Functionality                            |
| ------------------------------------------------ | -----------------------------------------|
| /api/auth/register     | Create account for a user           |
| /api/auth/login   | Login a user          |
| /api/auth/profile          | Return user profile                          |
| /api/users/random   | Return a random user           |

Note: to register a user you have to provide: email, password, firstName and lastName. To login provide email and password


## Author

Okwuosa Chijioke (Okwuosachijioke@gmail.com)

## License

This is licensed for your use, modification and distribution under the [MIT license.](https://opensource.org/licenses/MIT)

## My Env Variables
PORT= use your desired port
DATABASE_URL= you can get a free Database url by signing up at https://cockroachlabs.cloud/clusters and creating a free cluster
JWT_SECRET= use any value you want


