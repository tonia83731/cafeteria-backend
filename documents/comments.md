## GET TOP5 COMMENTS

- path: `/api/admin/comments/top5`
- method: `GET`
- role: `所有訪問網站的訪客`

**Request:**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON **陣列**

```json
{
    "success": true,
    "data": [
        {
            "id": 15,
            "name": "Damin Wang",
            "email": "wang.daming@example.com",
            "rate": 5,
            "comment": "服務非常好，產品品質優良！",
            "createdAt": "2025-02-28T11:03:28.000Z",
            "updatedAt": "2025-02-28T11:03:28.000Z"
        },
        ...
    ]
}
```

## ADD COMMENT

- path: `/api/admin/comments`
- method: `POST`
- role: `所有訪問網站的訪客`

**Request:**

- body 需帶入以下參數:
  (必填) name: String
  (必填) email: String
  (必填) rate: Number
  comment: String

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "Comment created!"
}
```

### API Error

`status 400`

- 必填項目不可空白

```json
{
  "success": false,
  "message": "Title cannot be blank"
}
```

- Email 不合法

```json
{
  "success": false,
  "message": "Invalid email."
}
```

- 其他限制

```json
{
  "success": false,
  "message": "Rate should between 0.0-5.0."
}
```
