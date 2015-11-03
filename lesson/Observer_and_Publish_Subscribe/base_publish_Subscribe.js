/**
 ************************************************
 * Publish/Subscribe (订阅发布)模式
 * --------------------
 ************************************************
 * Publish/Subscribe 非常适用于JavaScript生态系统,主要在于JavaScript核心ECMAScript实现是由事件驱动。
 *
 * 实现:
 * 流行的JavaScript库中(eg: JQuery,Dojo),拥有一些程序可以很容易的实现订阅/发布
 * 纯JavaScript
 *
 * 实现相关连接:
 * - Ben Alman     | jQuery扩展 | https://gist.github.com/cowboy/661855
 * - Peter Higgins | jQuery扩展 | https://github.com/phiggins42/bloody-jquery-plugins/blob/master/pubsub.js
 * - AppendTo      | 纯Js扩展   | https://github.com/mikehostetler/amplify/blob/master/src/core.js
 * - Ben Truyman   | jQuery扩展 | https://gist.github.com/826794
 *
 */

/**
 * 参照相关文档和要素案例将展示 Publish/Subscribe实现
 */


var pubsub = {};

(function (q) {

  /**
   * 初始化私有变量
   * topics 订阅事件集合
   * topics = {
   *   "eventName1": [ {
   *                     "token":"订阅者id",
   *                     "fun": function 订阅触发函数
   *                    },
   *                    .....
   *                 ],
   *    "otherNames": .....
   *           }
   * subUid 订阅者的唯一id
   */
  var topics = {},
    subUid = -1;

  /**
   * 订阅事件, 返回订阅者唯一id
   * @param  {[str]} topic 订阅标题
   * @param  {[fun]} fun   订阅事件触发函数
   * @return {[str]} token 订阅者唯一id
   */
  q.subscribe = function (topic, fun) {
    if(!topics[topic]) {
      topics[topic] = [];
    }

    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      fun:fun
    });

    return token;
  };



  // 发布、广播事件
  q.publish = function (topic, args) {
    if(!topics[topic]) {
      return false;
    }

    // 所有该事件订阅者
    var subscribes = topics[topic],
        len = subscribes.length;

    // 循环执行所有订阅函数
    while(len--) {
      subscribes[len].fun(args);
    }

    return this;

  };

  // 取消订阅
  q.unsubscribe = function (topic, token) {
    // 只需遍历单个元素
    var singleTopic = true;
    // 省参数
    if(token === undefined) {
      token = topic;
      singleTopic = false;
    }

    if(singleTopic) {
      // 标题相关订阅者不存在
      if(!topics[topic]) {
        return false;
      }

      doRemove(topics[topic], token);

    }else{
      for(var m in topics) {
        doRemove(topics[m], token);
      }

    }

    function doRemove (topicArr, token) {
      var i = 0,
      len = (topicArr || []).length;

      for(;i< len;i++) {
        if(topicArr[i].token === token) {
          topicArr.splice(i,1);
          return;
        }
      }
    }
  };

})(pubsub);


/**
 * 应用场景
 * 广播: 分别订阅广播数目,广播内容
 */

var message_count = 0;

// 订阅更新广播数目
var subA = pubsub.subscribe('inbox/newMessage', function (data) {
    console.log('subA 广播通知:'+data);
});
var subB = pubsub.subscribe('inbox/newMessage', function (data) {
    message_count++;
    console.log('subB 当前信息数目:'+message_count);
});

var subC = pubsub.subscribe('inbox/newMessage', function (data) {
    console.log('subC 我只参与第一次通知');
});

pubsub.publish('inbox/newMessage', 'new message first');

pubsub.unsubscribe(subC);

pubsub.publish('inbox/newMessage', 'send message again');

