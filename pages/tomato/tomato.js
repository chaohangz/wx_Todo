var app = getApp()

Page ({
    data: {
        time: '30:00',
        able: false
    },
    setTime: function(event) {
        var time = event.target.dataset.time
        this.setData({ time: time })
    },
    timeCount: function() {
        var time = this.data.time
        // console.log(time)
        var timeArray = time.split(":")
        var minute = parseInt(timeArray[0])
        var second = parseInt(timeArray[1])
        if (minute === 00 && second === 00) {
            that.setData({ able: false })
            return
        }
        if (second === 00) {
            minute -= 1
            second = 60
        }         
        second -= 1
        if (second < 10) second = "0" + second
        if (minute < 10) minute = "0" + minute
        time = minute + ":" + second
        this.setData({ time: time })
        setTimeout(this.timeCount, 1000)
    },
    begin: function() {
        this.setData({ able: true })
        setTimeout(this.timeCount, 1000)
    },
    rest: function() {
        this.setData({ time: '05:00' })
        this.setData({ able: true })
        setTimeout(this.timeCount, 1000)
    },
    onShareAppMessage: function () {
        return {
            title: '番茄todo',
            desc: '待办事项和番茄时钟',
            path: '/tomato/tomato'
        }
    }
})