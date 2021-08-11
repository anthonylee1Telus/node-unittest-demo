const avs = require('../../avs');

module.exports.execute = async (req, res) => {
    try {
        const results = await avs.callAVSB2BVersioned(req.params.id);
        if (results && results.resultCode === 'OK') {
            res.locals.userinfo = results.resultObj;
        }
        return results;

    } catch (error) {
        throw new Error(error);
    }
};