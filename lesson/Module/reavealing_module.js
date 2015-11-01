/**
 ************************************************
 * 揭示模式
 * --------------------
 ************************************************
 * @author Christian Heilmann
 * 产生原因:
 * 不喜欢使用Module模式时,__必须要切换__到对象字面量表示某种方法变成公有的
 * 结果:
 * 创造了全新的模式,能够在私有范围内简单定义所有函数和变量,并返回匿名函数,它拥有指向私有函数的指针，该函数是希望变成公有的方法
 */

var myRevealingModule = function () {
  var privateVar = "Ben",
  publicVar = 'hi';

  function privateFun () {
    console.log('Name: ' + privateVar);
  }

  function publicSetName (strName) {
    privateVar = strName;
  }

  // 公有方法
  function publicGetName () {
    privateFun();
  }

  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  };
};

myRevealingModule.setName('Paul');

/**
 * 优点：
 * 1. 脚本语法更加一致,改善可读性
 * 2. 也容易区分公有和私有
 * 缺点：
 * 1. 私有函数引用公有函数式，公有函数式不能被覆盖的。
 * 2. 该模式不适用于公有成员,只适用于函数
 * 3. 引用私有变量的公有对象也遵守无补丁原则
 */
