class EventBus {
  constructor() {
    this.subscribers = {}; // 存储订阅者（回调函数）的对象，键为事件名称，值为回调函数数组
  }

  // 订阅一个事件，当该事件被发布时，会调用提供的回调函数
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = []; // 如果该事件还没有订阅者，则初始化一个空数组
    }
    this.subscribers[event].push(callback); // 将回调函数添加到该事件的订阅者列表中
  }

  // 发布一个事件，并传递数据给所有订阅了该事件的回调函数
  publish(event, data) {
    const callbacks = this.subscribers[event]; // 获取该事件的所有订阅者
    if (callbacks) {
      callbacks.forEach((callback) => callback(data)); // 遍历订阅者列表，并调用每个回调函数，传递发布的数据
    }
  }
}

// 天气数据类，负责存储天气数据并通过事件总线发布数据变化
class WeatherData {
  constructor(eventBus) {
    this.eventBus = eventBus; // 注入事件总线实例
    this.temperature = 0; // 初始化温度
    this.humidity = 0; // 初始化湿度
    this.windSpeed = 0; // 初始化风速
  }

  // 设置新的天气数据，并通过事件总线发布'measurementsChanged'事件
  setMeasurements(temperature, humidity, windSpeed) {
    this.temperature = temperature; // 更新温度
    this.humidity = humidity; // 更新湿度
    this.windSpeed = windSpeed; // 更新风速
    this.eventBus.publish("measurementsChanged", {
      temperature,
      humidity,
      windSpeed,
    }); // 发布数据变化事件
  }
}

// 温度显示类，订阅了'measurementsChanged'事件，用于更新和显示温度
class TemperatureDisplay {
  constructor(eventBus) {
    this.eventBus = eventBus; // 注入事件总线实例
    // 使用bind确保回调函数中的this指向当前实例
    this.eventBus.subscribe("measurementsChanged", this.update.bind(this));
  }

  // 当接收到'measurementsChanged'事件时，更新并显示温度
  update(data) {
    console.log(`Temperature: ${data.temperature}°C`); // 显示温度
    this.display(); // 调用display方法
  }

  // 显示方法，用于在子类中实现具体的显示逻辑
  display() {
    // 实现具体的显示逻辑
    console.log("Displaying temperature...");
  }
}

// 湿度显示类和风速显示类与温度显示类类似，但分别显示湿度和风速
// ...（HumidityDisplay 和 WindSpeedDisplay 类的代码与 TemperatureDisplay 类似，只是更新和显示的信息不同）

// 创建事件总线实例
const eventBus = new EventBus();

// 创建天气数据源实例，并注入事件总线
const weatherData = new WeatherData(eventBus);

// 创建各种显示设备实例，并注入事件总线以订阅天气数据变化
const temperatureDisplay = new TemperatureDisplay(eventBus);
// const humidityDisplay = new HumidityDisplay(eventBus);
// const windSpeedDisplay = new WindSpeedDisplay(eventBus);

// 更新天气数据，并通过事件总线通知所有订阅者
weatherData.setMeasurements(25, 60, 5); // 温度 25°C, 湿度 60%, 风速 5 m/s
