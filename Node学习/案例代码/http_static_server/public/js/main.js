// 获取时间
fetch('/api/time')
  .then(res => res.json())
  .then(data => {
    document.getElementById('time').textContent = `当前时间: ${data.time}`
  })

// 获取用户信息
fetch('/api/user')
  .then(res => res.json())
  .then(data => {
    document.getElementById('user').textContent = 
      `用户信息: 姓名-${data.name}, 年龄-${data.age}`
  }) 