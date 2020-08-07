window.textIndex = 0
window.searchTitleTiemer = setInterval(function() {
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
var bindeventCartmenu = function() {
  var topbar = e(".site-topbar")
  var divText = e('.msg')
  var menu = e(".cart-menu")
  // 鼠标移入/出购物车
  bindEvent(topbar, 'mouseenter', function(event){
    menu.style.height = "100px"
    removeClassAll('hide')
  })
  bindEvent(topbar, 'mouseleave', function(event){
    menu.style.height = "0px"
    divText.classList.add('hide')
  })
}

/** 绑定小米手机、红米手机的移入下滑
 * 
 */
var sideChange = function() {
  var item = e('.nav-item-left')
  var content = e('.side-item')
  var down = function() {
    content.classList.remove('side-up')
    content.classList.add('side-down')
  }
  var up = function() {
    content.classList.remove('side-down')
    content.classList.add('side-up')
  }
  var none = function() {
    content.style = 'display:none;'
  }
  var clearT = function() {
    clearTimeout(window.sidedown)
    clearTimeout(window.sideup)
    clearTimeout(window.sidenone)
  }
  bindEvent(item, 'mouseenter', function(){
    clearT()
    content.style = 'display:block;'
    window.sidedown = setTimeout(down, 300)
  })
  bindEvent(item, 'mouseleave', function(){
    clearT()
    window.sideup = setTimeout(up, 200)
    window.sidenone = setTimeout(none, 300)
  })
  bindEvent(content, 'mouseenter', function(){
    clearT()
    content.style = 'display:block;'
    window.sidedown = setTimeout(down, 300)
  })
  bindEvent(content, 'mouseleave', function(){
    clearT()
    window.sideup = setTimeout(up, 200)
    window.sidenone = setTimeout(none, 300)
  })
}
/**
 * 鼠标移入左侧列表出现商品列表，移出隐藏
 */
var bindeventShowList = function() {
  var sideList = e("#show-list")
  var active = 'children-active'
  var children = e('.children')
  bindEvent(sideList, 'mouseenter', function(event){
    children.classList.add(active)
  })
  bindEvent(sideList, 'mouseleave', function(event){
    children.classList.remove(active)
  })
}



var __main = function() {
  bindeventCartmenu()
  bindeventShowList()
  sideChange()
}
__main()