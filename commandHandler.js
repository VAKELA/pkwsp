
const { getInvalidCommandMessage, getBankData } = require('./commandFunctions');
const { getPokemonPortraitOptions } = require('./faceHandler');
const { MessageMedia } = require('whatsapp-web.js');


const fs = require('fs');
const fetch = require('node-fetch');

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

async function fetchImage(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const buffer = await response.buffer();
            const base64Image = buffer.toString('base64');
            return base64Image;
        } else {
            console.error(`Failed to fetch image. HTTP status code: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching image:', error.message);
        return null;
    }
}

function formatFileList(fileList) {
    if (fileList.length === 0) {
        return 'No options available.';
    }

    const formattedOptions = fileList.map((option, _) => `- ${option}`).join('\n');

    return `These are your face options:\n${formattedOptions}`;
}

async function handleCommand(command, msg, client) {
    const chat = await msg.getChat();
    const imagePath = './assets/Angry.png';
    const base64Image = loadImageAsBase64(imagePath);
    const imageUrl = 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/0001/Angry.png';
    const base64ImageFromURL = await fetchImage(imageUrl);
    const fetchTest = new MessageMedia('image/png', base64ImageFromURL);
    const faceTest = new MessageMedia('image/png', base64Image);
    switch (command[0]) {
        case 'bank':
            const bankData = getBankData();
            // msg.reply(bankData);
            chat.sendMessage(bankData);
            msg.react('👍');
            break
        case 'face':
            chat.sendMessage(faceTest);
            break
        case 'options':
            const options = await getPokemonPortraitOptions(command[1]);
            const formattedOptions = formatFileList(options);
            chat.sendMessage(formattedOptions);
            break
        case 'faceUrl':
            chat.sendMessage(fetchTest, {sendMediaAsSticker:true, stickerAuthor:"https://github.com/VAKELA/pkwsp", stickerName:"test :)"});
            break
        case 'stickerOld':
            chat.sendMessage(faceTest, {sendMediaAsSticker:true, stickerAuthor:"https://github.com/VAKELA/pkwsp", stickerName:"totodile :)"});
            break
        case 'sticker':
            const stickerUrl = `https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/portrait/${command[1]}/${command[2]}.png`;
            const stickerImage = await fetchImage(stickerUrl);
            const fetchSticker = new MessageMedia('image/png', stickerImage);
            chat.sendMessage(fetchSticker, {sendMediaAsSticker:true, stickerAuthor:"https://github.com/VAKELA/pkwsp", stickerName:`Pokemon ${command[1]}`});
            break
        default:
            const missingData = getInvalidCommandMessage(command);
            chat.sendMessage(missingData);
    }
}

module.exports = {
    handleCommand
};