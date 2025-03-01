# USER LOGIN

- path: `/api/login`
- method: `POST`
- identity: `user`

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
    "id": 17,
    "name": "User3",
    "email": "user3@example.com",
    "account": "@User3#test",
    "address": null,
    "phone": null,
    "isAdmin": false,
    "language": "zh",
    "invoice": null,
    "createdAt": "2025-02-28T11:03:28.000Z",
    "updatedAt": "2025-02-28T11:03:28.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoidXNlcjNAZXhhbXBsZS5jb20iLCJhY2NvdW50IjoiQFVzZXIzI3Rlc3QiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzQwNzQwOTM2LCJleHAiOjE3NDEwMDAxMzZ9.tFfP5-oKY0z9MO-CQpWPmjL0tSFBi2tO3cADEBt4pVQ"
}
```

Store **token** in localStorage for login authentication

```js
// login
localStorage.setItem("user", JSON.stringify(token));

// logout
localStorage.removeItem("user");
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
