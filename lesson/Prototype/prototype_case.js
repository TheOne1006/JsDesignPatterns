/**
 * prototype案例2
 * 不直接使用Object.create
 */

/**
 * 定义车辆原型
 */
var vehiclePrototype = {

  init : function (carModel) {
    this.model = carModel;
  },
  getModel: function () {
    console.log('The model of this vehicle is '+ this.model);
  }
};

function vehicle (model) {
  function F () {}
  // 原型继承
  F.prototype = vehiclePrototype;

  var f = new F();
  f.init(model);
  return f;
}

var carA = vehicle('Frod Escort');
var carB = vehicle('I don\'t know');

carA.getModel();
carB.getModel();
console.log('prototype 是否来自同一个函数：'+ (carA.prototype == carB.prototype));



/**
 * 另一种可选的Prototype模式实现
 */
var beget = (function () {

  function F () {}

  return function (proto) {
    F.prototype = proto;
    return new F();
  };
})();


