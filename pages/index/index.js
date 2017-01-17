//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    todos: ["吃饭", "睡觉", "打豆豆"],
    userInput: ''
  },
  // 添加todo
  addTodo: function(event) {
    var inputValue = event.detail.value
    if (!inputValue) return
    this.data.todos.push(inputValue)
    this.setData({
      todos: this.data.todos,
      userInput: ''
     })
  },

  // 删除todo
  removeTodo: function(event) {
    var todos = this.data.todos
    var todo = event.target.dataset.todo
    todos.splice(todos.indexOf(todo), 1)
    this.setData({todos: todos})
  },

  onShareAppMessage: function () {
      return {
          title: '番茄todo',
          desc: '待办事项和番茄时钟',
          path: '/index/index'
      }
  },
})
