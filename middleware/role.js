module.exports = (admittedRoles) => {
    return (req,res,next) => {
        if(!req.user) {
            return res.status(401).json({message: 'Not authenticated'});
        }

        // Check if the user has the necessary role
        if(!admittedRoles.includes(req.user.role)) {
            return res.status(403).json({message: 'Not authorized'});
        }
        next();
    };
};