
/**
 ************************************************
 * 带原型的 Constructor
 * ==============================================
 ************************************************
 */

// 上一个案例(case_base_constructor)是简单版本的构造器,存在几个问题:
// 1. 继承困难
// 2. toString() 这样的函数是为每个使用Car的信创建对象分别定义的,最理想的是这种函数应该是被每个Car类型实例之间所共享的
// ES3 和 ES5 兼容替代方案能够用于创建对象,很容易解决这个问题



function Car (model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

/**
 * prototype 原型
 * js中有一个名为prototype的属性,调用构造器创建一个对象之后,
 * 新对象会 __具有__ 构造器原型的所有属性
 */
Car.prototype.toString =  function () {
  return this.model + " has done " + this.miles + " miles";
};

var civic = new Car('Honda Civic',2009, 20000);
var mondeo = new Car('Ford Mondeo',2010, 5000);

// 现在toString() 的单一实例就能够在所有 Car 对象之间共享
console.log(civic.toString()); //Honda Civic has done 20000 miles
console.log(mondeo.toString()); //Ford Mondeo has done 5000 miles
