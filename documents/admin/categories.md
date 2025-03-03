## GET CATEGORIES 取得所有產品

- path: `/api/admin/categories`
- method: `GET`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON **陣列**

```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "code": "COFFEE",
      "has_opts": true,
      "createdAt": "2025-02-28T11:03:28.000Z",
      "updatedAt": "2025-02-28T11:03:28.000Z"
    },
    ...
  ]
}
```
