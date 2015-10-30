/**
 * JavaScript中,有几种实现模块的方法,包括:
 * 1. 对象字面量
 * 2. Module模式
 * 3. AMD模块 (暂却)
 * 4. CommonJS模块 (暂却)
 * 5. ECMAScript Harmony模块 (暂却)
 */


/**
 ************************************************
 * 对象字面量
 * --------------------
 ************************************************
 */

// 使用字面量标示法定义的模块案例:
var myModule = {
  myProper : 'value',
  myMethod : function() {
    console.log(' function in myModule');
  }
};

/**
 ************************************************
 * Module(模块)模式
 * --------------------
 ************************************************
 * 模块最初被定义为在传统软件工程中未类提供私有和共有的封装的方法.
 * JavaScript中Module模式用于进一步模拟类的概念,
 * 能够使一个单独的对象拥有公有/私有方法和变量.
 *
 * __私有__,Javascript 没有真正的"私有",闭包模拟
 *
 */
var testModule = (function() {
  var counter = 0;
  return {
    incrementCounter: function() {
      ++counter;
      return this;
    },
    resetCounter: function() {
      console.log('重置计数器,现在的值为:'+counter);
      counter = 0;
      return this;
    }
  };
})();

// 无法直接修改 counter, counter称为存在有一个隔离空间的变量 - "私有变量"
testModule.incrementCounter().incrementCounter().resetCounter();

