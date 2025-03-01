# CHECK USER-AUTH

- path: `/api/users/checked-auth`
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
  "isAuth": true,
  "user": {
    "id": 17,
    "account": "@User3#test",
    "language": "zh"
  },
  "cartQty": 0
}
```
