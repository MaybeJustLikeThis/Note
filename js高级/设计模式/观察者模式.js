//定义发布者类
class Publisher {
  constructor() {
    this.observers = [];
    console.log("发布者类");
    }
    
    add(observer) {
    this.observers.push(observer);
    console.log("添加观察者");
    }
    
    remove(observer) {
        this.observers = this.observers.filter(item => item !== observer);
        console.log("移除观察者");
    }

    notify() {
        this.observers.forEach(observer => observer.update());
        console.log("通知观察者");
    }


}

class Observer {
    constructor(name) {
        this.name = name;
    }
    update() {
        console.log(`${this.name}收到通知`);
    }
}

const publisher = new Publisher();
const observer1 = new Observer("观察者1");
const observer2 = new Observer("观察者2");

publisher.add(observer1);
publisher.add(observer2);
publisher.notify("hello,world");

