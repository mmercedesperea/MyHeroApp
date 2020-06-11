/**
 * Function to check if you are an administrator
 * @param {object} req Element with the user info
 * @return {any} res if the user is not admin else next
 */
exports.isAdmin = function (req, res, next) {
    if (req.user.admin != 1) {
        return res.status(200).send({ message: 'You are not admin' })
    }
    next();
}