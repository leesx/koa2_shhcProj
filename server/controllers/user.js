/**
 * Created by leesx on 2017/12/4.
 */
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const {db, ObjectID}  =require('./../common/db');
const {getFormatTime} =require('./../utils/utils');
const moment = require('moment')

const Users = db.collection('users');
exports.reg = async(ctx) => {
    var form = new formidable.IncomingForm();
    const payLoad = await new Promise((resolve, reject) => {
        form.parse(ctx.req, (err, fields, files) => {
            if (err) reject(err)
            resolve({fields, files})
        })
    })
    const formData = payLoad.fields;
    const isExist = await new Promise((resolve, reject) => {
        Users.findOne({userName: formData.userName}, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
    //console.log(isExist)
    if (!isExist) {
        const result = await new Promise((resolve, reject) => {
            Users.insert({
                userName: formData.userName,
                pwd     : formData.pwd
            }, (err, result) => {
                if (err) reject(err);
                resolve(result)
            });
        })

        if (result.result.ok) {
            ctx.body = await {rs: 'ok', msg: '成功'}
        }
    } else {
        ctx.body = await {rs: 'no', msg: '该用户名已经被占用'}

    }

}

exports.login = async(ctx) => {
    // console.log(ctx.request.body)
    // var form = new formidable.IncomingForm();
    // const payLoad = await new Promise((resolve, reject) => {
    //     form.parse(ctx.req, (err, fields, files) => {
    //         if (err) reject(err)
    //         resolve({fields, files})
    //     })
    // })
    const formData = ctx.request.body;
    const isExist = await new Promise((resolve, reject) => {
        Users.findOne({userName: formData.userName, pwd: formData.pwd}, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
    console.log(isExist)
    if (!isExist) {
        ctx.body = await {rs: 'no', msg: '该用户名不存在'}

    } else {
        ctx.session.userName = formData.userName;
        ctx.redirect('/')
    }

}
exports.logout = async(ctx) => {
    delete ctx.session.userName;
    ctx.redirect('/login')

}
exports.getUserInfo = async(ctx) => {
    const {userName} = ctx.session;
    if (userName) {
        ctx.body = {rs: 'ok', data: {userName}}
    } else {
        ctx.body = {rs: 'no', msg: '登录失效'}
    }

}
