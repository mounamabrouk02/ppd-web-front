const jwt = require("jsonwebtoken");
const User = require("../modules/User");
const {Roles} = require("../constants/Roles");

const authMiddleware = (role = Roles.USER) => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        let verified = verifyToken(String(token).substring("Bearer ".length));
        if (!verified) {
            return res.status(401).json({
                message: "You are not authorized"
            });
        }
        const {
            id,
        } = verified
        const user = await User.findById(id)
        if (!user)
            return res.status(401).json({
                message: "You are not authorized"
            });
        if (user.role !== role) {
            return res.status(403).json({
                message: "You don't have permissions to access this resource"
            })
        }
        req.user = user;
        return next()
    }
}

function verifyToken(token) {
    if (token == null) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET)

    } catch (ex) {
        return null;
    }
}

module.exports = authMiddleware;