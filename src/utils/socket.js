var webSock = null
var global_callback = null
//  webSocket 连接端口
var serverPort = '8080'

//  获取当前 ip
function getWebIP() {
  let currentIP = window.location.hostname
  return currentIP
}

//  初始化 websocket
function initWebSocket() {
  //  ws 地址
  const wsUri = 'ws://' + getWebIP() + ':' + serverPort
  console.log(wsUri, 123)
  webSock = new WebSocket(wsUri)
  webSock.onmessage = e => {
    websocketOnMessage(e)
  }
  webSock.onclose = e => {
    websocketClose(e)
  }
  webSock.onopen = () => {
    websocketOpen()
  }

  //  连接错误时回调
  webSock.onerror = () => {
    console.log('websocket 连接发生错误')
    //  重新连接
  }
}

//  实际调用的方法
function sendSock(agentData, callback) {
  global_callback = callback
  if (webSock.readyState === webSock.OPEN) {
    //  若是 ws 开启状态
    websocketSend(agentData)
  } else if (webSock.readyState === webSock.CONNECTING) {
    //  如果正在开启状态，则等待 1s 后重新调用
    setTimeout(() => {
      sendSock(agentData, callback)
    }, 1000)
  } else {
    //  如果未开启，则等待 1s 后重新调用
    setTimeout(() => {
      sendSock(agentData, callback)
    }, 1000)
  }
}

//  数据接收
function websocketOnMessage(e) {
  global_callback(JSON.parse(e.data))
}

//  数据发送
function websocketSend(agentData) {
  webSock.send(JSON.stringify(agentData))
}

//  关闭
function websocketClose(e) {
  console.log(`connection closed ${e.code}`)
}

function websocketOpen(e) {
  console.log('连接成功')
}

// initWebSocket()

export {
  sendSock
}
