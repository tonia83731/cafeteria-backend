# GET USER-PROFILE

- path: `/api/users/:account/user-profile`
- method: `GET`
- identity: `user`

**Request:**

- **API need to login，Request add Token，Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

Body no need any column

**Response:**

## API Success

Return a JSON **Object**

```json
{
  "id": 17,
  "name": "User3",
  "email": "user3@example.com",
  "account": "@user3",
  "address": null,
  "phone": null,
  "isAdmin": false,
  "language": "zh",
  "invoice": null,
  "createdAt": "2025-02-28T11:03:28.000Z",
  "updatedAt": "2025-02-28T11:03:28.000Z"
}
```

### API 錯誤回傳格式

`status 404`

```json
{
  "error": "User does not exist"
}
```
