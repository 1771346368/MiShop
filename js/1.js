var bindeventsilde = function() {
  var nextButton = e('#button-next')
  bindEvent(nextButton, 'click', function(event){
    window.clearInterval(timer)
    var slide = event.target.parentElement
    var numOfimages = parseInt(slide.dataset.image)
    var activeIndex = parseInt(slide.dataset.index)
    activeIndex = (activeIndex + 1) % numOfimages
    slide.dataset.index = activeIndex
    var nextSelector = '#guaIndex-' + String(activeIndex)
    var className = 'gua-active'
    removeClassAll(className)
    var img = e(nextSelector)
    img.classList.add(className)
    var nextSelectorBottom = '#bottom-index-' + String(activeIndex)
    var bottomClassName = 'bottom-active'
    removeClassAll(bottomClassName)
    var bot = e(nextSelectorBottom)
    bot.classList.add(bottomClassName)
    timer = window.setInterval("clock()", 2000)
  })
  var lastButton = e('#button-last')
  bindEvent(lastButton, 'click', function(event){
    window.clearInterval(timer)
    var slide = event.target.parentElement
    var numOfimages = parseInt(slide.dataset.image)
    var activeIndex = parseInt(slide.dataset.index)
    if (activeIndex == 0) {
      activeIndex = numOfimages - 1
    } else {
      activeIndex -= 1
    }
    slide.dataset.index = activeIndex
    var nextSelector = '#guaIndex-' + String(activeIndex)
    var className = 'gua-active'
    removeClassAll(className)
    var img = e(nextSelector)
    img.classList.add(className)
    var nextSelectorBottom = '#bottom-index-' + String(activeIndex)
    var bottomClassName = 'bottom-active'
    removeClassAll(bottomClassName)
    var bot = e(nextSelectorBottom)
    bot.classList.add(bottomClassName)
    timer = window.setInterval("clock()", 2000)
  })
}

var clock = function() {
  var slide = e('.gua')
  var numOfimages = parseInt(slide.dataset.image)
  var activeIndex = parseInt(slide.dataset.index)
  activeIndex = (activeIndex + 1) % numOfimages
  slide.dataset.index = activeIndex
  var nextSelector = '#guaIndex-' + String(activeIndex)
  var className = 'gua-active'
  removeClassAll(className)
  var img = e(nextSelector)
  img.classList.add(className)
  var nextSelectorBottom = '#bottom-index-' + String(activeIndex)
  var bottomClassName = 'bottom-active'
  removeClassAll(bottomClassName)
  var bot = e(nextSelectorBottom)
  bot.classList.add(bottomClassName)
}

var bottomChange = function() {
  var bottom = '.gua-bottom'
  bindAll(bottom, 'mouseenter', function(event){
    window.clearInterval(timer)
    var slide = event.target.parentElement.parentElement
    var temp = event.target.getAttribute("id")
    var eIndex = parseInt(temp[temp.length-1])
    slide.dataset.index = eIndex
    var nextSelector = '#guaIndex-' + String(eIndex)
    var className = 'gua-active'
    removeClassAll(className)
    var img = e(nextSelector)
    img.classList.add(className)
    var nextSelectorBottom = '#bottom-index-' + String(eIndex)
    var bottomClassName = 'bottom-active'
    removeClassAll(bottomClassName)
    var bot = e(nextSelectorBottom)
    bot.classList.add(bottomClassName)
    timer = window.setInterval("clock()", 2000)
  })
}
timer = window.setInterval("clock()", 2000)
bindeventsilde()
bottomChange()