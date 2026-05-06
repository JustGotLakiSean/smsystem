const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization // get token

        if(!authHeader) {
            return res.status(401).json({ message: "Unauthorize access." })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()
        
    } catch (error){
        res.status(401).json({ message: "Unauthorized. Invalid or expired token." })
    }
}

const requireRole = (role) => {
    return (req, res, next) => {
        if(req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden. Access denied." })
        }
        
        next()

    }
}

module.exports = { authMiddleware, requireRole }