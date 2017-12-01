/**
 * restful api 子路由
 */

const router = require('koa-router')();
const convert = require('koa-convert');
const heroInfoController = require('./../controllers/hero')

const routers = router
    .post('/upload/photo', heroInfoController.uploadPhoto)
    .post('/insertHeroInfo', heroInfoController.insertHeroInfo)
    .post('/getHeroList',heroInfoController.getHeroList)
    .delete('/:id',heroInfoController.deleteHeroList)
    .post('/getMusicList', heroInfoController.getMusicList)
    .post('/uploadMusic', heroInfoController.uploadMusic)
    .post('/removeMusic', heroInfoController.removeMusic)


//   app.post('/api/upload/photo',Hero.uploadPhoto)
//   // app.get('/', AppIndex.index);
//   app.post('/api/insertHeroInfo', Hero.insertHeroInfo);
//
//   app.post('/api/getHeroList', Hero.getHeroList);
// 	app.delete('/api/:id', Hero.deleteHeroList);
// 	app.post('/api/updateHeroList', Hero.updateHeroList);
// 	app.post('/api/getMusicList', Hero.getMusicList);
// 	app.post('/api/uploadMusic', Hero.uploadMusic);
// 	app.post('/api/removeMusic', Hero.removeMusic);
module.exports = routers