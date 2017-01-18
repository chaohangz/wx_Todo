//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    todos: [{
      text: '左滑删除',
      textStyle: '',
      complete: false
    }, {
      text: '吃饭',
      textStyle: '',
      complete: false
    }, {
      text: '睡觉',
      textStyle: '',
      complete: false
    }, {
      text: '打豆豆打豆豆打豆豆打豆豆打豆豆打豆豆打豆豆打豆豆',
      textStyle: '',
      complete: false
    }],
    userInput: '',
    delBtnWidth: '140', //删除按钮宽度，不要带尺寸
  },

  // onLoad: function(options) {
  //   // 页面初始化 options为页面跳转所带来的参数
  //   this.initEleWidth()
  // },

  // 添加todo
  addTodo: function(event) {
    var todos = this.data.todos
    var inputValue = event.detail.value
    if (!inputValue) return
    var todo = {
      text: inputValue,
      textStyle: '',
      complete: false
    }
    todos.push(todo)
    this.setData({
      todos: todos,
      userInput: ''
     })
  },

  // 删除todo
  removeTodo: function(event) {
    var todos = this.data.todos
    var index = event.target.dataset.index
    todos.splice(index, 1)
    this.setData({
      todos: todos
    })
  },

  // 完成todo,更新样式
  complete: function(event) {
    var todos = this.data.todos
    var index = event.target.dataset.index
    var complete = todos[index].complete
    if (!complete) {
      todos[index].complete = "complete"
    } else {
      todos[index].complete = false
    }
    this.setData({
      todos: todos
    })
  },

  // 滑动
  touchS: function(event) {
    this.setData({
      // 获取开始触摸的位置
      startX: event.touches[0].clientX
    })
  },

  touchM: function(event) {
    // 手指移动时水平方向位置
    var moveX = event.touches[0].clientX
    // 手指起始点位置与移动中的位置的差值
    var disX = this.data.startX - moveX
    var delBtnWidth = this.data.delBtnWidth
    var textStyle = ''
    if (disX < 0 || disX === 0) { // 如果移动距离小于或等于0，不变
      textStyle = 'left: 0px'
    } else if (disX > 0) {        // 移动距离大于0 left也移动手指移动的距离
      textStyle = 'left: -' + disX + 'px'
      if (disX >= delBtnWidth) {  // 限制最大距离为按钮宽度
        textStyle = 'left: -' + delBtnWidth + 'px'
      }
    }
    // 获取手指触摸的是哪一项
    var index = event.target.dataset.index
    var todos = this.data.todos
    todos[index].textStyle = textStyle
    // 更新列表状态
    this.setData({
      todos: todos
    })
  },

  touchE: function(event) {
    // 手指移动结束后水平位置
    var endX = event.changedTouches[0].clientX
    // 触摸开始与结束手指的移动距离
    var disX = this.data.startX - endX
    var delBtnWidth = this.data.delBtnWidth
    // 如果距离小于1/2,不显示按钮
    var textStyle = disX > delBtnWidth / 2 ? 'left: -' + delBtnWidth + 'px' : 'left: 0px'
    // 更新列表
    var index = event.target.dataset.index
    var todos = this.data.todos
    todos[index].textStyle = textStyle
    this.setData({
      todos: todos
    })
  },

  // 获取元素自适应后的实际宽度
  getEleWidth: function(width) {
    var real = 0
    try {
      var res = wx.getSystemInfoSync().widowWidth
      var scale = (750/2)/(width/2) // 以以750px为标准做自适应
      real = Math.floor(res / scale)
      return real
    } catch (error) {
      return false
    }
  },

  // 初始化宽度
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth)
    this.setData({
      delBtnWidth: delBtnWidth
    })
  },

  onShareAppMessage: function () {
      return {
          title: '番茄todo',
          desc: '待办事项和番茄时钟',
          path: '/index/index'
      }
  },
})
