window.addEventListener('load', function () {
    // 在窗体载入完毕后再绑定
    var CM = new CommentManager($('#my-comment-stage'));
    CM.init();
    // 先启用弹幕播放（之后可以停止）
    CM.start();
    // 开放 CM 对象到全局这样就可以在 console 终端里操控
    window.CM = CM;
	
	var socket = io();
    socket.on('danmu show', function (msg) {
        console.log(msg);
        var danmu = JSON.parse(msg);
        CM.send(danmu);
    });
    
    $('#btnSend').click(function(e){
        e.preventDefault();
        var danmu = {
            "text": $('textarea[name=content]').val(),
            "stime":0,
            "size": Number($("input[name=size]:checked").val()),
            "mode": Number($("input[name=mode]:checked").val()),
            "color":parseInt($("input[name=color]:checked").val(),16),
            "dur":10000
        };
        var msg = JSON.stringify(danmu);
        console.log(msg);
        socket.emit('danmu send',msg);
        $('textarea[name=content]').val('')
    });
});