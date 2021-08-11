const axios = require('axios');

exports.callAVSB2BVersioned = async (userId) => {
    try {
        const results = {
            resultCode: 'OK',
            resultObj: {
                userId: userId,
                firstname: 'TestFirst',
                lastname: 'TestLast'
            }
        };

        return results;
    } catch (error) {
        throw new Error(error);
    }
}