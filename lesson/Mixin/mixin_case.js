/**
 * 案例将演示,不需要对我们肯能拥有的每个构造函数都重复这一过程而将功能包含进来
 *
 * 让构造函数专注于差异化,而不必考虑"相同的、共有的属性"
 * 模拟交通工具的创建
 */

// 构造函数

var Car = function (options) {
  this.wheels = options.wheels || '4';
};

var Rocket = function (options) {
  // 控制台操作
  this.console = options.human || 'computer';
  this.fly = function () {
    console.log( 'I can fly without Wing');
  };
};

/**
 * 以上分别构造了 Car 和 Rocket 的"部分属性"。
 * 但是以上这两种交通工具都需要左右移动,启动,暂停等操作
 */

// Mixin
var Mixin = function () { };

Mixin.prototype = {
  moveLeft : function () {
    console.log('move left');
  },
  moveRight: function () {
    console.log('move Right');
  },
  // 某些交通工具需要点火
  fire : function () {
    console.log('3 .... 2 .... 1 .... FIRE!');
  },
  // 某些交通工具能快速的后退
  moveBack: function () {
    console.log('back now');
  }
};

// 将现有对象扩展到目标对象上
function extend (receivingClass, givingClass) {
  var i = 2, argLen = arguments.length, fnName;
  // 只提供指定的方法,不考虑覆盖
  if(arguments[2]) {
    for (; i < argLen; i++) {
      fnName = arguments[i];
      receivingClass.prototype[fnName] =  givingClass.prototype[fnName];
    }
  }
}

// 接下来扩展Car 和 Rocket
extend(Car, Mixin, "moveLeft", "moveRight", "moveBack");
extend(Rocket, Mixin, "moveLeft", "moveRight", "fire");

// 实例化这两样东西
var myCar = new Car({wheels:6});
var myRocket = new Rocket({});

// 然后使用
myCar.moveLeft();
myCar.moveRight();
myCar.moveBack();

myRocket.moveLeft();
myRocket.fire();
myRocket.fly();


/**
 * 优点:
 * 1. 有助于减少系统重复功能以及增加函数的复用.
 * 2. 当一个应用程序需要各个对象实例共享行为是，可以通过Mixin共享，专注于不同的功能,避免重复
 *
 * 缺点:
 * 1. 有些开发者认为将功能注入对象原型是很糟糕的想法。
 * 2. 因为它会导致原型污染和函数起源方面的不稳定性。
 */

