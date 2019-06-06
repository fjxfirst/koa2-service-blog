const router = require('koa-router')()
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resMode')
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const {username, password} = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    ctx.body = new SuccessModel('登录成功')
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

module.exports = router
