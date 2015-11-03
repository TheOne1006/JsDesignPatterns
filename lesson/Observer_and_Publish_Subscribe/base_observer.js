/**
 ************************************************
 * Observer (观察者)模式
 * --------------------
 ************************************************
 * "四人组"提供Observer的定义:
 * 1. 一个或多个观察者对目标的状态感兴趣,它们(观察者)通过将自己依附在目标对象上以便注册所感兴趣的内容。
 * 2. 目标状态发生改变并且观察者可能对这些改变感兴趣,就会发送一个通知消息,调用每个观察者的更新方法。
 * 3. 当观察者不在对目标状态感兴趣了,它们可以简单的将自己从中分离
 *
 * 观察者模式组件,与各自的分工:
 * - Subject(目标)                  维护一系列观察者,方便添加和删除观察者
 * - Observer(观察者)               为那些在目标状态发生改变时需要获得通知的对象提供一个统一的更新接口。
 * - ConcreteSubject(具体目标)      状态发生改变时,向Observer发出通知,存储ConreteObserver的状态
 * - ConcreteObserver(具体观察者)   存储一个指向ConcreteSubject的引用,实现Observer的更新接口,以使自身状态与目标状态保持一致
 *
 */


// 1. 模拟一个__目标__可能拥的一些列依赖 Observer;

// Subject目标原型
function ObserverList () {
  this.ObserverList = [];
}

// 扩展添加和删除观察者方法
ObserverList.prototype.Add = function(obj) {
  return this.ObserverList.push(obj);
};

ObserverList.prototype.Empty = function() {
  this.ObserverList = [];
};

ObserverList.prototype.Count = function() {
  return this.ObserverList.length;
};

ObserverList.prototype.Get = function(index) {
  if(index > -1 && index < this.ObserverList.length) {
    return this.ObserverList[index];
  }
};

ObserverList.prototype.Insert = function(obj, index) {
  var pointer = -1;
  if(index === 0) {
    this.ObserverList.unshift(obj);
    pointer = index;
  } else if(index === this.ObserverList.length) {
    this.ObserverList.push(obj);
    pointer = index;
  }

  return pointer;
};

ObserverList.prototype.IndexOf = function(obj, startIndex) {
  var i = startIndex, pointer = -1;

  while (i < this.ObserverList.length) {
    if(this.ObserverList[i] === obj) {
      pointer = i;
    }
    i++;
  }

  return pointer;
};

ObserverList.prototype.RemoveIndexAt = function (index) {
  if(index === 0) {
    this.ObserverList.shift();
  } else if(index === this.ObserverList.length -1) {
    this.ObserverList.pop();
  }
};

// 扩展对象
function extend (obj, extension) {
  for(var key in obj) {
    extension[key] = obj[key];
  }
}

// 模拟目标对象在观察者列表上的添加删除和通知观察者的能力
function Subject () {
  this.observers = new ObserverList();
}

// 添加观察者的能力
Subject.prototype.AddObserver = function (observer) {
  this.observers.Add(observer);
};

// 删除观察者的能力
Subject.prototype.RemoveObserver = function (observer) {
  this.observers.RemoveIndexAt(this.observer.IndexOf(observer, 0));
};

// 通知观察者的能力
Subject.prototype.Notify = function(context) {
  var observerCount = this.observers.Count();
  console.log(context);
  // 遍历观察者列表,执行Update行为
  for (var i = 0; i < observerCount; i++) {
    this.observers.Get(i).Update(context);
  }
};

// 定义框架创造的Observer

function Observer (name, age) {
  this.name = name;
  this.age = age;
}

Observer.prototype.sayNowAge = function() {
  console.log(this.name +' say: I am '+ this.age);
};

// 假定更新为年龄+1 , 并说出自己当前的年龄
Observer.prototype.Update = function () {
  this.age = (this.age+1) || 1;
  console.log(' now ');
  this.sayNowAge();
};

// 具体的 Subject 目标
var concreteSubject = new Subject();

// 具体观察者
var xiaoming = new Observer('xiaoming', 17);
var hanmei = new Observer('hanmei', 16);

// 添加到观察者列表
concreteSubject.AddObserver(xiaoming);
concreteSubject.AddObserver(hanmei);

// 事件触发,一年过去了
concreteSubject.Notify('一年过去了,大家都长了一岁');

