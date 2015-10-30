/**
 *
 * Object 构造器用于创建指定类型对象-准备好对象以备使用,
 * 同时接受构造器可以使用的参数,
 * 以在第一次创建对象是设置成员属性和方法
 */


/**
 ************************************************
 * 创建对象
 * ==============================================
 ************************************************
 */

// 对象字面量方式创建空对象
var newObject = {};

// object 构造器简洁记法
// varObject = new Object();


/**
 * ECMAScript3兼容方式
 */

// 设置属性 "." ,中括号
newObject.someKey = "hello World";
// newObject['someKey'] = "hello world";

/**
 * 只适用ECMAScript5
 * Object.defineProperty()
 * Object.defineProperties()
 *
 */

Object.defineProperty(newObject,"somekey",{
    value: "for more control fot the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});

console.log(newObject.somekey); // for more control fot the property's behavior

Object.defineProperties(newObject, {
    "someKey": {
        value:"hello js",
        writable:true
    },
    "anotherKey": {
        value: 'hello key',
        writable:true
    }
});

console.log(newObject.someKey, newObject.anotherKey); // hello js hello key



/**
 ************************************************
 * 基本Constructor
 * ==============================================
 ************************************************
 */

// 构造器函数
function Car (model, year, miles) {
    // 构造器内,this 引用新创建的对象
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.toString = function (){
        return this.model + 'has done ' + this.miles + " miles";
    };
}

// 通过关键词"new" 创建Car 的实例对象
var civic  = new Car("Honda Civic",2009, 20000);

// 调用创建对象的方法
console.log(civic.toString());
