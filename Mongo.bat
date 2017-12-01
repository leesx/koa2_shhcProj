=============================

rem Start Mongodb

@echo off
echo -------------- Start Mongodb --------------
::mongoDB的安装顶层目录

e:

::设置显示文字颜色

color 0a

::修改当前目录到bin下

cd D:/mongodb/bin

::启动你的数据文件此处用的是data下面的，是具体情况可做修改

mongod --dbpath=D:/mongodb/db --auth

=============================