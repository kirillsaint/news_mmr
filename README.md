# News MMR on adonis.js

*Язык програмирования:* **Node.JS**, *Фреймворк:* **Adonis**, *База данных:* **MySQL**

- [x] Просмотр всех постов
- [x] Просмотр определенного поста
- [x] Админка

## Установка
Установка на Ubuntu 20
```bash
sudo apt-get update

sudo apt install apache2

sudo apt install ufw

sudo ufw enable

sudo ufw allow 'Apache Full'

sudo ufw allow 'OpenSSH'

sudo apt install mysql-server

sudo mysql_secure_installation

CREATE DATABASE adonis_news;

CREATE USER 'login'@'localhost' IDENTIFIED BY 'your_pass';

GRANT ALL PRIVILEGES ON adonis_news.* TO 'login'@'localhost';
```

После этих действий в папке проекта на сервере, создайте файл .env и вставьте туда это:

```
HOST=127.0.0.1
PORT=3333
NODE_ENV=production
CACHE_VIEWS=true
APP_KEY=WdpmKSRNxJhejBxxwvgtdGbPM0JBlRxm
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=adonis_news
DB_USER=**YOUR_DB_USER**
DB_PASSWORD=**YOUR_DB_PASSWORD**
```

Установите на сервер Node.JS и npm и введите эти комманды:

```bash
npm i -g @adonisjs/cli

npm i mysql

adonis migration:run
```

После этих действий, создайте файл adonis_site.service по пути: /lib/systemd/system с содержанием:
```
[Unit]
Description=adonis_app
After=network.target

[Service]
ExecStart=adonis serve --dev
ExecReload=adonis serve --dev
WorkingDirectory=***путь где находится папка с проектом***
KillMode=process
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

После создание файла напишите:

```bash
systemctl start adonis_site

sudo a2enmod proxy

sudo a2enmod proxy_http

sudo a2enmod proxy_balancer

sudo a2enmod lbmethod_byrequests

sudo nano /etc/apache2/sites-available/000-default.conf
```

Вставьте в этот файл следующее значение:

```
<VirtualHost *:80>
 ProxyPreserveHost On

 ProxyPass / http://127.0.0.1:3333/
 ProxyPassReverse / http://127.0.0.1:3333/
</VirtualHost>
```

И введите комманду
```bash
sudo systemctl restart apache2
```
