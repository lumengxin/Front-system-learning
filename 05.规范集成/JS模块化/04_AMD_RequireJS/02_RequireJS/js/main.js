(function() {

  requirejs.config({
    // 基本路径，出发点在根目录下
    baseUrl: 'js',
    // 配置路径
    paths: {
      dataService: './modules/dataService',
      alerter: './modules/alerter',
      // jQuery源码中，amd时包名为jquery
      jquery: './libs/jquery-1.10.1',
      angular: './libs/angular'
    },
    shim: {
      angular: {
        exports: 'angular'
      }
    }
  });

  // 显式声明依赖注入
  requirejs(['alerter', 'angular'], function(alerter, angular) {
    alerter.showMsg();

    console.log(angular)
  })
})();