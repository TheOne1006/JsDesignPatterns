/**
 ************************************************
 * Singleton (单例)模式
 * --------------------
 ************************************************
 * 功能: 保证一个类只实例化一次
 * Single不同于静态类(对象),因为我们能推迟它们的初始化,这通常是因为它们需要信息,而这些信息在初始化期间可能无法获得
 *
 * "四人组"所著的书中,有关Singleton模式_适用性_描述如下
 * - 当类只有一个实例且客户可以从一个众所周知的访问点访问它
 * - 该唯一的实例应该是通过子类化扩展的,并且客户应该无需更改代码就能使用一个扩展的实例时。
 *
 */

var mySingleton = (function () {
  // 实例保持了Singleton的一个引用
  var instance;

  function init () {
    // Singleton
    // 私有方法和变量
    var privateVariable = 'I am private';
    var parivateRandomNumber = Math.random();
    return {
      publicMethod : function () {
        console.log('Public Method');
      },
      publicProperty: 'public property',
      getRandom: function  () {
        return parivateRandomNumber;
      }
    };
  }

  return {
    // 获取 Singleton实例,如果存在就返回,不存在则创建
    getInstance: function () {
      if(!instance) {
        instance = init();
      }
      return instance;
    }

  };
})();


var myBadSingleton = (function () {
  var instance;
  function init() {
    var privateRandom = Math.random();
    return {
      getRandom: function () {
        return privateRandom;
      },
      publicVar: 'hello'
    };
  }

  return {
    // 每次都新建
    getInstance: function () {
      instance = init();
      return instance;
    }
  };
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log('singleA.getRandom == singleB.getRandom =>', singleA.getRandom() === singleB.getRandom());

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();

console.log('badSingleA.getRandom == badSingleB.getRandom =>', badSingleA.getRandom() === badSingleB.getRandom());
