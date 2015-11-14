/**
 ************************************************
 * Mediator (中介者)模式
 * --------------------
 ************************************************
 * 中介者是一种行为设计模式,
 * 它允许我们公开一个统一的接口,系统的不同部分可以通过该接口进行通信。
 *
 * 需求:
 * 如果一个系统的各个组件之间看起来有太多的直接关系,也许需要一个中心控制点,
 * 以便各个组件可以通过这个中心控制点进行通信。
 *
 * 表现:
 * Mediator模式促进松散耦合的方式是: 确保组件的交互式通过这个中心点来处理的,而不是显示的引用彼此。
 * 这种模式可以帮助我们解耦系统并提高组件可重用性。
 *
 * 现实案例:
 * 机场塔台(中介者)处理飞机的起飞和降落,因为所有通信(监听和发出通知)都是从飞机到控制台.而不是飞机和飞机之间互相通信的。
 * 中心控制系统是该系统成功的关键,而这才是中介者在软件设计中所担任的真正角色。
 *
 * 就实现而言:
 * Mediator模式本质上是Observer 模式的共享目标,它假设该系统中对象或模式之间的订阅和发布的关系被牺牲掉了,从而维护中心联络点。
 * 也可被认为是额外的或者是用于应用程序间的通知,如不同子系统之间的通讯，这些子系统本来就很复杂,且希望订阅发布模式来实现内部组件之间的解耦.
 *
 *
 *
 */


/**
 * 基本实现Mediator,暴露pubulish() 和 subscribe() 方法来使用
 */

var mediator = (function () {

  // 存储可被广播的
  var topics = {};

  // 订阅一个topic,提供一个回调函数,一旦topic被广播就执行该回调
  var subscribe = function (topic, fn) {
    if( !topics[topic]) {
      topics[topic] = [];
    }

    topics[topic].push({context:this, callback: fn});
    return this;
  };

  // 发布广播事件到程序的剩余部分
  var publish = function (topic) {
    var args, len;

    if(!topics[topic]) {
      return false;
    }

    args = Array.prototype.slice.call(arguments, 1);
    len = topics[topic].length;

    for (var i = 0; i < len; i++) {
      var subscription = topics[topic][i];
      subscription.callback.apply(subscription.context, args);
    }

    return this;
  };

  return {
    Publish : publish,
    Subscribe: subscribe,
    installTo: function (obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  };
})();


var studenA = {
  name:'xiaoming',
  age: 18
};

var studenB = {
  name: 'xiaohong',
  age: 16
};


mediator.Subscribe('morning', function () {
  console.log('----morning----');
});

mediator.installTo(studenB);
mediator.installTo(studenA);

// 注册事件
studenA.subscribe('morning',function (name) {
  if(name !== this.name){
    console.log('A说: 早上好 '+name);
  }
});

studenB.subscribe('morning',function (name) {
  if(name !== this.name){
    console.log('B说: 早上好 '+name+' 今天去哪呀?');
  }
});

studenA.publish('morning', studenA.name);

/**
 * a 和 b 实际通过 mediator 通话
 *
 */

