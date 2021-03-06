window.textIndex = 0
window.searchTitleTiemer = setInterval(function () {
  var search = e('.search-text')
  var searchTitle = ['小米10年献礼之作', '电视', '手机', '家电', '智能', '空调', '小米10', '扫地机器人', '净水器']
  search.placeholder = searchTitle[window.textIndex]
  window.textIndex++
  if (window.textIndex == searchTitle.length) {
    window.textIndex = 0
  }
}, 2000);
/** 鼠标移入移出购物车事件绑定
 * 
 */
var bindeventCartmenu = function () {
  var topbar = e(".site-topbar")
  var divText = e('.msg')
  var menu = e(".cart-menu")
  // 鼠标移入/出购物车
  bindEvent(topbar, 'mouseenter', function (event) {
    menu.style.height = "100px"
    removeClassAll('hide')
  })
  bindEvent(topbar, 'mouseleave', function (event) {
    menu.style.height = "0px"
    divText.classList.add('hide')
  })
}

/** 绑定小米手机、红米手机的移入下滑
 * 
 */
var sideChange = function () {
  var item = '.nav-item'
  var content = e('.side-item')
  var down = function () {
    content.classList.remove('side-up')
    content.classList.add('side-down')
  }
  var up = function () {
    content.classList.remove('side-down')
    content.classList.add('side-up')
  }
  var none = function () {
    content.style = 'display:none;'
  }
  var clearT = function () {
    clearTimeout(window.sidedown)
    clearTimeout(window.sideup)
    clearTimeout(window.sidenone)
  }
  bindAll(item, 'mouseenter', function () {
    clearT()
    content.style = 'display:block;'
    window.sidedown = setTimeout(down, 300)
  })
  bindAll(item, 'mouseleave', function () {
    clearT()
    window.sideup = setTimeout(up, 200)
    window.sidenone = setTimeout(none, 300)
  })
  bindEvent(content, 'mouseenter', function () {
    clearT()
    content.style = 'display:block;'
    window.sidedown = setTimeout(down, 300)
  })
  bindEvent(content, 'mouseleave', function () {
    clearT()
    window.sideup = setTimeout(up, 200)
    window.sidenone = setTimeout(none, 300)
  })
}
/**
 * 鼠标移入左侧列表出现商品列表，移出隐藏
 */
var bindeventShowList = function () {
  var sideList = ".site-item-li"
  var active = 'children-active'
  var children = e('.children')
  bindAll(sideList, 'mouseenter', function () {
    children.classList.add(active)
  })
  bindAll(sideList, 'mouseleave', function () {
    children.classList.remove(active)
  })
}
// 防抖
var debounce = function (func, delay) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    var context = this, args = arguments
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, delay)
  };
}

// 返回顶部
var bindEventBackTop = function () {
  var top = e('.bar-div-top')
  var timer = null;
  var oScroll = true;
  window.onmousewheel = function () {
    // console.log('body scroll')
    if (oScroll) {
      clearInterval(timer);
    }
    oScroll = false;
  }
  bindEvent(top, 'click', function () {
    // console.log('top')
    timer = setInterval(function () {
      var oTop = document.documentElement.scrollTop;
      //设置速度由快到慢
      var ispeed = Math.floor(oTop / 7);
      document.documentElement.scrollTop = oTop - ispeed;
      oScroll = true;
      // console.log(oTop)
      if (ispeed == 0) {
        clearInterval(timer);
      }
    }, 10);
  })
}

var bindEventSwiperControl = function () {
  var prev = e('.swiper-flashsale-prev')
  var next = e('.swiper-flashsale-next')
  var wrapper = e('.swiper-wrapper')
  var prevT = null;
  var nextT = null;
  var stop = null;
  var prevTi = null;
  var clearTI = function () {
    clearInterval(prevTi)
    clearInterval(stop)
    clearTimeout(nextT)
  }
  stop = setInterval(() => {
    clearInterval(prevTi)
    // console.log('next')
    wrapper.style = 'transform: translate3d(-992px, 0px, 0px);transition-duration: 1000ms;'

    prevTi = setInterval(() => {
      // console.log('prev')
      wrapper.style = 'transform: translate3d(0px, 0px, 0px);transition-duration: 1000ms;'
    }, 4000);
  }, 8000);
  // var index = wrapper.dataset.index
  bindEvent(prev, 'click', function () {
    clearTI()
    wrapper.style = 'transform: translate3d(0px, 0px, 0px);transition-duration: 1000ms;'
    prevT = setTimeout(() => {
      wrapper.style = 'transform: translate3d(0px, 0px, 0px);transition-duration: 0ms;'
    }, 1000);
  })
  bindEvent(next, 'click', function () {
    clearTI()
    clearTimeout(prevT)
    wrapper.style = 'transform: translate3d(-992px, 0px, 0px);transition-duration: 1000ms;'
    nextT = setTimeout(() => {
      wrapper.style = 'transform: translate3d(-992px, 0px, 0px);transition-duration: 0ms;'
    }, 2000);
  })
}

var getTime = function () {
  var hour, minute, second, round, roundState
  var dateNow = new Date()
  var hourNow = dateNow.getHours()
  var roundTime = new Date(dateNow.getTime())
  var beginHour = hourNow >= 14 ? 14 : 0
  var endHour = beginHour + 9
  round = beginHour == 0 ? '00:00场' : '14:00场'
  if (endHour < hourNow) {
    console.log('++++++++++++++++++')
    hour = '00'
    minute = '00'
    second = '00'
    roundState = '本场已结束'
    return {
      hour,
      minute,
      second,
      round,
      roundState
    }
  } else {
    roundTime.setHours(endHour)
    roundTime.setMinutes(0)
    roundTime.setSeconds(0)
    var totalsecond = roundTime.getTime() - dateNow.getTime()
    totalsecond /= 1000
    hour = `0${Math.floor(totalsecond / 60 / 60)}`
    minute = Math.floor((totalsecond - hour * 60 * 60) / 60)
    minute = (minute - 10) >= 0 ? ('' + minute) : ('0' + minute)
    second = Math.floor(totalsecond % 60)
    second = (second - 10) >= 0 ? ('' + second) : ('0' + second)
    roundState = '距离结束还有'
    return {
      hour,
      minute,
      second,
      round,
      roundState
    }
  }

}

var timeChange = function () {
  var round = e('.round')
  // xx 场 ps：00:00场
  var hour = e('.hour')
  // 小时 ps：00
  var minute = e('.minute')
  // 分钟 ps：00
  var second = e('.second')
  // 秒 ps：00
  var roundState = e('.roundState')
  setInterval(() => {
    var timeNow = getTime()
    round.innerHTML = timeNow.round
    hour.innerHTML = timeNow.hour
    minute.innerHTML = timeNow.minute
    second.innerHTML = timeNow.second
    roundState.innerHTML = timeNow.roundState
  }, 1000);
}



var bindEvents = function () {
  bindeventCartmenu()
  bindeventShowList()
  bindEventBackTop()
  bindEventSwiperControl()
}

var __main = function () {
  bindEvents()
  sideChange()
  timeChange()
}
__main()