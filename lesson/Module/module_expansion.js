/**
 ************************************************
 * 模式的变化
 * --------------------
 ************************************************
 */


// 1. 引入混用
// jQuery, Underscore作为参数传给匿名函数

// 全局模块
var myModule = (function($,_){
  function privateMethod1 () {
    $('body').show();
  }

  function privateMethod2 () {
    console.log(_.min([10,11,2]));
  }
  // 返回公共对象
  return {
    method1: privateMethod1,
    method2: privateMethod2
  };

})(jQuery, underscore);


// 引出
var myModule = (function  () {
  // 模块对象
  var module = {},
  privateValue = 'hello';

  function privateMethod(){

  }
  // 公有成员
  module.publicProperty = 'Follow';
  module.publicMethod  = function () {
    console.log('公有方法');
  };

  // 暴露对象
  return module;

});



/**
 ************************************************
 * Module模式缺点
 * --------------------
 ************************************************
 * 由于我们访问公有和私有成员方式不同，当我们想改变可见性时，实际上我们必须要修改每一个曾经用过该成员的地方
 * 我们也无法在此之后添加私有成员。
 * 其他缺点:
 * 无法单元测试私有变量
 * 私有方法没有那么容易扩展
 *
 */

