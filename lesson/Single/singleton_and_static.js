/**
 ************************************************
 * 单例模式与类的静态实例的区别
 * --------------------
 ************************************************
 * 当Singleton可以作为一个静态的实例实现时,它也可以延迟构建,知道需要适用静态实例时,无需适用资源或内存 (怎么解释)
 *
 */

var SingletonTester = (function () {

  // options:包含singleton所需配置信息的对象
  // eg: var options = {name:'test',pointX:5}
  function Singleton (options) {
    // 如果未提供 options 则设置为空对象
    options = options || {};

    // 为singleton设置属性
    this.name = 'SingletonTester';
    this.pointX = options.pointX || 6;
    this.pointY = options.pointY || 10;
  }

  // 实例持有者
  var instance;

  // 静态变量和方法的模拟
  var _static = {
    name: 'SingletonTester_static',
    // 获取实例方法，返回singleton对象的singleton实例
    getInstance: function (options) {
      if(instance === undefined) {
        instance = new Singleton(options);
      }
      return instance;
    }
  };

  return _static;
})();

var singletontest = SingletonTester.getInstance({
  pointX: 5
});

console.log('singletontest.pointX:',singletontest.pointX);

/**
 * 应用场景
 * Singleton的存在往往表明系统中的模块要么是系统紧密耦合,要么是逻辑过于分散在代码库的多个部分。
 * 由于一系列问题 缺点
 * 从隐藏的依赖到常见多个实例的难度、底层的依赖管理难度等。Singletton的测试困难
 */
