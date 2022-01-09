# Couriers-API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Installation

Clone this repository to your local machine, navigate to its directory and type:

```bash
$ npm install
```

in order to have all project's dependencies installed.

## ENDPOINTS

baseUrl: http://localhost:3000

Since the API is not deployed it can be consumed via localhost at the following endpoints:

```html
method: GET ~/couriers
returns: a list with all couriers in the database (out of the scope of the test)
```

```html
method: GET ~/couriers/lookup?capacity_required=100
returns: a list with the couriers with available capacity greater or equal to 100
```

```html
method: POST ~/couriers
body:
{
    "stuart_id" : 500,
    "max_capacity": 150
}
returns: mongoDB given id of the new courier added to the database.
```

```html
method: PATCH ~/couriers/100
body:
{
    "max_capacity": 150
}
returns: {updated: true} in case there was a courier with stuartID equal to 100. If true: the courier's max_capacity updates in the database with the value 150.
```

```html
method: DELETE ~/couriers/100
returns: {deleted: true} in case there was a courier with stuartID equal to 100 and it has been deleted from the database.
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

```