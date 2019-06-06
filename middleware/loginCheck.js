const {ErrorModel} = require('../model/resMode')

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next()
    return
  }
  ctx.body = new ErrorModel('未登录')
}