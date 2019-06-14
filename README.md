[![Build Status](https://travis-ci.org/TreeTechies/Auto-Mart.svg?branch=develop)](https://travis-ci.org/TreeTechies/Auto-Mart) [![Coverage Status](https://coveralls.io/repos/github/TreeTechies/Auto-Mart/badge.svg?branch=develop)](https://coveralls.io/github/TreeTechies/Auto-Mart?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/86a6f16a74913be2ce23/maintainability)](https://codeclimate.com/github/TreeTechies/Auto-Mart/maintainability)


# Auto-Mart
Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

## Required features
- `User can **sign up**.`
- `User can **sign in**.`
- `User **seller** can post a car **sale advertisement**.`
- `User **buyer** can make a **purchase order**.`
- `User **buyer** can update the price of his/her purchase order.`
- `User **seller** can mark his/her posted AD as **sold**.`
- `User **seller** can **update** the price of his/her posted AD.`
- `User can view a **specific car**.`
- `User can view **all unsold cars**.`
- `User can view all unsold cars **within a price range**.`
- `**Admin** can delete a posted AD record.`
- `**Admin** can view all posted ads whether sold or unsold`

## **Technologies**
- **Express JS**
- **Mocha and Chai**
- **Uuid**
- **Node**

## Requirements for Installation 
   **The following should followed so as to be able to run the application**

[Visual studio code](https://code.visualstudio.com/download) for cinfigurating and starting the application

[Node](https://nodejs.org/en/download/) a runtime environment for JavaScript
    
    
[Postman](https://www.getpostman.com/downloads/) for testing the Api endpoints



## **Clone the project** 
    - git clone https://github.com/TreeTechies/Auto-Mart.git
    - cd Auto-Mart
    - npm install (to install dependencies)

## **Running Tests**
    - npm run test


## **API endpoints**
`- POST /auth/signin - User Login` 

`- POST /auth/signup - User to create an account` 

`- POST /car/ - Post anew car advert` 

`- POST /order/ - Post anew order` 

`- PATCH /order/<:order-id>/price - Update price order` 

`- PATCH /car/<:car-id>/status - Get car status` 

`- PATCH /car/<:car-id>/price - Get car price` 

`- GET /car/<:car-id>/ - Get car by ID` 

`- GET /car?status=available - Get available cars` 

`- GET /car?status=available&min_price=XXXValue&max_price=XXXValue - Get available cars with price range`

`- DELETE /car/<:car_id>/ - Delete a car` 

`- GET /car/ - Admin can view all posted ads whether sold or unsold. `

## **Pivotal Tracker Stories**
## **ApI**

[API Docs](https://auto-mart-online-app.herokuapp.com/)

## **UI**
[Github Pages](https://treetechies.github.io/Auto-Mart/)

## **Author**
**Nsengimana Veda Dominique**