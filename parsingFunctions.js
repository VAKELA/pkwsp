
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

function formatNumberWith4Digits(number) {
    // Use String() to convert the number to a string
    const numberString = String(number);
  
    // Calculate the number of leading zeros needed
    const leadingZerosCount = 4 - numberString.length;
  
    // Pad the number with leading zeros using String.prototype.padStart()
    const formattedNumber = numberString.padStart(4, '0');
  
    return formattedNumber;
  }

module.exports = {
    checkForForwardSlashStart,
    getCommandParametersFromString,
    getValueOrMissing,
    formatNumberWith4Digits
};