const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

const server = https.createServer({
    cert: fs.readFileSync('/etc/letsencrypt/live/jmy.li/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/jmy.li/privkey.pem')
});

let conns = 0;
let wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    let connId = conns++;
    console.log('[*] new connection with id ' + connId);
    ws.on('message', message => {
        let parsed = null;
        try{
            parsed = JSON.parse(message);
        } catch(err){
            console.log('id: ' + connId + ' message: ' + message);
            return;
        }
        if (!(parsed instanceof Array)) parsed = [parsed];
        console.log.apply(console, ['id: ' + connId, ...parsed]);
    });
    ws.on('close', () => {console.log('[*] closed connection with id ' + connId)});
});

const port = 1337;
server.listen(port);
console.log('wslog now listening on port ' + port);
