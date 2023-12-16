
const { getInvalidCommandMessage, getBankData } = require('./commandFunctions');

function handleCommand(command) {
    switch (command[0]) {
        case 'bank':
            return(getBankData());
        default:
            return(getInvalidCommandMessage(command));
    }
}

module.exports = {
    handleCommand
};