/**
 ************************************************
 * Prototype (原型)模式
 * --------------------
 ************************************************
 * 创建型设计模式
 *
 * "四人组"提供Prototype的定义:
 * 1. 一种基于现有对象的模板,通过克隆方式创建对象的模式。
 *
 * 我们认为Prototype 模式是基于原型继承的模式,可以在其中创建对象,作为其他对象的原型。
 * prototype对象本身实际上是用作构建函数创建每个对象的蓝图。
 *
 * 使用Prototype的好处:
 * 1. 我们获得的时JavaScript其本身所具有的原型优势,而不是试图模仿其他语言特性
 * 2. 也可以带来性能的提升,在一个对象中定义一个函数，它们都是由引用来创建(因此所有子对象都指向相同的函数),
 *    而不是创建它们自己的拷贝.
 *
 */



/**
 * ECMAScript5 Object.create
 * --------------------------
 * @param optionalDescriptorObjects 提供参数来初始化对象属性
 * Objeact.create(prototype, optionalDescriptorObjects);
 */

var car = {
  "name": "car",
  driver: function () {
    console.log('drivering...');
  },
  panic: function () {
    console.log('wait wait');
  }
};

// 使用 Object 实例化一个新car
var yourCar = Object.create(car);

console.log(yourCar.name);
yourCar.driver();


/**
 * Object.create 还能轻松实现差异化继承
 */
var myCar = Object.create(car, {
  id:{
    value:"myId",
    enumerable: true
  },
  name:{
    value:"Ford",
    enumerable:true
  }
});

console.log(myCar.name, myCar.id);

/**
 * 与Object.defineProperties
 *  Object.defineProperty 使用语法相似
 */

