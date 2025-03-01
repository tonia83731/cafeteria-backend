# ADMIN LOGIN

- path: `/api/admin/login`
- method: `POST`
- identity: `admin`

**Request:**

Body need to include information below:

- Required column
  - `email`:String
  - `password`:String

**Response:**

## API Success

Return a JSON **Object**, including User basic info and token

```json
{
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "account": "@admin",
    "address": null,
    "phone": null,
    "isAdmin": true,
    "language": "zh",
    "invoice": null,
    "createdAt": "2024-11-06T13:13:15.000Z",
    "updatedAt": "2024-11-06T13:13:15.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MDc0MTI2OSwiZXhwIjoxNzQxMDAwNDY5fQ.72MATgGmx1BiPxpj_rpSW2FwjI7wteUjPQyfmzPs-ho"
}
```

Store **token** in localStorage for login authentication

```js
// login
localStorage.setItem("admin", JSON.stringify(token));

// logout
localStorage.removeItem("admin");
```

### API 錯誤回傳格式

`status 400`

When input has error (blank input || type error)

```json
{
  "message": "Email, password cannot be blank"
}
```

`status 401`

```json
{
  "message": "Email or password incorret"
}
```
