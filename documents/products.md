## GET PRODUCTS 取得所有產品

- path: `/api/products`
- method: `GET`
- role: `所有訪問網站的訪客`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數
- 若需取得**分頁**，參考: `/api/products?page=`
- 若需查詢特定**類別**產品，參考: `/api/products?categoryId=`

**Response:**

### API Success

- 回傳 JSON **陣列**

```json
{
    "success": true,
    "data": [
        {
            "id": 17,
            "title": "美式咖啡",
            "title_en": "Americano",
            "description": "濃縮咖啡加上熱水，口感濃郁但不苦澀，保留咖啡的原始風味，適合喜愛純粹咖啡香氣的人。",
            "description_en": "Espresso diluted with hot water, offering a bold yet smooth taste. It retains the original coffee aroma, perfect for those who appreciate pure coffee flavors.",
            "price": 50,
            "categoryId": 4,
            "categoryCode": "COFFEE",
            "image": "https://i.imgur.com/9AbwuNX.jpeg",
            "is_published": true,
            "isWished": null,
            "createdAt": "2025-02-28T11:03:28.000Z",
            "updatedAt": "2025-02-28T11:03:28.000Z"
        }
        ...
    ]
}
```

## GET PRODUCT 取得單一產品

- path: `/api/products/:productId`
- method: `GET`
- role: `所有訪問網站的訪客`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "data": {
    "id": 17,
    "title": "美式咖啡",
    "title_en": "Americano",
    "description": "濃縮咖啡加上熱水，口感濃郁但不苦澀，保留咖啡的原始風味，適合喜愛純粹咖啡香氣的人。",
    "description_en": "Espresso diluted with hot water, offering a bold yet smooth taste. It retains the original coffee aroma, perfect for those who appreciate pure coffee flavors.",
    "price": 50,
    "categoryId": 4,
    "categoryCode": "COFFEE",
    "image": "https://i.imgur.com/9AbwuNX.jpeg",
    "is_published": true,
    "createdAt": "2025-02-28T11:03:28.000Z",
    "updatedAt": "2025-02-28T11:03:28.000Z"
  }
}
```

### API Error

`status 404`

```json
{
  "success": false,
  "message": "Product not found."
}
```
