# Tech Odyssey: 未來之旅 - 心理測驗網站

## 📋 項目簡介

Tech Odyssey 是一個互動式心理測驗平台，通過三個關鍵問題分析用戶的興趣傾向，並推薦最適合的專題項目。網站採用星空科技主題設計，提供沉浸式的用戶體驗。

### 🎯 核心功能

- **心理測驗系統**：3道題目，8種結果組合
- **智能推薦**：根據測驗結果推薦對應專題
- **詳細展示**：每個專題包含簡介、動機、介紹三個部分
- **響應式設計**：支持手機和電腦端使用
- **科技風格**：星空背景 + 科技字體 + 現代化 UI

## 🚀 快速開始

### 環境需求

- Python 3.7+
- Flask

### 安裝步驟

1. **克隆項目**
   ```bash
   git clone https://github.com/ethanlin1126/Capstone_Project_Website.git
   cd Capstone_Project_Website
   ```

2. **安裝依賴**
   ```bash
   pip install flask
   ```

3. **運行應用**
   ```bash
   python app.py
   ```

4. **訪問網站**
   打開瀏覽器訪問：`http://localhost:5000`

## 📁 項目結構

```
tech-odyssey/
├── app.py
├── templates/
│   └── index.html
├── static/
│   └── images/
│       └── background.jpg
└── README.md
```

## 🧠 測驗邏輯

### 測驗問題

1. **能力選擇**：導航系統 vs 船員管理
2. **探索方式**：資料派 vs 人本派  
3. **任務傾向**：打造工具 vs 引導夥伴

### 結果分類

| 組合 | 分類路徑 | 推薦專題 |
|------|----------|----------|
| A | 導航系統 → 資料派 → 打造工具 | GaAsBi預測AI、TradeNova投資平台 |
| B | 導航系統 → 資料派 → 引導夥伴 | 遠端機械手臂系統、AI面試語言解碼 |
| C | 導航系統 → 人本派 → 打造工具 | Snap Plate食譜識別、智慧路牌系統 |
| D | 導航系統 → 人本派 → 引導夥伴 | PiCare健康管理、AI學習同伴AIBuddy |
| E | 船員管理 → 資料派 → 打造工具 | 未來造物島、紙尖上的藝數 |
| F | 船員管理 → 資料派 → 引導夥伴 | EAPic員工協助平台、WingChat社交教練 |
| G | 船員管理 → 人本派 → 打造工具 | 樂活無齡互動教學、防災桌遊《勇者別慌》 |
| H | 船員管理 → 人本派 → 引導夥伴 | Inner Speech焦慮探索遊戲、VR社交情緒學習 |
