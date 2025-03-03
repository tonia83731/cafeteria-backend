## GET ORDERS

- path: `/api/admin/orders`
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
            "id": 17,
            "status": 0,
            "userId": 10,
            "User": {
                "name": "test",
                "phone": "0912345678",
                "email": "test@example.com"
            },
            "recipientName": "test",
            "recipientPhone": "0912345678",
            "recipientAddress": "台北市大安區忠孝東路四段123號7樓",
            "payment": 0,
            "shipping": 0,
            "discountId": 32,
            "discountPrice": 72,
            "Discount": {
                "Coupon": {
                    "code": "SPRING10",
                    "discountType": 0,
                    "discountValue": 10,
                    "title": "春季特惠"
                },
                "id": 32,
                "couponId": 13,
                "userId": 10,
                "isApplied": true,
                "createdAt": "2025-02-28T11:03:28.000Z",
                "updatedAt": "2025-02-28T11:03:28.000Z"
            },
            "tax": 72,
            "total": 720,
            "OrderItems": [
                {
                    "orderId": 17,
                    "productId": 45,
                    "Product": {
                        "title": "美式咖啡",
                        "title_en": "Americano",
                        "price": 50
                    },
                    "quantity": 3,
                    "size": 1,
                    "ice": 0,
                    "sugar": 0,
                    "price": 180,
                    "createdAt": "2025-02-28T11:03:28.000Z",
                    "updatedAt": "2025-02-28T11:03:28.000Z"
                },
                {
                    "orderId": 17,
                    "productId": 73,
                    "Product": {
                        "title": "紅絲絨蛋糕",
                        "title_en": "Red Velvet Cake",
                        "price": 120
                    },
                    "quantity": 1,
                    "size": null,
                    "ice": null,
                    "sugar": null,
                    "price": 120,
                    "createdAt": "2025-02-28T11:03:28.000Z",
                    "updatedAt": "2025-02-28T11:03:28.000Z"
                },
                ...
            ],
            "createdAt": "2025-02-28T11:03:28.000Z",
            "updatedAt": "2025-02-28T11:03:28.000Z"
        }
        ...
    ]
}
```

## UPDATED ORDER STATUS

- path: `/api/admin/orders/:orderId/updated-status`
- method: `PATCH`
- role: `admin`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 需帶入以下參數:
  (必填) status: Number

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "Order status updated."
}
```

### API Error

`status 400`

- 訂單狀態無法更新

```json
{
  "success": false,
  "message": "Cannot update status"
}
```

`status 404`

- 找不到訂單

```json
{
  "success": false,
  "message": "Order not found"
}
```
