/**
 ************************************************
 * 单例模式案例
 * --------------------
 ************************************************
 * "四人组"所著的书中,有关Singleton模式_适用性_描述如下
 * - 当类只有一个实例且客户可以从一个众所周知的访问点访问它
 * - 该唯一的实例应该是通过子类化扩展的,并且客户应该无需更改代码就能使用一个扩展的实例时。
 *
 */

// 伪代码
var mySingleton = {};

mySingleton.getInstance = function () {
  if(this._instance == null){
    if(isFoo()){
      this._instance = new Foo();
    }else {
      this._instance = new BaseSingleton();
    }
  }
  return this._instance;
};

/**
 * 在这里getInstance 变得有点像工厂方法,访问它时,我们不需要更新代码中的每一个访问点。
 * FooSingleton 将是一个  BaseSingleton 的子类,并实现相同的接口
 */

