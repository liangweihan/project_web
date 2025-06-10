# 📅 2025.06.10 如何運行此專案

此專案使用 **Next.js** 和 **React** 框架構而成，需依序執行以下命令來運行：

---

## ✅ 安裝專案所需套件（忽略 peer dependencies 衝突）

```bash
npm install --legacy-peer-deps
```
使用 --legacy-peer-deps 可避免安裝時因版本衝突導致失敗，尤其是在 react-day-picker 和 date-fns 發生不相容時。  
## 建立正式版本（Production Build）
```bash
npm run build
```
將程式編譯為可部署的版本，產生 .next/ 目錄。

## 啟動正式伺服器
```bash
npm start
```

## 開發時建議使用：開發伺服器（Dev Server）
```bash
npm run dev
```
