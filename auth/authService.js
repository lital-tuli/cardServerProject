const { verifyToken } = require("./providers/jwt");

const tokenGenerator = "jwt";
const auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const tokenFromClient = req.header("x-auth-token");
            if (!tokenFromClient) {
                throw new Error("Authentication error: Please Login.");
            }
            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {
                throw new Error("Authentication error: Invalid token.");
            }
            req.user = userInfo;
            return next();
        } catch (err) {
            return res.status(401).send(err.message);
        }
    }
    return res.status(500).send("Internal Server error.");
};


module.exports = auth;