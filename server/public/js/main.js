/**
 * Created by leesx on 2017/12/4.
 */
$(function () {
    // $.get('./js/main.js',function (data) {
    //     console.log(data)
    // })
    $('#userRegForm').submit(function (e) {

        e.preventDefault();

        var formData = new FormData($('#userRegForm')[0]);// 自动搜索表单信息(表单内没有name属性的input不会被搜索到)，IE<=9不支持FormData
        //formData.append('b', 3);// 还可以添加额外的表单数据
        if(formData.get('pwd')!==formData.get('pwd2')){
            alert('密码不相同,请重新输入');
            return false;
        }
        $.ajax({
            type: 'post',
            url: '/api/reg',
            data: formData,
            contentType: false,// 当有文件要上传时，此项是必须的，否则后台无法识别文件流的起始位置(详见：#1)
            processData: false,// 是否序列化data属性，默认true(注意：false时type必须是post，详见：#2)
            success: function(data) {
                if(data.rs === 'ok'){
                    alert('注册成功')
                    location.href = '/login'
                }else{
                    alert(data.msg)
                }
            }
        })

        //return;
    })

    $('#loginForm').submit(function (e) {

        e.preventDefault();

        var formData = new FormData($('#loginForm')[0]);// 自动搜索表单信息(表单内没有name属性的input不会被搜索到)，IE<=9不支持FormData
        //formData.append('b', 3);// 还可以添加额外的表单数据
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: formData,
            contentType: false,// 当有文件要上传时，此项是必须的，否则后台无法识别文件流的起始位置(详见：#1)
            processData: false,// 是否序列化data属性，默认true(注意：false时type必须是post，详见：#2)
            success: function(data) {
                if(data.rs === 'ok'){
                    location.href = '/';
                }else{
                    alert(data.msg)
                }
            }
        })

        //return;
    })

})