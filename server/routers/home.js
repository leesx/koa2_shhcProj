/**
 * Created by leesx on 2017/11/30.
 */
/**
 * 主页子路由
 */

const router = require('koa-router')()
const home = require('../controllers/home')

module.exports = router
    .get('/', home)
