
let JSBridge = function () {

    /**
     * 注册一个名为 [handler] 的处理器，并定义用于响应的处理逻辑
     */
    let _registerHandler = function (handler, callback) {
        WebViewJavascriptBridge.registerHandler(handler, callback);
    };

    /**
     * 发送消息给native端, 并定义回调函数
     */
    let _send = function (params, callback) {
        WebViewJavascriptBridge.send(params, callback);
    };

    /**
     * 调用名为 [handler] 的native端处理器，并传递参数，同时设置回调处理逻辑
     */
    let _callHandler = function (handler, params, callback) {
        WebViewJavascriptBridge.callHandler(handler, params, callback);
    };

    return {
        module: 'JSBridge',
        registerHandler: _registerHandler,
        send: _send,
        callHandler: _callHandler
    }
}();

export default JSBridge;
