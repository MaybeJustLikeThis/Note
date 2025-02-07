class EventBus{
  constructor() {
    this.subscribers = {};
  }
  sub(event,callback) {
    if (!this.subscribers[event]) {
        this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  publish(event, data) {
    const callbacks = this.subscribers[event];
    if (callbacks) {
      callbacks.forEach(callback => {
            callback(data);
        });
    }
  }
}

class WeatherData {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.windspeed = 0;
  }

  setWindspeed(windspeed) {
    this.windspeed = windspeed;
    this.eventBus.publish('windspeedChanged', windspeed);
  }
}
 
class DisplayWindSpeed{
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.eventBus.sub('windspeedChanged', this.update.bind(this));
  }

  update(windSpeed) {
    console.log('风速更新为：' + windSpeed);
  }
}

const eventBus = new EventBus();

const weatherData = new WeatherData(eventBus);

const displayWindSpeed = new DisplayWindSpeed(eventBus);

weatherData.setWindspeed(10);
