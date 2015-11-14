/**
 * mediator 实现案例
 * http://thejacklawson.com/Mediator.js/mediator.html
 */


/**
 *  首先实现订阅者的概念,可以考虑一个Mediator 的topic注册实例
 */

// 将上下文传递给订阅者，默认上下文是

/**
 * 为订阅者生成guid,以便以后引用
 */
var guid = 0;
function guidGeneraor () {
  guid++;
  return 'id'+guid;
}

// 订阅者构造函数
function Subscriber (fn, options, context) {
  if(!(this instanceof Subscriber)) {
    return new Subscriber(fn, options, context);
  }

  this.id = guidGeneraor();
  this.fn = fn;
  this.options = options;
  this.context = context;
  this.topic = null;
}


/**
 * Mediator 中topic 持有一组回调数组和子topic列表，一旦Mediator.Publish 方法在Mediator 实例调用时，这些回调数组都会被触发。
 * 模拟 Topic
 */
function Topic ( namespace ) {
  if(!(this instanceof Topic)) {
    return new Topic(namespace);
  }
  this.namespace = namespace;
  this._callbacks = [];
  this._topics = {};
  this.stopped = false;
}


/**
 * 定义topic的prototype,包括添加订阅者和获取订阅者的方式
 */
Topic.prototype = {
  AddSubscribe : function  (fn, options, context) {
    var callback = new Subscriber(fn , options, context);

    this._callbacks.push(callback);
    callback.topic = this;
    return callback;
  },
  /**
   * 暂停事件的扩散
   */
  StopPropation: function () {
    this.stopped = true;
  },
  /**
   * 通过guid获取订阅者
   */
  GetSubscribe: function  (indentifier) {
    var callbackLen = this._callbacks.length,
      i =0;

    for (;i< callbackLen;i++) {
      if(this._callbacks[i].id == indentifier) {
        return this._callbacks[i];
      }
    }
  },
  // 添加新topic
  AddTopic: function (topic) {
    // 递归？
    this._topics[topic] = new Topic ((this.namespace ? this.namespace + ":":'')+topic);
  },
  HasTopic: function (topic) {
    return this._topics.hasOwnProperty( topic );
  },
  ReturnTopic: function (topic) {
    return this._topics[topic];
  },
  RemoveTopic: function () {

  },
  /**
   * 核心代码
   * 处理完自己的回调,再向订阅者发布Publish
   * 一个colleague 通过 Mediator 将信息传递给需要的 colleague
   */
  Publish: function (data) {
    var callbackLen =  this._callbacks.length,
      i = 0,
      tmpCallback;

    for(;i < callbackLen; i++) {
      tmpCallback = this._callbacks[i];

      tmpCallback.fn.apply( tmpCallback.context, data);
    }

    var x;

    // 通过_topics 扩散出去
    for(x in this._topics) {
      if( !this.stopped ) {
        // 属于对象自己的
        if(this._topics.hasOwnProperty(x)) {
          this._topics[x].Publish(data);
        }
      }
    }

    this.stopped = true;

  }
};




/**
 * Mediator 实例，完成事件在topic 上的注册和移除
 */
function Mediator () {
  if( !(this instanceof Mediator)) {
    return new Mediator();
  }
  this._topics = new Topic("");
}

/**
 * 让Mediator 支持 inbox:message:read:new 等主题topic 命名空间
 */
Mediator.prototype = {
  GetTopic : function (namespace) {

  }
};


/**
 * 未完待续......
 */

/**
 ************************************************
 * Mediator (中介者) 与Observer(观察者)
 * --------------------
 ************************************************
 * Mediator 与 Observer 确实存在重叠,
 * 通信方式决定使用 Mediator(中介者) 获得 Observer(观察者)。
 *
 * 差异:
 * Mediator(中介者模式)限制对象严格通过Mediator 通信
 * (Observer)观察者模式中一个目标的观察者,有时候也是另一观察者的目标
 *
 * 相同:
 * 两者都是行为设计模式,都能促进松散的耦合
 *
 */



 /**
  ************************************************
  * Mediator (中介者) 与 Facade(外观模式)
  * --------------------
  ************************************************
  * facade 与 Mediator 也非常相似.都能够抽象出现有的模块功能。
  *
  * 差异:
  * Mediator 模块在被其他模块显示引用的地方汇集这些模块之间的通信.某种意义上来讲是**多方向的**。
  * Facade 模式 仅是为了模块或系统定义了一个比较简单的接口,而没有添加额外的功能。
  * 系统的其他模块不会直接关系外观，所以可以被视为**单向的**.
  *
  */
