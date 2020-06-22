// miniprogram/pages/test/test.js
const db = require('../../utils/db.js'); 
const _ = wx.cloud.database().command
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 需注意，连续then可以使代码按照顺序执行，无论任何一个方法err了，都会走到最终的catch中。
   * 例如第1个方法异常了，直接会跳到catch，而不会走第2个then
   * 连续then可以理解为所有步骤都无错误时，方法整体的逻辑顺序。
   * 如需将异常交互给用户，可以在catch中，统一处理。
   * 但如何知道到底是哪个then造成的异常，目前还没有太好的办法。
   * 目前想到的方法是在开始前，定义index，进入一个then则index++，通过index的值来判断。
   */
  test_add: function () { 
    var index = 0
    // var table_name = 'order'//云端无此表，此时报异常，无法执行第一个then中的代码
    var table_name = 'counters'//云端有此表，第一个then正常执行，但调用的方法异常的话，也不会向下执行
    var param = { count:10,price:168.81,remarks:"而我的咖啡，糖不用太多"}
    // 测试insert
    db.insert(table_name, param)
    .then(res => { 
      index++
      console.log('第1个回调函数', res)
      // 测试promise
      // return db.test_promise()

      // 根据id删除
      // var id ='a3e75f055eeb72a0000d8c817d66e2ed'
      // return db.delete_by_id(table_name,id)

      // 根据条件删除
      // param = { count: 1}
      // return db.delete_by_cond(table_name, param)

      // 根据id进行基础更新
      // param = { count: 999}
      // var id ='e6a3b07d5eeb732000103caa2cd177a8'
      // return db.update_by_id(table_name,id,param)

      // 根据id进行指令更新
      //_需进行实例化：const _ = wx.cloud.database().command
      param = { count: _.inc(1001) }
      var id = 'e6a3b07d5eeb732000103caa2cd177a8'
      return db.update_by_id(table_name, id, param)

    })
    .then(res => {
      index++
      console.log('第2个回调函数', res)
    })
    .catch(err => {
      console.log('第' + parseInt(index + 1)  + '个方法的错误', err)
      //下面做异常处理，弹窗信息等
    })
  },
})