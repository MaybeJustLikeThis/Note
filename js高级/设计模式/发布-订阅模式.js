class EventBus {
    constructor() {
        // 存储事件和回调的对象
        this.events = {};
    }

    // 订阅事件
    on(event, fn) {
        // 如果事件不存在则创建一个数组
        if (!this.events[event]) {
            this.events[event] = [];
        }
        // 添加回调函数
        this.events[event].push(fn);
    }

    // 触发事件
    emit(event, data) {
        // 获取该事件的所有回调
        const callbacks = this.events[event];
        if (callbacks) {
            callbacks.forEach(fn => fn(data));
        }
    }

    // 取消订阅
    off(event, fn) {
        const callbacks = this.events[event];
        if (callbacks) {
            // 如果提供了具体的回调函数，只删除这个回调
            if (fn) {
                const index = callbacks.indexOf(fn);
                if (index !== -1) {
                    callbacks.splice(index, 1);
                }
            } else {
                // 如果没提供回调函数，删除整个事件
                delete this.events[event];
            }
        }
    }
}

// 使用示例
const bus = new EventBus();

// 订阅事件
const handler = (data) => {
    console.log('收到消息：', data);
};
bus.on('message', handler);

// 发送消息
bus.emit('message', 'Hello World');  // 输出：收到消息：Hello World

// 取消订阅
bus.off('message', handler);

// 再次发送消息
bus.emit('message', 'Hello Again');  // 没有输出，因为已经取消订阅
