## GET PRODUCTS 取得所有產品

- path: `/api/admin/products`
- method: `GET`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數
- 若需查詢特定**類別**產品，參考: `/api/admin/products?categoryId=`

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
            "createdAt": "2025-02-28T11:03:28.000Z",
            "updatedAt": "2025-02-28T11:03:28.000Z"
        }
        ...
    ]
}
```

## GET PRODUCT 取得單一產品

- path: `/api/admin/products/:productId`
- method: `GET`
- role: `admin`

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

## ADD PRODUCT

- path: `/api/admin/products/add`
- method: `POST`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 需帶入以下參數:
  (必填) title: String
  (必填) title_en: String
  description: String
  description_en: String
  (必填) price: Number
  (必填) categoryId: Number
  file, 可接收 png, jpg, jpeg

```javascript
let formData = new FormData();
formData.set("title", title);
formData.set("title_en", title_en);
formData.set("price", price);
formData.set("categoryId", categoryId);
```

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
    "is_published": false,
    "createdAt": "2025-02-28T11:03:28.000Z",
    "updatedAt": "2025-02-28T11:03:28.000Z"
  }
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

- 字數限制

```json
{
  "success": false,
  "message": "Description cannot exceed 300 letters"
}
```

## UPDATED PRODUCT

- path: `/api/admin/products/:productId/updated`
- method: `PUT`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 需帶入以下參數:
  (必填) title: String
  (必填) title_en: String
  description: String
  description_en: String
  (必填) price: Number
  (必填) categoryId: Number
  file, 可接收 png, jpg, jpeg

```javascript
let formData = new FormData();
formData.set("title", title);
formData.set("title_en", title_en);
formData.set("price", price);
formData.set("categoryId", categoryId);
```

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
    "is_published": false,
    "createdAt": "2025-02-28T11:03:28.000Z",
    "updatedAt": "2025-02-28T11:03:28.000Z"
  }
}
```

### API Error

`status 404`

- 找不到產品

```json
{
  "success": false,
  "message": "Product not found"
}
```

## UPDATED PRODUCT PUBLISHED STATUS

- path: `/api/admin/products/:productId/published`
- method: `PATCH`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "Product published status updated successfully."
}
```

### API Error

`status 404`

- 找不到產品

```json
{
  "success": false,
  "message": "Product not found"
}
```

## DELETED PRODUCT

- path: `/api/admin/products/:productId/deleted`
- method: `DELETE`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "Product deleted successfully."
}
```

### API Error

`status 400`

- 發佈產品不可以刪除

```json
{
  "success": false,
  "message": "Product isPublished. Product cannot deleted."
}
```

`status 404`

- 找不到產品

```json
{
  "success": false,
  "message": "Product not found"
}
```
