const getUserInfo = require('./getUserInfo');

module.exports.run = (req, res, next) => {
    return getUserInfo.execute(req, res)
        .then((resp) => {
            res.locals.userInfoCheck = resp.resultCode === 'OK' ? 'Y' : 'N';
            return res;
        })
        .catch((err) => {
            next(err);
        })
};