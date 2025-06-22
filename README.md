# 📅 2025.06.10 如何運行此專案

此專案使用 **python Flask** 開發，檔案位置位在 [project_web-main資料夾](https://github.com/liangweihan/project_web/tree/main/project_web-main)  
運行方式：到project_web-main資料夾底下運行資料夾底下的 app.py，即可運行。  
[0610 一驗影片](https://www.youtube.com/watch?v=lKaCqMD11TI)

## 6.19 以下為製作和部署建議，爲參考，不代表100%正確：
### 程式架構：（只列出有用的）


```
project_web-main/
├── app.py               【核心驅動】** 啟動伺服器。絕對不要動它，除非你知道你在做什麼。
├── templates/
│   └── index.html       【網頁骨架】** 網站的所有 HTML 結構都在這裡。
├── static/
│   ├── style.css        【視覺樣式】** 網站的所有 CSS 樣式都在這裡。
│   ├── main.js          【互動功能】** 網站的所有動畫和互動都在這裡。
│   └── (所有圖片)        【圖片資源】** 所有圖片。
├── Procfile             【Heroku 設定檔】** 告訴 Heroku 如何啟動 app.py。
└── requirements.txt     【Python 依賴】** 告訴 Heroku 需要安裝 Flask 和 Gunicorn。
```


### 本地部署方式

1.  打開你的終端機。 
2.  導航到 `project_web-main` 資料夾：（記得要進入project_web-main！！！！）
    ```bash
    project_web/project_web-main
    ```
3.  (如果第一次運行) 創建並啟用 Python 虛擬環境：
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```
4.  啟動伺服器：
    ```bash
    python3 app.py
    ```
5.  在瀏覽器中打開 `http://127.0.0.1:5000` 來查看你的修改。

# 2025.6.22
已經開啟新的分支了，新的網頁程式碼在此處：
