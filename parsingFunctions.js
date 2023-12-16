
function getValueOrMissing(value) {
    return value !== undefined && value !== '' ? value : 'Missing Data';
}

function checkForForwardSlashStart(inputString) {
    return inputString.startsWith('/');
}

function getCommandParametersFromString(inputString) {
    const noSlashString = inputString.slice(1).trim();
    const subStrings = noSlashString.split(' ');
    return subStrings;
}

module.exports = {
    checkForForwardSlashStart,
    getCommandParametersFromString,
    getValueOrMissing
};