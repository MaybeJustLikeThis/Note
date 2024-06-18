//第一种方案:使用 Promise 和 async/await 实现


async function trafficLight() {
  async function printLight(color, delay) {
    console.log(color);
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  while (true) {
    await printLight('红灯', 3000);
    await printLight('绿灯', 2000);
    await printLight('黄灯', 1000);
  }
}

trafficLight();


//这个方案的思路如下:

// 定义一个 printLight 函数,接受颜色和延迟时间作为参数,打印颜色并使用 setTimeout 实现延迟。
// 定义一个 trafficLight 函数,使用 async/await 来实现红灯、绿灯、黄灯的交错打印。
// 在 trafficLight 函数中,使用一个无限循环来不断重复这个过程。
// 第二种方案:使用 setInterval 和 clearInterval 实现

function trafficLight() {
  let currentColor = 'red';
  const intervalId = setInterval(() => {
    switch (currentColor) {
      case 'red':
        console.log('红灯');
        currentColor = 'green';
        break;
      case 'green':
        console.log('绿灯');
        currentColor = 'yellow';
        break;
      case 'yellow':
        console.log('黄灯');
        currentColor = 'red';
        break;
    }
  }, 1000);
}

trafficLight();