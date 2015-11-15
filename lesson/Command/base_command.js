/**
 ************************************************
 * Command (命令)模式
 * --------------------
 ************************************************
 * Command 模式旨在将方法调用、请求或操作封装到单一对象中，从而根据我们不同的请求对客户进行参数化和传递可供执行的方法调用。
 * 这种Command模式将调用操作对象与指导如何实现该操作的对象解耦，并在交换出具体类(对象)方面提供更大的整理灵活性。
 *
 * 主要思想:
 * 为我们提供了一种__分离职责__的手段的，这些职责包括__从执行命令的任意地方发布命令__以及__将该职责转而委托给不同的对象__。
 *
 * 好处:
 * 简单的命令对象把action动作和调用该动作的对象绑定一起.它们时钟包括一个执行操作(run()/execute())所有具有相同接口的对象Commond 对象可以根据需要轻松交换
 */


/**
 * Case 1
 */

  var CarManager = {
    // 请求信息
    requstInfo: function (model, id) {
      return '请求数据..... 关于model:'+model+' 关于 id'+id;
    },
    // 订购汽车
    buyVehicle: function (model, id) {
      return '成功订阅汽车一辆';
    },
    arrageViewing: function (model, id) {
      return '安排观看关于model:'+model+' id:'+id;
    }
  };

/**
 * 从技术上来讲以上代码完全没有错误,是完整有效的Js代码
 * 但是也有不利的一面
 *
 * 如果CarManager里面的核心API改变了,那么这将要求程序里面所有直接访问这些方法的对象都要进行修改。
 * 这可能被视为一个耦合层，它实际上最大程度的违反了松耦合对象的OOP方法论。
 *
 */

// 扩展成Commond 模式

// 暴露方法
CarManager.execute = function (name) {
  // apply 指定上下文 和 参数
  return CarManager[name] && CarManager[name].apply(CarManager, [].slice.call(arguments,1));
};

console.log( CarManager.execute('requstInfo','ford','1123'));
console.log( CarManager.execute('buyVehicle','ford','1123'));
console.log( CarManager.execute('arrageViewing','ford','1123'));



