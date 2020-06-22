// pages/databaseGuide/databaseGuide.js
/**
 * description  操作云端数据库通用方法
 * author       sh4wmoo
 * create_date  2020-06-20
 */

// 定义云端db对象
const db = wx.cloud.database()
const _ = db.command

//测试promise执行顺序
function test_promise() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      var num = Math.ceil(Math.random() * 20); //生成1-10的随机数
      console.log('随机数生成的值：', num)
      if (num <= 10) {
        resolve(num);
      }
      else {
        reject('数字大于10了，即将执行失败回调');
      }
    }, 2000);
  })
}

/**
 * description  云端数据库inser方法
 * param        [table_name：表名] [param：参数]
 * author       sh4wmoo
 * create_date  2020-06-20
 */
function insert(table_name, param) { 
  return new Promise((resolve, reject) => {
    console.log('*******************\n[操作]：insert\n[表名]：' + table_name +'\n[参数]：' + JSON.stringify(param))
    const db = wx.cloud.database()
    db.collection(table_name).add({ data: param })
    .then(res => {
      console.log('[insert] [' + table_name + '] 表，%c成功！%c返回信息：', 'color: green', 'color: white', res)
      resolve(res);
    })
    .catch(err => { 
      console.log('[insert] [' + table_name + '] 表，%c失败！%c\n异常信息：' , 'color: red', 'color: white', err)
      reject('[insert] [' + table_name + '] 表，失败！\n异常信息：'+err);
    })
  })
}

/**
 * description  云端数据库delete_by_id方法
 * param        [table_name：表名] [id：唯一id]
 * author       sh4wmoo
 * create_date  2020-06-22
 */
function delete_by_id(table_name, id) {
  return new Promise((resolve, reject) => {
    console.log('*******************\n[操作]：delete_by_id\n[表名]：' + table_name + '\n[参数]：' + JSON.stringify(id))
    db.collection(table_name).doc(id).remove()
      .then(res => {
        console.log('[delete_by_id] [' + table_name + '] 表，%c成功！%c返回信息：', 'color: green', 'color: white', res)
        resolve(res);
      })
      .catch(err => {
        console.log('[delete_by_id] [' + table_name + '] 表，%c失败！%c\n异常信息：', 'color: red', 'color: white', err)
        reject('[delete_by_id] [' + table_name + '] 表，失败！\n异常信息：' + err);
      })
  })
}

/**
 * description  云端数据库条件删除方法
 * param        [table_name：表名]
 * author       sh4wmoo
 * create_date  2020-06-22
 */
function delete_by_cond(table_name, param) {
  return new Promise((resolve, reject) => {
    console.log('*******************\n[操作]：delete_by_cond\n[表名]：' + table_name + '\n[参数]：' + JSON.stringify(param))
    db.collection(table_name).where(param).remove()
      .then(res => {
        console.log('[delete_by_cond] [' + table_name + '] 表，%c成功！%c返回信息：', 'color: green', 'color: white', res)
        resolve(res);
      })
      .catch(err => {
        console.log('[delete_by_cond] [' + table_name + '] 表，%c失败！%c\n异常信息：', 'color: red', 'color: white', err)
        reject('[delete_by_cond] [' + table_name + '] 表，失败！\n异常信息：' + err);
      })
  })
}

/**
 * description  云端数据库update_by_id方法
 * param        [table_name：表名] [id:唯一id] [param：参数]
 * author       sh4wmoo
 * create_date  2020-06-22
 * remark       *如果指定id的记录不存在，则会自动创建该记录，该记录将拥有指定的id*
 */
function update_by_id(table_name,id,param) {
  return new Promise((resolve, reject) => {
    console.log('*******************\n[操作]update_by_id\n[表名]：' + table_name + '\n[id]：' + id+ '\n[参数]：' + JSON.stringify(param))
    db.collection(table_name).doc(id).update({data:param})
      .then(res => {
        console.log('[update_by_id] [' + table_name + '] 表，%c成功！%c返回信息：', 'color: green', 'color: white' , res)
        resolve(res);
      })
      .catch(err => {
        console.log('[update_by_id] [' + table_name + '] 表，%c失败！%c\n异常信息：', 'color: red', 'color: white', err)
        reject('[update_by_id] [' + table_name + '] 表，失败！\n异常信息：' + err);
      })
  })
}


/**
 * db.command
 * 1.inc	原子自增字段值
 * 用 inc 指令而不是取出值、加 10 再写进去的好处在于这个写操作是个原子操作，不会受到并发写的影响，
 * 比如同时有两名用户 A 和 B 取了同一个字段值，然后分别加上 10 和 20 再写进数据库，那么这个字段最终结果会是加了 20 而不是 30。
 * 如果使用 inc 指令则不会有这个问题。
 * 
 */

//工具类的方法必须暴露出来，给外部调用
module.exports = {
  test_promise: test_promise,
  insert: insert,
  delete_by_id: delete_by_id,
  delete_by_cond: delete_by_cond,
  update_by_id: update_by_id
};