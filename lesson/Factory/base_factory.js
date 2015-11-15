/**
 ************************************************
 * Factory (工厂)模式
 * --------------------
 ************************************************
 * 创建型模式
 *
 * 涉及创建对象的概念。其分类不同于其他模式的地方在于__它不显示的要求使用一个构造函数__。而Factory可以提供一个通用的接口来创建对象
 * 我们可以指定我们希望创建的工厂对象的类型。
 *
 */


// 案例1


// 定义 Car 构造函数
function Car (options) {
  // 属性默认值
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}



// 定义Truck 构造函数
function Truck (options) {

  this.state     = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color     = options.color || "blue";
}


// 汽车工厂 拥有 Car Truck 生产能力

function VehicleFactory () { }

// 该工厂的原型和试用工具默认 vehicleClass 为 Car
VehicleFactory.prototype.vehicleClass = Car;

// 创造 Vehicle 实例的工厂方法
VehicleFactory.prototype.createVehicle = function (options) {
  if( options.vehicleType === 'truck') {
    this.vehicleClass = Truck;
  }

  return new this.vehicleClass(options);
};

// 生成汽车工厂实例
var carFactory = new VehicleFactory();

// 生产小汽车
var mycar = carFactory.createVehicle({
  "color":"yellow",
  "state":"like new"
});

console.log('mycar 的原型是 Car: '+(mycar instanceof Car));
console.log(mycar);

/**
 * mycar -> carFactory -> VehicleFactory -(非显示构造函数)-> Car
 */

// 接下来生产一辆大卡车
var myTruck = carFactory.createVehicle({
  vehicleType : "truck",
  state       : "old",
  color       : "red"
});

console.log('myTruck 的原型是 Truck: '+ (myTruck instanceof Truck));
console.log(myTruck);

/**
 * 扩展我们的 VehicleFactory 工厂,发展成为专门的卡车工厂
 */
function TruckFactory () {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

// 创造独立的卡车工厂实例
var truckFactory = new TruckFactory();

// 使用独立的 卡车共创创造卡车
var myBigTruck = truckFactory.createVehicle({
  state : "omg ... so bad",
  color : "pink !! so ugly"
});

console.log('myBigTruck 的原型 是 Truck: '+ (myTruck instanceof Truck));
console.log(myBigTruck);

/**
 * myBigTruck -> truckFactory -(构造函数)->TruckFactory -> VechicleFactory -> Truck
 */



/**
 ************************************************
 * 何时使用Factory
 * --------------------
 ************************************************
 *
 * 以下场景Factory特别有用
 * - 对象或组建设置涉及高复杂性
 * - 当需要根据所在的不同环境轻松生成对象的不同实例时
 * - 当处理很多共享相同属性的小型对象或组建时
 *
 * 何时不该使用
 * 如果应用错误这种模式会为应用带来大量不必要的复杂性。
 * 除非为创建对象提供一个接口是我们正在编写的库或框架的设计目标，否则会带来不必要的开销。
 */




/**
 ************************************************
 * Abstract Factory(抽象工厂) 模式
 * --------------------
 ************************************************
 * 用于封装一组具有共同目标的单个工厂。它能够将一组对象的实现细节从一般用法中分离出来
 *
 * 使用场景:
 * - 一个系统必须独立于它所创建的生产方式,或它需要与多种对象类型一起工作
 *
 * 所有的类都需要某些方法属性通过抽象工厂的检测
 */

// 扩展具体工厂的方法,以便稍后案例使用
Car.prototype.drive = function () {
  console.log('drive....');
};

Car.prototype.breakDown = function () {
  console.log(' breakDown');
};

Truck.prototype.drive = function () {
  console.log('drive....');
};

Truck.prototype.breakDown = function () {
  console.log(' breakDown');
};

// 独立于创建的抽象工厂

var AbstractVehicleFactory = (function () {
  // 存储车辆类型
  var types = [];

  return {
    getVehicle : function (type, customizations) {
      var Vehicle = types[type];
      return (Vehicle) ? new Vehicle(customizations) : null;
    },
    // 注册车类型
    registerVehicle: function (type, Vehicle) {
      var proto  = Vehicle.prototype;

      // 只注册合格实现了车辆契约的车类型
      if(proto.drive && proto.breakDown) {
        types[type] = Vehicle;
      }
    }
  };
})();

// 注册车辆类型
AbstractVehicleFactory.registerVehicle("car",Car);
AbstractVehicleFactory.registerVehicle("truck",Truck);

// 基于抽象车辆类型实例化一个car
var yourCar = AbstractVehicleFactory.getVehicle('car',{
  color: "green",
  state: "like new"
});

var yourTruck  = AbstractVehicleFactory.getVehicle('truck',{
  color: "neon yellow",
  state: "like new"
});

// 实例化出符合的车辆
console.log(yourCar);
console.log(yourTruck);

var hisCar = AbstractVehicleFactory.getVehicle('nocar',{
  color: "green",
  state: "like new"
});

// 未注册的无法实例成功
console.log(hisCar);
