# CardServerProject

## Description

This project is a user registration and management system built with Node.js and Express. It provides authentication using JWT, password encryption, and a card management system where users can perform CRUD operations on cards.

## Setup Environment Variables

 Configure the following variables:
   - **ATLAS_CONNECTION_STRING**: Your MongoDB connection string
   - **SECRET_WORD**: Secret string for JWT signing
   - **PORT**: Application port (default: 8181)

## Project Structure

cardServerProject/
├── app.js                         # Application entry point
├── package.json                   # Project dependencies and scripts
│
├── auth/                         # Authentication module
│   ├── authService.js           # Authentication middleware
│   └── providers/
│       └── jwt.js               # JWT token generation and verification
│
├── cards/                        # Cards module
│   ├── helpers/
│   │   ├── generateBizNum.js    # Business number generator
│   │   └── normalize.js         # Card data normalizer
│   ├── models/
│   │   ├── cardAccessDataService.js  # Card data access layer
│   │   └── mongodb/
│   │       └── Card.js          # Card mongoose model
│   ├── routes/
│   │   └── cardRestControllers.js    # Card route handlers
│   └── validation/
│       ├── cardValidationService.js  # Card validation service
│       └── joi/
│           └── joiValidationCard.js  # Joi validation schema
│
├── config/                      # Configuration settings
│   ├── default.json            # Default configuration
│   ├── development.json        # Development environment config
│   └── production.json         # Production environment config
│
├── DB/                         # Database configuration
│   ├── dbService.js           # Database connection service
│   └── mongodb/
│       ├── connectToAtlas.js  # MongoDB Atlas connection
│       └── connectToMongoLocally.js  # Local MongoDB connection
│
├── helpers/                    # Helper modules
│   └── mongodb/
│       ├── Address.js         # Address schema
│       ├── Image.js           # Image schema
│       ├── mongooseValidators.js  # Mongoose validation rules
│       └── Name.js           # Name schema
│
├── logger/                    # Logging configuration
│   ├── loggerService.js      # Logger service
│   └── loggers/
│       └── morganLogger.js   # Morgan logger configuration
│
├── middlewares/              # Express middlewares
│   └── cors.js              # CORS configuration
│
├── public/                   # Static files
│   ├── home.html            # Home page
│   └── images/              # Image assets
│
├── router/                   # Main router
│   └── router.js            # Route definitions
│
├── users/                    # Users module
│   ├── helpers/
│   │   └── bcrypt.js        # Password encryption
│   ├── models/
│   │   ├── userAccessDataService.js  # User data access layer
│   │   └── mongodb/
│   │       └── User.js      # User mongoose model
│   ├── routes/
│   │   └── userRestControllers.js    # User route handlers
│   └── validation/
│       ├── userValidationService.js  # User validation service
│       └── joi/
│           ├── loginValidation.js    # Login validation schema
│           └── registerValidation.js  # Registration validation schema
│
└── utils/                    # Utility functions
    ├── handleErrors.js       # Error handling utility
    ├── timeHelper.js        # Time formatting helper
    └── seedDB.js            # Database seeding utility

## Features

- User registration and login with JWT authentication
- Password encryption using bcrypt
- Card management system (CRUD operations)
- MongoDB database integration
- Input validation with Joi
- Logging with Morgan
- CORS support
- Support for multiple environments (local and cloud/Atlas)
- Proper HTTP response handling with status codes and error messages
- Initial data setup for users and cards
- Mongoose models for structured database management
- Admins can update business numbers while ensuring uniqueness
- Error logs (status code 400 and above) are saved in a log file with date-based filenames

## Libraries Used

