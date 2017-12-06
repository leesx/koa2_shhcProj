/**
 * Created by leesx on 2017/11/30.
 */

const fs = require('fs');
const Store = require('./../config/Store')
function renderHtml() {
    return `
		<!doctype html>
		<html>
			<head>
				<title>水浒画册</title>
				<meta charset="utf-8" />
				<meta name="keywords" content="react,react-router,immutablejs,loadsh.js,es2015,webpack3.0" />
				<meta name="description"  content="this is a react project,only study" />
				<style>

				</style>
				<script defer src="//at.alicdn.com/t/font_13r0wp30od97wrk9.js"></script>
			</head>
			<body>

				<div id="root">

				</div>

				<script  async src="https://cdn.bootcss.com/babel-polyfill/6.22.0/polyfill.min.js"></script>
				<script src="http://localhost:3031/dist/scripts/common/vendor.js"></script>
				<script  src="http://localhost:3031/dist/scripts/index.js"></script></body>

			</body>
		</html>

		`
}

module.exports = async(ctx) => {
    const title = 'home';

    console.log('--->',ctx.session.userName)
    if(!ctx.session.userName){
        ctx.redirect('/login')
    }
    try {
        const html = process.env.NODE_ENV === 'development'
            ? renderHtml()
            : fs.readFileSync(path.join(__dirname, '../../dist/index.html'));

        //res.render('index', {html})
        await ctx.render('index', {
            html,
            title
        })

    } catch (err) {
        console.error(err)
    }

}