/**
 ************************************************
 * 子类化
 * --------------------
 ************************************************
 * 通过案例了解
 */

// case 1
var Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};


// 指定一个新类(对象)与普通人类相似,但是也有自己特有的属性,
// 作为Person 的子类
var Studen = function (firstName, lastName , work) {

  // 构造studen ,需要使用 超类的构造函数
  Person.call(this, firstName, lastName);

  // 扩展特有属性
  this.work = work;
};

// 创建一个普通人
var hanmeimei  = new Person('han','meimei');

// 创建一个学生
var studenXiaoMing = new Studen('Xiao','ming',{"read":"read"});

console.log(hanmeimei);
console.log(studenXiaoMing);
console.log('studenXiaoMing 原型 来自Person: '+ (studenXiaoMing instanceof Person));



/**
 ************************************************
 * Mixin (混入)模式
 * --------------------
 ************************************************
 * 在JavaScript 中,可以将Mimin 看作一种通过扩展收集功能的方式。
 * 我们定义的每个新对象都有一个原型，可以从中继承更多属性。原型可以继承与其他对象的原型,
 * 但更重要的时，它可以为任意数量的对象实例定义属性。可以通过这一点来__促进函数复用__。
 *
 * Minix 允许对象通过较低的复杂性借用(或继承)功能。
 * 由该模式(Mixin) 非常适用于Javascript的对象原型, 它(Mixin)提供了一些相当灵活的方式,从不只一个Mixin中分享功能,但实际上很多功能是通过多重继承获得的。
 *
 *
 *
 *
 */

// 案例引入 underscore
var _ = require('underscore');

var myMixins = {
  moveUp :function () {
    console.log('move Up');
  },
  moveDown: function  () {
    console.log('move Down');
  },
  stop: function  () {
    console.log('stop Now');
  }
};

function CarAnimator () {
  this.moveLeft = function () {
    console.log(' move Left use carAnimator');
  };
}

function PersonAnimator () {
  this.moveRandom = function () {
    console.log('随机走 use personAnimator');
  };
}

// 通过Mixin 扩展两个构造函数
_.extend(CarAnimator.prototype, myMixins);
_.extend(PersonAnimator.prototype, myMixins);

var carAnimate = new CarAnimator();
var personAnimate = new PersonAnimator();

carAnimate.moveLeft();
carAnimate.moveDown();
carAnimate.stop();

personAnimate.moveRandom();
personAnimate.moveUp();

/**
 * Mixin 允许我们以通用的方式 "混入"对象的构造函数
 */

