# Business Card Management System

A RESTful API server built with Node.js and Express for managing business cards and users. This system allows users to create, read, update, and delete business cards while implementing authentication and authorization.

## Features

- User authentication and authorization using JWT
- Business card CRUD operations
- Role-based access control (Regular, Business, Admin users)
- MongoDB database integration
- Input validation using Joi
- Error handling and logging
- CORS support
- Database seeding with initial data

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lital-tuli/cardServerProject.git
cd cardServerProject
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=8181
ATLAS_CONNECTION_STRING=your_mongodb_connection_string
SECRET=your_jwt_secret_key
```

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

## API Endpoints

### Authentication

- `POST /users/` - Register a new user
- `POST /users/login` - Login user

### Cards

- `GET /cards` - Get all cards
- `GET /cards/:id` - Get specific card
- `GET /cards/my-cards` - Get user's cards (requires authentication)
- `POST /cards` - Create new card (requires business user)
- `PUT /cards/:id` - Update card (owner or admin only)
- `PATCH /cards/:id` - Like/unlike card (requires authentication)
- `DELETE /cards/:id` - Delete card (owner or admin only)

### Users

- `GET /users/:id` - Get user details (same user or admin only)

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## Database Seeding

The application includes automatic database seeding with initial data including:
- Regular user
- Business user
- Admin user
- Sample business cards

Seeding occurs automatically on first run if the database is empty.

## Test Users

```javascript
Regular User:
- Email: regular@gmail.com
- Password: Aa123456!

Business User:
- Email: business@gmail.com
- Password: Aa123456!

Admin User:
- Email: admin@gmail.com
- Password: Aa123456!
```

## Validation

- User registration and card creation include comprehensive validation using Joi
- Passwords must contain uppercase, lowercase, number, and special character
- Business numbers are automatically generated and unique
- Email addresses must be valid and unique

## Error Handling

The application includes centralized error handling with:
- Custom error messages
- Appropriate HTTP status codes
- Error logging
- Development/Production error response formatting

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Role-based access control
- CORS protection
- Input validation
- Error sanitization

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Lital Gehman

## Acknowledgments

- Express.js team
- MongoDB team
- All package maintainers
