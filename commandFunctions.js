const { getValueOrMissing } = require('./parsingFunctions');
const { BANK_ACCOUNT_DETAILS } = require('./consts');

function getBankData() {
    if (typeof BANK_ACCOUNT_DETAILS !== 'object') {
        return 'Bank details are missing';
    }

    const accountName = getValueOrMissing(BANK_ACCOUNT_DETAILS.ACCOUNT_NAME);
    const email = getValueOrMissing(BANK_ACCOUNT_DETAILS.EMAIL);
    const rut = getValueOrMissing(BANK_ACCOUNT_DETAILS.RUT);
    const accountNumber = getValueOrMissing(BANK_ACCOUNT_DETAILS.ACCOUNT_NUMBER);
    const bankName = getValueOrMissing(BANK_ACCOUNT_DETAILS.BANK_NAME);

    const formattedData = `Datos:
Nombre : ${accountName}
mail: ${email}
rut: ${rut}
Numero de cuenta: ${accountNumber}
Banco: ${bankName}`;

    return formattedData;
}

function getInvalidCommandMessage(command) {
    return(`Unknown command: ${command}`);
}


module.exports = {
    getBankData,
    getInvalidCommandMessage
};