- **bcryptjs** (^2.4.3): Password hashing
- **chalk** (^5.4.1): Terminal styling
- **config** (^3.3.12): Configuration management
- **cors** (^2.8.5): Cross-Origin Resource Sharing
- **cross-env** (^7.0.3): Environment variable management
- **dotenv** (^16.4.7): Environment variable loading
- **express** (^4.21.2): Web framework
- **joi** (^17.13.3): Schema validation
- **jsonwebtoken** (^9.0.2): JWT authentication
- **lodash** (^4.17.21): Utility functions
- **mongoose** (^8.10.0): MongoDB ODM
- **morgan** (^1.10.0): HTTP request logging

## Command Usage

- **`npm test`**: Run tests (currently outputs error - no tests specified)
- **`npm start`**: Run in production mode
- **`npm run dev`**: Run in development mode with nodemon
- **`npm run prod`**: Run in production mode with Atlas DB
- **⚠️ `npm run clearDatabase`**: Clear database (use with caution)

## Installation

1. Clone the repository:
```sh
git clone <repository_url>
cd <project_directory>
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
   - Configure MongoDB connection and JWT secrets

4. Start the application:
```sh
npm start
```
## API Documentation
Detailed API documentation can be found in [API.md](API.md)

## API Endpoints

### User Endpoints

| No. | URL          | Method | Authorization | Action                 |
|-----|-------------|--------|---------------|------------------------|
| 1   | /users      | POST   | All          | Register user          |
| 2   | /users/login| POST   | All          | Login user             |
| 3   | /users      | GET    | Admin        | Get all users          |
| 4   | /users/:id  | GET    | User/Admin   | Get user by ID         |
| 5   | /users/:id  | PUT    | User         | Edit user              |
| 6   | /users/:id  | PATCH  | User         | Change business status |
| 7   | /users/:id  | DELETE | User/Admin   | Delete user            |

### Card Endpoints

| No. | URL                   | Method | Authorization   | Action                |
|-----|----------------------|--------|-----------------|----------------------|
| 1   | /cards               | GET    | All            | Get all cards         |
| 2   | /cards/my-cards      | GET    | Registered User| Get user cards        |
| 3   | /cards/:id           | GET    | All            | Get specific card     |
| 4   | /cards               | POST   | Business User  | Create new card       |
| 5   | /cards/:id           | PUT    | Owner          | Edit card             |
| 6   | /cards/:id           | PATCH  | Registered User| Like card             |
| 7   | /cards/:id           | DELETE | Owner/Admin    | Delete card           |
| 8   | /cards/:id/bizNumber | PATCH  | Admin          | Update card bizNumber |

## API Request Formats

### Users

#### Register User
```json
{
    "name": {
        "first": "John",
        "middle": "M.",
        "last": "Doe"
    },
    "phone": "1234567890",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "image": {
        "url": "https://example.com/image.jpg",
        "alt": "Profile image"
    },
    "address": {
        "state": "CA",
        "country": "USA",
        "city": "Los Angeles",
        "street": "Main St",
        "houseNumber": 10,
        "zip": 90001
    },
    "isBusiness": false
}
```

#### Login User
```json
{
    "email": "john@example.com",
    "password": "SecurePass123!"
}
```

### Cards

#### Create Card
```json
{
    "title": "Business Card",
    "subtitle": "Your Best Partner",
    "description": "A great business card for professionals.",
    "phone": "1234567890",
    "email": "business@example.com",
    "web": "https://business.com",
    "image": {
        "url": "https://example.com/card.jpg",
        "alt": "Business card image"
    },
    "address": {
        "state": "CA",
        "country": "USA",
        "city": "San Francisco",
        "street": "Market St",
        "houseNumber": 100,
        "zip": 94103
    }
}
```

## CORS Configuration

CORS is configured in `middlewares/cors.js`. To add new allowed origins:

1. Open `middlewares/cors.js`
2. Add new origins to the origin array:
```javascript
const corsOptions = {
    origin: ["http://localhost:3000", "https://your-domain.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};
```
3. Restart the server after changes

## Error Logging

- Error logs (status code 400+) are saved in the `logs` directory
- Filenames are date-based (e.g., `2025-02-19.log`)
- Logs include timestamp, error details, and request information
