/**
 ************************************************
 * Facade (外观)模式
 * --------------------
 ************************************************
 * 结构型设计模式
 *
 * 来源:
 * 当创建外观是,向外界展示的外表可能掩盖了一个非常不同的现实。
 *
 * 1. Facade 模式更大的代码体 提供了一个方便的高层次接口，能够隐藏其底层的真实复杂性。
 * 2. 可以理解成为简化API给其他开发人员, 可以提高可用性
 *
 *
 * Facade 是中结构模式,在jQuery中经常可见,尽管实现需要广泛行为的方法，但却只有一个"外观" 给公众使用。
 * 这使我们可以直接与Facade 交互,而不是和幕后的子系统交互.如`$()` ,`css()`
 * 我们使用Facade:一种简单的公有接口，我们不用手动在jQuery核心中调用内部方法以便实现某行为,也避免了手动与DOM Api操作并维护状态变量的需要。
 *
 * jQuery 核心方法是中间层, DOM API 才是更底层的,外观模式可以使得jQuery 容易使用。
 *
 * Facade能够简化类的接口,也能将这个类从使用它的代码中解耦.
 * 优点: 易于使用和实现模式时占用空间小
 *
 *
 */



/**
 * 案例1 浏览器监听
 * 使用Facade 简化用于浏览器事件的监听
 */
var addMyEvent = function (el ,ev , fn) {
  if( el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if( el.atachEvent) {
    el.atachEvent("on"+ ev, fn);
  }else {
    el["on"+ev] = fn;
  }
};


/**
 * 案例2 Facade也可与其他模式集成
 *
 */
var module = (function () {
  var _private = {
    i: 5,
    get: function () {
      return 'current value:'+ this.i;
    },
    set :function (val) {
      this.i = val;
    },
    run: function () {
      return 'running';
    }

  };

  return {
    facade: function (arg) {
      if(arg && arg.val){
        _private.set(arg.val);
      }

      return _private.get();

    }
  };
})();

console.log(module.facade({val:'6'}));

/**
 * facade 让我们不需要关注实现细节，更容易使用
 */






