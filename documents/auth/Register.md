# USER REGISTER

- path: `/api/register`
- method: `POST`

**Request:**

Body need to include information below:

- Required column
  - `name`:String
  - `email`:String
  - `password`:String
  - `account`:String

**Response:**

## API Success

Return a JSON **Object**, including User basic info and token

```json
{
  "user": {
    "id": 17,
    "name": "User3",
    "email": "user3@example.com",
    "account": "@User3#test",
    "updatedAt": "2025-02-28T11:03:28.596Z",
    "createdAt": "2025-02-28T11:03:28.596Z"
  },
  "cart": {
    "id": 14,
    "userId": 17,
    "updatedAt": "2025-02-28T11:03:28.610Z",
    "createdAt": "2025-02-28T11:03:28.610Z"
  }
}
```

### API 錯誤回傳格式

`status 400`

When input has error (blank input || type error)

```json
{
  "message": "Name, email, password, account are required."
}

{
  "message": "Name must between 3-50 letters."
}

{
  "message": "Invalid email."
}

{
  "message": "Required strong password (above 8 letters, 1 lowercase, 1 uppercase, 1 number and 1 symbol)"
}
```

When user already exist

```json
{
  "message": "User already existed."
}
```
