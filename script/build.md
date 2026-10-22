## 打包 package 前置準備 

* **Node.js**: `>= 18.x`
* **套件管理工具**: `npm`
* 確保 `.env` 中的 API 端點與變數已設定正確。
* Frontend Server 使用 nginx

---

## 本地/CI 打包流程

### 安裝依賴套件
```
# 確認 node.js 版本
node -v 

# 安裝 nekosaur_simulator_client 所需套件
npm install

# 打包 project, (vite 專案: 會產出檔案位於根目錄下的 dist)
npm run build

# 移動到
# scp /dist -> /var/www/nekosaur_simulator_client/dist
# 確保所有資料夾都有正確的讀取與執行權限 (755)
sudo find /var/www/nekosaur_simulator_client -type d -exec chmod 755 {} \;
# 確保所有檔案都有正確的讀取權限 (644)
sudo find /var/www/nekosaur_simulator_client -type f -exec chmod 644 {} \;
```

### add nginx config file
```
vi /etc/nginx/sites-available/frontend-nekosaur-dev
```
```
# =========================
# sub domain: <your-subdomain>.<your-domain>.com
# =========================

# 1. HTTP 80 Port 自動重定向至 HTTPS 443
server {
    listen 80;
    listen [::]:80;

    server_name <your-subdomain>.<your-domain>.com;

    return 301 https://$host$request_uri;
}

# 2. HTTPS 443 託管 React 靜態檔案與 API 反向代理
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    http2 on;

    server_name <your-subdomain>.<your-domain>.com;

    # 載入站點小圖示設定
    include snippets/favicon.conf;

    # Cloudflare SSL 憑證路徑
    ssl_certificate /etc/nginx/ssl/<your-cert>.pem;
    ssl_certificate_key /etc/nginx/ssl/<your-cert-key>.pem;

    # 指向 React 打包好的靜態檔案目錄
    root /var/www/<your-client-project>/dist;
    index index.html;

    # 允許前端請求/上傳 Payload 的最大容量
    client_max_body_size 50M;

    # 前端 React SPA 路由處理
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 後端 API 反向代理 (相對路徑: /api/upload -> http://<backend-host>:<backend-port>/upload)
    location /api/ {
        proxy_pass http://<backend-host>:<backend-port>/;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 針對大檔案上傳延長 Timeout (依需求調整)
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # 後端靜態圖片反向代理 (完整路徑透傳: /static/images/xxx.jpg -> http://<backend-host>:<backend-port>/static/images/xxx.jpg)
    location /static/images/ {
        proxy_pass http://<backend-host>:<backend-port>;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # 圖片可以視情況加快取，減少反覆打後端
        expires 7d;
        add_header Cache-Control "public";
    }
    
    # 靜態資源快取優化 (Vite / CRA 打包產生的 js, css, 圖檔等)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 限制隱藏檔案存取
    location ~ /\. {
        deny all;
    }
}
```

### run nginx config
```
# add softlink
cd /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/frontend-nekosaur-dev

# test nginx
sudo nginx -t

# restart nginx
systemctl reload nginx
sudo systemctl status nginx
```
