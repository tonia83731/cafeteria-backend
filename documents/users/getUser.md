# members 取得成員的資訊

- path: `/api/v1/organization/members`
- method: `GET`
- 允許進入身份: `serverAdmin, admin`
- 允許進入專案(公司): `rainforest, miniCDP, skm`

**Request:**

- **API 需要登入才能使用，Request 帶入 Token，Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

Body 中不需要帶入任何參數

**Response:**

## API 成功回傳格式

將回傳一個**陣列**，內有公司的成員資訊

```json
[
    {
        "userId": "62c2a95101f985cbd0ce96f2",
        "email": "brian@batmobile.com.tw",
        "username": "Brian",
        "phone": "0912345678",
        "role": "admin",
        "lastLoginAt": 1669713608639,
        "createdAt": 1669713610560,
        "updatedAt": 1669713608640
    },
    {
        "userId": "632c1d7db6503b54aa336b34",
        "email": "louis@batmobile.com.tw",
        "username": "louis",
        "phone": "0912345678",
        "role": "editor",
        "lastLoginAt": 1665647363765,
        "createdAt": 1663835517982,
        "updatedAt": 1665647363766
    },
    ......
]
```

### API 錯誤回傳格式

`status 400`

需要填入的值有錯誤 (未填 || type)

```json
{
  "error": "請確認所有參數皆已輸入"
}
```

`status 401`

沒有登入或 token 失效的情況

```json
{
  "error": "驗證失敗，請重新登入"
}
```

`status 403`

角色或專案權限不足的情況

```json
{
  "error": "權限不足"
}
```

`status 404`

```json
{
  "error": "找不到公司成員"
}
```
