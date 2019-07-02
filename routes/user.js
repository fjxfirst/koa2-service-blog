const router = require('koa-router')()
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resMode')
router.prefix('/api/user')

router.get('/loginStatus',async function (ctx,next) {
  console.log('查询登录状态')
  if(ctx.session.username){
    const username =ctx.session.username||''
    const realname =ctx.session.realname||''
    ctx.body = new SuccessModel({username,realname},'您已登录')
  }else{
    ctx.body = new ErrorModel({username:'',realname:''},'您尚未登录')
  }
})
router.post('/login', async function (ctx, next) {
  const {username, password} = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    ctx.body = new SuccessModel({username:data.username,realname:data.realname},'登录成功')
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

router.post('/logout',async function (ctx,next) {
  ctx.session=null
  ctx.body=new SuccessModel({username:'',realname:''},'退出成功，您已退出')
})

module.exports = router
