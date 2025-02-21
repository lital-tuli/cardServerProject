# API Documentation

## Authentication
All protected endpoints require a JWT token sent in the header as `x-auth-token`.

```http
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Response Format
All endpoints return data in the following format:

### Success Response
```json
{
    "data": {
        // Response data here
    }
}
```

### Error Response
```json
{
    "error": {
        "message": "Error description",
        "status": 400
    }
}
```

## Users API

### Register New User
Create a new user account.

```http
POST /users
```

#### Request Body
```json
{
    "name": {
        "first": "John",
        "middle": "",
        "last": "Doe"
    },
    "phone": "050-0000000",
    "email": "john@example.com",
    "password": "Password123!",
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

#### Validation Rules
- `first`, `last`: 2-256 characters, required
- `phone`: Valid Israeli phone format
- `email`: Valid email format, unique in system
- `password`: 9+ chars, uppercase, lowercase, number, special
- `url`: Valid URL format
- `country`, `city`, `street`: 2-256 characters, required
- `houseNumber`: Number > 0, required
- `zip`: Number, optional

#### Response (201 Created)
```json
{
    "data": {
        "_id": "user_id",
        "name": {
            "first": "John",
            "middle": "",
            "last": "Doe"
        },
        "email": "john@example.com"
    }
}
```

### User Login
Authenticate a user and receive a JWT token.

```http
POST /users/login
```

#### Request Body
```json
{
    "email": "john@example.com",
    "password": "Password123!"
}
```

#### Response (200 OK)
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Cards API

### Create Business Card
Create a new business card (Business users only).

```http
POST /cards
```
#### Headers
```http
x-auth-token: <jwt_token>
```

#### Request Body
```json
{
    "title": "Business Name",
    "subtitle": "Business Tagline",
    "description": "Detailed business description",
    "phone": "050-0000000",
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

#### Validation Rules
- `title`, `subtitle`: 2-256 characters, required
- `description`: 2-1024 characters, required
- `phone`: Valid Israeli phone format
- `email`: Valid email format
- `web`: Valid URL format (optional)
- `country`, `city`, `street`: 2-256 characters, required
- `houseNumber`: Number > 0, required

#### Response (201 Created)
```json
{
    "data": {
        "_id": "card_id",
        "title": "Business Name",
        "bizNumber": 1234567,
        "user_id": "user_id",
        "likes": []
    }
}
```

### Get All Cards
Retrieve all business cards.

```http
GET /cards
```

#### Query Parameters
- `page` (optional): Page number for pagination (default: 1)
- `perPage` (optional): Items per page (default: 10)

#### Response (200 OK)
```json
{
    "data": [{
        "_id": "card_id",
        "title": "Business Name",
        "subtitle": "Business Tagline",
        "description": "Detailed business description",
        "phone": "050-0000000",
        "email": "business@example.com",
        "web": "https://business.com",
        "image": {
            "url": "https://example.com/card.jpg",
            "alt": "Business card image"
        },
        "bizNumber": 1234567,
        "likes": ["user_id1", "user_id2"],
        "user_id": "owner_user_id"
    }],
    "metadata": {
        "totalPages": 5,
        "currentPage": 1,
        "totalItems": 48
    }
}
```

### Like/Unlike Card
Toggle like status for a card.

```http
PATCH /cards/:id
```

#### Headers
```http
x-auth-token: <jwt_token>
```

#### Response (200 OK)
```json
{
    "data": {
        "_id": "card_id",
        "likes": ["user_id1", "user_id2"]
    }
}
```

### Update Card bizNumber (Admin Only)
Update a card's business number.

```http
PATCH /cards/:id/bizNumber
```

#### Headers
```http
x-auth-token: <jwt_token>
```

#### Request Body
```json
{
    "bizNumber": 1234567
}
```

#### Validation Rules
- `bizNumber`: 7 digits, unique in system

#### Response (200 OK)
```json
{
    "data": {
        "_id": "card_id",
        "bizNumber": 1234567
    }
}
```

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

## Rate Limiting
- 100 requests per 15 minutes per IP
- Error 429 (Too Many Requests) when limit exceeded

## Authentication Errors
- Invalid token: 401 Unauthorized
- Expired token: 401 Unauthorized
- Insufficient permissions: 403 Forbidden

## Business Rules
1. Only business users can create cards
2. Only card owner or admin can edit/delete cards
3. Any registered user can like/unlike cards
4. Only admin can change bizNumber
5. Email addresses must be unique in system
6. Business numbers must be unique 7-digit numbers