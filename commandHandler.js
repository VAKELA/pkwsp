
const { getInvalidCommandMessage, getBankData } = require('./commandFunctions');
const { MessageMedia } = require('whatsapp-web.js');

const fs = require('fs');

function loadImageAsBase64(filePath) {
    try {
        // Read the image file as a buffer
        const buffer = fs.readFileSync(filePath);

        // Convert the buffer to a base64-encoded string
        const base64Image = buffer.toString('base64');

        return base64Image;
    } catch (error) {
        console.error('Error loading image:', error.message);
        return null;
    }
}

async function handleCommand(command, msg, client) {
    const chat = await msg.getChat();
    switch (command[0]) {
        case 'bank':
            const bankData = getBankData();
            // msg.reply(bankData);
            chat.sendMessage(bankData);
            msg.react('👍');
            break
        case 'face':
            const imagePath = './assets/Angry.png';
            const base64Image = loadImageAsBase64(imagePath);
            const faceTest = new MessageMedia('image/png', base64Image);
            chat.sendMessage(faceTest);
            break
        default:
            const missingData = getInvalidCommandMessage(command);
            chat.sendMessage(missingData);
    }
}

module.exports = {
    handleCommand
};