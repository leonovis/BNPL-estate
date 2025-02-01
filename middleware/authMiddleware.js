exports.authenticate = async (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: "Unauthorized access, please log in existing user" });
    }
    next();
};

