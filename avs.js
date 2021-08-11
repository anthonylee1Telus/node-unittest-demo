const axios = require('axios');

exports.callAVSB2BVersioned = async (userId) => {
    try {
        const re = await axios.get('https://api.publicapis.org/entries');

        return {
            resultCode: re.statusText,
            resultObj: {...(re.data.entries[0]), userId: userId}
            
        }

    } catch (error) {
        throw new Error(error);
    }
}