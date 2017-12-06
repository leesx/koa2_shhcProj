const fs=require('fs');
const path=require('path');


/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const api = require('./api');
const home = require('./home');
const user = require('./user');

router.use('/', home.routes(), home.allowedMethods())
router.get('/reg', async (ctx)=>{
    await ctx.render('reg',{})
})
router.get('/login',async (ctx)=>{
    await ctx.render('login',{})
})
router.use('/user', user.routes(),user.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())


module.exports = router

