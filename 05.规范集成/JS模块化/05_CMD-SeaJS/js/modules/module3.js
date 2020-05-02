define(function(requires, exports, module) {
  let data = 'module3';
  function fun(){
    console.log('fun(): ', data);
  }
  exports.module3 = {fun};
});