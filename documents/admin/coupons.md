## GET COUPONS 取得所有產品

- path: `/api/admin/coupons`
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
      "id": 0,
      "title": "春季特惠",
      "title_en": "Spring Sale",
      "description": "春季特惠，全館商品折扣",
      "description_en": "Spring discount on all products",
      "code": "SPRING10",
      "discount_type": 0,
      "discount_value": 10,
      "end_date": "1746374399",
      "is_published": true,
      "createdAt": "2025-02-28T11:03:28.000Z",
      "updatedAt": "2025-02-28T11:03:28.000Z"
    },
    ...
  ]
}
```

## GET COUPON

- path: `/api/admin/coupons/:couponId`
- method: `GET`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數

**Response:**

## ADD COUPON

- path: `/api/admin/coupons/add`
- method: `POST`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 需帶入以下參數:
  (必填) title: String
  (必填) title_en: String
  description: String
  description_en: String
  (必填) code: String
  (必填) end_date: Number
  (必填) discount_type: Number
  (必填) discount_value: Number

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "data": {
    "id": 0,
    "title": "春季特惠",
    "title_en": "Spring Sale",
    "description": "春季特惠，全館商品折扣",
    "description_en": "Spring discount on all products",
    "code": "SPRING10",
    "discount_type": 0,
    "discount_value": 10,
    "end_date": "1746374399",
    "is_published": true,
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
  "message": "Code should between 6-18 letters"
}
```

- 日期限制

```json
{
  "success": false,
  "message": "End date cannot be earlier than the current date."
}
```

## UPDATED COUPON

- path: `/api/admin/coupons/:couponId/updated`
- method: `PUT`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 需帶入以下參數:
  (必填) title: String
  (必填) title_en: String
  description: String
  description_en: String
  (必填) code: String
  (必填) end_date: Number
  (必填) discount_type: Number
  (必填) discount_value: Number

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "data": {
    "id": 0,
    "title": "春季特惠",
    "title_en": "Spring Sale",
    "description": "春季特惠，全館商品折扣",
    "description_en": "Spring discount on all products",
    "code": "SPRING10",
    "discount_type": 0,
    "discount_value": 10,
    "end_date": "1746374399",
    "is_published": true,
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
  "message": "Code should between 6-18 letters"
}
```

- 日期限制

```json
{
  "success": false,
  "message": "End date cannot be earlier than the current date."
}
```

`status 404`

- 找不到優惠券

```json
{
  "success": false,
  "message": "Coupon not found"
}
```

## UPDATED COUPON PUBLISHED STATUS

- path: `/api/admin/coupons/:couponId/published`
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
  "message": "Coupon is published. Add coupons to discounts."
}
```

`status 202`

- 優惠券已發佈

```json
{
  "success": true,
  "message": "Coupon alreay published."
}
```

### API Error

`status 404`

- 找不到優惠券

```json
{
  "success": false,
  "message": "Coupon not found"
}
```

## DELETED COUPON

- path: `/api/admin/coupons/:couponId/deleted`
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
  "message": "Coupon and relative discounts are deleted"
}
```

### API Error

`status 404`

- 找不到優惠券

```json
{
  "success": false,
  "message": "Coupon not found"
}
```
