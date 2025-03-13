# CAFETERIA (NODEJS + MYSQL)

## 製作背景/目的

隨著生活型態改變外送時代來臨。根據資策會(MIC)外送調查，台灣外送服務使用率達八成。為因應時代變化，咖啡廳打算自製網頁平台，以提供消費者更多元的選擇。

此專案為 [AC Cafe](https://tonia83731.github.io/ACcafe-vite/)的優化版本，其優化方面如下:

- **後端重構**：改為 **個人開發的後端程式** 搭配 **資料庫**，提升穩定性與擴展性
- **角色區分與平台拆分**：依使用者身份（**一般用戶、會員、員工**）提供 **前台與後台**，確保功能清晰、操作順暢
- **資料儲存優化**：將 **Wishlist 與 Cartlist** 從 **LocalStorage** 遷移至 **MySQL 資料庫**，提高存取效率與資料一致性
- **專注購買流程**：**刪除 News 頁面**，簡化內容，讓用戶更專注於點餐與購物體驗
- **多語言切換**：根據 **使用者偏好**，可 **自由切換** 中文與英文界面
- **優惠券系統**：新增 **優惠券頁面與功能**，用戶可於結帳時套用優惠，提升購買動機
- **訂單管理強化**：前後台 **掌控 Order Status**，不僅可查看訂單與詳細資訊，還能即時更新訂單狀態
- **客製化選項**：飲品類產品新增 **尺寸、甜度、冰塊選項**，提供更個人化的點餐體驗

### 後端資料庫規劃圖

![cafeteria table](../images/cafeteria_data_planning.drawio.png)

## 專案使用者

- **習慣使用線上點餐的長期顧客**，特別是對咖啡有高度熱情的愛好者
- **忙碌的上班族**、**自由工作者**，或是喜歡在家放鬆享受咖啡的人

## 開發資訊

- 後端開發，請參考[cafeteria-documents](https://github.com/tonia83731/cafeteria-documents/blob/main/information-list.md)
- 前端開發(client-staff)，請參考[cafeteria-frontend-staff](https://github.com/tonia83731/cafeteria-frontend-staff)
- 前端開發(client)，請參考[cafeteria-frontend](https://github.com/tonia83731/cafeteria-frontend)

- 第一期開發專案請參考[ACcafe-vite](https://github.com/tonia83731/ACcafe-vite)

## 專案角色

- **全端**的開發與優化: 根據需求提供相對應的 API (使用 MongoDB)，並交付前端進行視覺化顯示

## 專案挑戰與解決

- 問題: 後端圖片使用imgur@1.0.2，在本地端使用時並無問題；然而，部署後會出現 503client read error
  - 解決方案: 透過 debug 將 imgur 版本升級至@2.4.3，且與 multer 配合進行圖片暫存可暫時解決問題
  - 參考資料:[https://israynotarray.com/nodejs/20220517/432259079/](https://israynotarray.com/nodejs/20220517/432259079/)
- 問題: 在規劃資料庫時，客製化選項，如: 尺寸、甜度、冰塊、運送方式、付款方式是否該建立 table? 該如何儲存?
  - 解決方案: 目前解決方法是不建立 table，而在選擇資料時已數字進行儲存，表示方法請參考[documentation](https://github.com/tonia83731/cafeteria-documents/blob/main/information-list.md)

## 使用工具

- express @4.17.1
- mysql2 @2.1.0
- sequelize @5.21.13
- sequelize-cli @5.5.1
- passport @0.4.1
- passport-jwt @4.0.0
- passport-local @1.0.0
- bcrypt @2.4.3
- cors @2.8.5
- jsonwebtoken @8.5.1
- multer @1.4.3
- imgur @2.4.3
- validator @13.12.0

## 後續發展

- **信用卡與金融卡支付**：將串接第三方金流平台，提供 **簽帳金融卡與信用卡** 付款選項，並進行 **3D 驗證**，保障交易安全
- **發票綁定功能**：考慮是否新增 **發票綁定** 功能，讓使用者在結帳時可選擇綁定發票資訊，提升便利性與合規性
- **訂單通知**：在用戶確認訂單後，考慮是否發送 **訂單確認郵件通知**，提供用戶即時更新與訂單詳情
- **資料庫重構與客製化選項**：對 **資料庫進行重構**，支持更多的 **客製化選項**，包括 **尺寸、甜度、冰塊、運送方式、付款方式** 等，提供更靈活的產品配置與訂單處理
