/**
 * restful api 子路由
 */

const router = require('koa-router')();
const convert = require('koa-convert');
const heroInfoController = require('./../controllers/hero')
const userController = require('./../controllers/user')

console.log(heroInfoController)
const routers = router
    .post('/upload/photo', heroInfoController.uploadPhoto)
    .post('/insertHeroInfo', heroInfoController.insertHeroInfo)
    .post('/getHeroList',heroInfoController.getHeroList)
    .delete('/:id',heroInfoController.deleteHeroList)
    .post('/getMusicList', heroInfoController.getMusicList)
    .post('/uploadMusic', heroInfoController.uploadMusic)
    .post('/removeMusic', heroInfoController.removeMusic)
    .post('/reg',userController.reg)
    .get('/getUserInfo',userController.getUserInfo)
    .post('/upload',heroInfoController.upload)


module.exports = routers
