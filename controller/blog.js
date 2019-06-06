const xss = require('xss')
const {exec} = require('../db/mysql')
const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 ` //如果没有where 1=1,sql就会错误变成select * from blogs and author=feng
  if (author) {
    sql += `and author='${author}'`
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`
  }
  sql += `order by createtime desc`
  return await exec(sql)
}
const getDetail = async (id) => {
  let sql = `select * from blogs where id='${id}'`
  const rows =await exec(sql)
  return rows[0]
  /*return exec(sql).then(rows => {
    return rows[0]
  })*/
}
const newBlog = async (postData = {}) => {
  const title = xss(postData.title) // 使用xss方法预防xss攻击
  const {content, author} = postData
  const createTime = Date.now()
  const sql = `insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createTime}','${author}')`
  const insertData=await exec(sql)
  return {id: insertData.insertId}
  /*return exec(sql).then(insertData => {
    return {id: insertData.insertId}
  })*/
}
const updateBlog = async (id, postData = {}) => {
  const {title, content} = postData
  const sql = `update blogs set title='${title}',content='${content}' where id='${id}'`
  const updateData=await exec(sql)
  return updateData.affectedRows > 0 ? true : false
}
const deletBlog = async (id, author) => {
  console.log(id, author)
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  const deleteData=await exec(sql)
  return deleteData.affectedRows > 0 ? true : false
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deletBlog
}