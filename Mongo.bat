=============================

rem Start Mongodb

@echo off
echo -------------- Start Mongodb --------------
::mongoDB�İ�װ����Ŀ¼

e:

::������ʾ������ɫ

color 0a

::�޸ĵ�ǰĿ¼��bin��

cd D:/mongodb/bin

::������������ļ��˴��õ���data����ģ��Ǿ�����������޸�

mongod --dbpath=D:/mongodb/db --auth

=============================