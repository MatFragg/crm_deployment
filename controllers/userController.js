const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.newUser = async(req,res) => {
    // Read the User Data 

    const user = new Users(req.body);
    user.password = await bcrypt.hash(req.body.password,12);

    try {
        await user.save();
        res.json({message: 'User created successfully'});
    } catch (error) {
        console.log(error)
        res.json({message: 'There was an error'})
    }
}

exports.authUser = async(req,res,next) => {
    // Search for the User
    const {email, password} = req.body;
    const user = await Users.findOne({email: req.body.email});
    if(!user) {
        // User does not exist
        await res.status(401).json({message: 'User does not exist'});
        next();
    } else {
        // User exists, verify password
        if(!bcrypt.compareSync(password, user.password)) {
            await res.status(401).json({message: 'Incorrect Password'});
            next();
        } else {
            // Correct Password, sign the token
            const token = jwt.sign({
                email: user.email,
                name: user.name,
                _id : user._id,
                role: user.role
            }, 'SECRETKEY', {expiresIn: '1h'});

            res.json({token});
        }
    }
}
exports.changePassword = async(req,res) => {
    const { email, password, newPassword } = req.body;
    if (!newPassword) {
        return res.status(400).json({ message: 'New password is required' });
    }

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'There was an error' });
    }
}