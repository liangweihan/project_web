# NTNU 115級畢業專展網站

## 最近更新 (2025-11-05)

### 手機版溢出問題修正
- **修正文字換行**：為 group1_2、group4_2、group5_1 新增 CSS word-break 屬性，解決長 URL 與標題導致手機版頁面溢出問題
- **修正 HTML 結構**：補齊三個頁面缺失的 `</section>` 閉合標籤，確保頁面結構完整
- **移除多餘區塊**：刪除 group1_2、group4_2 中額外的 `<div class="meta">` 描述區塊

---

## 更新 (2025-11-03)

### AWS Elastic Beanstalk 部署修正
- **添加 AWS EB 支持**：新增 `application` 變量以支持 Gunicorn 啟動
- **路由雙斜線支持**：所有路由（/tahrd、/gac 等）現在支持有無尾部斜線訪問
- **圖片大小寫修正**：修正 10 個 template 檔案中的圖片路徑大小寫（.png → .PNG），解決 Linux 系統找不到圖片的問題

### 部署配置檔案
- `application.py` - Flask 應用主程式（含雙斜線路由支持）
- `requirements.txt` - Python 依賴套件
- `.elasticbeanstalk/` - EB 環境配置
- `.ebextensions/` - EB 擴展設定
- `.ebignore` - EB 部署忽略檔案

### 修正的檔案
- 例如 `templates/group5_1.html` - group_9.PNG
