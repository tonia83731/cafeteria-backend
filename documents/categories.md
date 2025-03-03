## GET CATEGORIES 取得所有產品

- path: `/api/categories`
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
