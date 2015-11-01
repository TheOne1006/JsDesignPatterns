/**
 ************************************************
 * Publish/Subscribe (发布/订阅)模式
 * --------------------
 ************************************************
 * 通常JavaScript中,注重Observer模式是很有用的, 我们会发现它一般使用一个成为"Publish/Subscribe"模式的变量来实现。
 * 虽然这两个模式非常相似,但是它们之间的几点区分也是值得注意的。
 *
 * Observer 模式要求希望接收到主题通知的观察者(对象)必须订阅改变事情。
 *
 * Publish/Subscribe 模式使用了一个主题/事件通道,这个通道介于希望接收到通知(订阅者)的对象和激活事件的对象(发布者)之间。
 * 该系统允许代码定义应用程序的特定事件,这些事件可以传递自定义参数,自定义参数包含订阅者所需的值。
 * 其目的:避免订阅者和发布者产生依赖
 *
 * 与Observer 模式不同,因为它(订阅发布)允许任何订阅者执行适当的事件粗粒程序来注册和接收发布者发布的通知。
 */


/**
 * 模拟简单的Publish/Subscribe
 * 没有解绑unsubscribe
 * 主要观察与Observer 的差异
 */
var subscribers = {};

// 订阅函数
function subscribe (name, fun) {
  name = 'sub_'+name;

  // 不存在则初始化
  if(!subscribers[name]){
    subscribers[name] = [];
  }

  subscribers[name].push(fun);

  return fun;
}

// 发布函数
function publish (name, array) {
  name = 'sub_'+name;

  var arrLength = array.length;
  if(subscribers[name].length && arrLength) {
    for (var i = 0; i < subscribers[name].length; i++) {
      for (var j = 0; j < arrLength; j++) {

        subscribers[name][i](array[j].topic, array[j].data);
      }
    }
  }
}


// 案例 简单的mail处理程序

// 收到信息数量
var mailCounter = 0;

// 初始化订阅，名字是 inbox/newMessage
var subscribe1 = subscribe('inbox/mes', function (topic, data) {
  // 上文书"该系统(订阅发布)允许代码定义应用程序的特定事件,这些事件可以传递自定义参数,自定义参数包含订阅者所需的值。"
  // 而Observer 则指定Update 方法, subscribe 匿名函数执行想要的处事方法,显然更加方便.
  // 呈现消息预览
  console.log(' --------------------- ');
  console.log(' 主题: '+ topic);
  console.log(' - - - - - - - - - - -');
  console.log(' 内容: '+ data);
});

var subscribe2 = subscribe('inbox/mes', function () {
  mailCounter++;
  console.log(' 信息条数:'+mailCounter);
});


// 模拟发布 inbox/mes 消息
publish('inbox/mes', [{
  topic:'测试测试',
  data:'这里是测试内容,这里是测试内容'
},{
  topic:'测试2',
  data:'第二条测试内容'
}]);


/**
 * 中心思想: 促进更松散的耦合。
 * 通过订阅另一个对象的特定任务或活动,当任务/活动发生变化时获得通知,而不是单个对象调用其他对象的方法
 * Observer 模式案例中调用了observer.Update()
 */


/**
 * 优点:
 * 1. Observer模式和Publish/Subscribe模式鼓励我们努力思考应用程序不同部分之间的关系。
 * 2. 它们也帮助我们识别包括直接关系的层,并且可以用目标集和观察者进行替换。
 * 3. 实际上可以用于将应用程序分解为更小、更松散的的块,以改进代码管理和潜在的复用。
 *
 * 缺点:
 * 1. 如果订阅者执行无法正常运行,由于系统的解耦特定,发布者无法看到
 * 2. 订阅者无视彼此的存在
 */




/**
 * 什么时候使用什么模式(Observer VS Publish/Subscribe)
 * ==================================================
 * 使用Observer:
 * 1. 我们需要维护的对象之间有一致性。如同一对象、都是button、都有Update()方法
 * 2. 无需考虑是否通知到的对象(观察者)是否异常,二位它们是"一类对象"
 * 使用Publish/Subscribe:
 * 1. 不同'类型对象'的(订阅者),或者说没有同一的方法Update().
 * 2. 需要更松散的耦合
 *
 */

