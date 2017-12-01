/**
 * Created by leesx on 2017/11/30.
 */
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const {db, ObjectID}  =require('./../common/db');
const {getFormatTime} =require('./../utils/utils');
const moment = require('moment')

const Heroes = db.collection('heroes');
exports.getHeroList = async(ctx) => {
    const {currentPage = 0, pageSize = 5, id} = ctx.request.body;
    console.log(ctx.request.body)
    //编辑
    if (id) {

        const result = await new Promise((resolve, reject) => {
            Heroes
                .findOne({_id: ObjectID(id)}, (err, result) => {
                    if (err) throw err;
                    resolve(result)
                })
        });

        ctx.body = {rs: 'ok', msg: '成功', data: result}

    } else {
        //获取列表

        const total = await new Promise((resolve, reject) => {
            Heroes.count(async(err, total) => {
                if (err) reject(err);
                resolve(total)
            });
        })

        const result = await new Promise((resolve, reject) => {
            Heroes.find({})
                .skip((currentPage - 1)*pageSize)
                .limit(pageSize*1)
                .toArray((err, result) => {
                    if (err) throw err;
                    resolve(result)
                });
        })

        ctx.body = {rs: 'ok', msg: '成功', total, currentPage, data: result}
    }

}

exports.deleteHeroList = async(ctx) => {
    const id = ctx.params.id;
    const result = await new Promise((resolve, reject) => {
        Heroes.remove({_id: ObjectID(id)}, (err, result) => {
            if (err) throw err;
            resolve(result)
        });
    })

    if (result.result.ok) {
        ctx.body = {rs: 'ok', msg: '成功'}
    } else {
        ctx.body = {rs: 'no', msg: '失败'}
    }

}

exports.updateHeroList = async(ctx) => {
    const {id, name, alias, title, content, final, rank, photolist, scope, skill, star} = ctx.request.body
    const result = await new Promise((resolve, reject) => {
        Heroes.update({_id: ObjectID(id)}, {
            $set: {
                name,
                alias,
                title,
                content,
                final,
                rank,
                photolist,
                scope,
                skill,
                star,
            }
        }, (err, result) => {
            if (err) throw err;
            resolve(result)
        });
    })

    if (result.result.ok) {
        ctx.body = {rs: 'ok', msg: '成功'};
    } else {
        ctx.body = {rs: 'no', msg: '失败'}
    }
}

exports.insertHeroInfo = async(ctx) => {
    // POST ctx.request.body中取值
    //GET 请求在ctx.params中取值
    const {name, alias, title, content, final, rank, photolist, scope, skill, star} = ctx.request.body;
    Heroes.insert({
        name,
        alias,
        title,
        content,
        final,
        rank,
        photolist,
        scope,
        skill,
        star,
    }, (err, result) => {
        if (err) throw err;
        //console.log('-----',result);
        //注意 最后返回的结果 是res.send()方法
        ctx.body = {rs: 'ok', msg: '添加信息成功'}
    });
}

exports.uploadPhoto = async (ctx) => {
    var form = new formidable.IncomingForm();
    const files = await new Promise((resolve,reject)=>{
        form.parse(ctx.req, (err, fields, files) => {
            if(err) reject(err)
            resolve(files)
        })
    })

    try {
        // 从临时目录读取文件的内容
        const fileContent = fs.readFileSync(files.photo.path)
        //把读取的内容写到当前文件夹下,文件名叫做 files.myfile.name
        const filename = 'shhc_' + files.photo.name;
        const writerPath = path.join(__dirname, '../public/upload', filename);
        fs.writeFileSync(writerPath, fileContent)
        ctx.body = '/upload/' + filename;
    } catch (e) {
        fs.unlink(req.files.photo.path);
    }
}

exports.getMusicList = async(ctx) => {
    const result = await new Promise((resolve, reject) => {
        db.collection('music').find({}).toArray((err, result) => {
            if (err) throw err;
            resolve(result)
        })
    });
    ctx.body = {
        rs  : true,
        msg : '成功',
        data: result
    }
}
exports.uploadMusic = async(ctx) => {
    const form = new formidable.IncomingForm();
    const files = await new Promise((resolve, reject) => {
        form.parse(ctx.req, (err, fields, files) => {
            if (err) reject(err)
            resolve(files)
        })
    });

    try {
        console.log('音乐', files.file.path)
        // 从临时目录读取文件的内容
        //const fileContent = fs.readFileSync(files.file.path)

        //把读取的内容写到当前文件夹下,文件名叫做 files.myfile.name
        let filename = files.file.name
        // 创建一个可读流
        const readerStream = fs.createReadStream(files.file.path);

        // 创建一个可写流
        const writerStreamPath = path.join(__dirname, '../public/upload/music', filename);
        const writerStream = fs.createWriteStream(writerStreamPath);

        // 管道读写操作
        // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
        fs.exists(writerStreamPath, (exists) => {
            if (!exists) {
                readerStream.pipe(writerStream);
            } else {
                filename = Date.now() + filename;
                const newPath = path.join(__dirname, '../public/upload/music', Date.now() + filename);
                const newWriterStream = fs.createWriteStream(newPath);

                readerStream.pipe(newWriterStream);
            }
        })

        await new Promise((resolve,reject)=>{
            readerStream.on('end',() => {
                resolve(1)
            })
            readerStream.on('error', (err) => {
                console.log(err.stack);
            });
        });

        const {lastModifiedDate, name, size, type} = files.file;
        const result = await new Promise((resolve, reject) => {
            db.collection('music')
                .insert({
                    lastModifiedDate,
                    name,
                    url: '/upload/music/' + filename,
                    size,
                    type,
                }, (err, result) => {
                    if (err) throw err;
                    resolve(result)
                });
        })

        ctx.body =  {
            rs : true,
            msg: '成功',
        };

    } catch (e) {
        fs.unlink(files.file.path);
    }

}

exports.removeMusic = async (ctx) => {
    const {id, url} = ctx.request.body

    const result = await new Promise((resolve,reject)=>{
        db.collection('music')
            .remove({_id: ObjectID(id)}, (err, result) => {
                if (err){
                    const removePath = path.join(__dirname, '../public', url);
                    try {
                        fs.unlink(removePath);
                    } catch (err) {
                        console.error(err)
                    }
                    reject(err)
                };
                resolve(result)
            });
    });

    if(result.result.ok){
        ctx.body = {rs:true,msg:'成功'}
    }else{
        ctx.body = {rs:false,msg:'失败'}
    }

}
