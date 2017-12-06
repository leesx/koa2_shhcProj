/**
 * Created by leesx on 2017/12/5.
 */
/**
 * Created by leesx on 2017/11/30.
 */
/**
 * 主页子路由
 */

const router = require('koa-router')()
const user = require('../controllers/user')
const busboy = require('koa-busboy')
module.exports = router
    .post('/login',busboy(), user.login)
		.get('/logout',user.logout)
