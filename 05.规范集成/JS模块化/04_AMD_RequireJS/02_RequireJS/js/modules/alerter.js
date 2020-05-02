define(['dataService', 'jquery'], function(dataService, $) {
  let name = 'xin'

  function showMsg() {
    $('body').css('background', 'gray')
    console.log(dataService.getMsg() + ', ' + name)
  }

  return { showMsg }
})
