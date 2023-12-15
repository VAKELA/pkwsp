const qrcode = require('qrcode-terminal');
const Loading = require('loading-cli');
const color = require('colors-cli/toxic');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    // proxyAuthentication: { username: 'username', password: 'password' },
});

client.initialize();

const load = new Loading({
    text: 'Loading...'.blue,
  });

client.on('loading_screen', (percent, message) => {
    if(percent == 0){
        load.start();
    }
    if(percent == 100){
        load.succeed("finished loading")
    }
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.on('message', async msg => {
	console.log("received:", msg.body);
});

client.initialize();