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


// 案例
// 1. 私有属性与公有属性
// 2. 私有属性无法直接在外部直接修改

var basketModule = (function () {
  // 私有属性
  var basket = [];
  // 私有方法
  function doSomethingPrivate () {
    // coding
  }
  // 暴露公有对象
  return {

    // 添加商品
    addItem:function (values) {
      basket.push(values);
    },
    // 获取购物车数量
    getItemCount: function () {
      return basket.length;
    },
    // 私有函数的公有形式别名
    doSomething: doSomethingPrivate,
    // 获取总价
    getTotalPrice: function  () {
      var itemCount = this.getItemCount(),
      total = 0;

      while (itemCount--) {
        total += basket[itemCount].price;
      }

      return total;
    }

  };
})();

// 匿名函数自执行,返回公有对象

// 添加两件商品
basketModule.addItem({
  "item":"bread",
  "price":0.5
});
basketModule.addItem({
  "item":"butter",
  "price":0.3
});

console.log('商品数量:' + basketModule.getItemCount()); // 2
console.log('商品总价:' + basketModule.getTotalPrice()); // 0.8


// 无法获取 basket
console.log('获取basket:' + basketModule.basket); // undefined
