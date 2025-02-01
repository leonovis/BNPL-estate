const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        //find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({message: 'Invalid user credentials'});

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid user credentials'});

        //store user session( using express middleware?
        req.session.user = { userId: user._id, email: user.email };

        res.json({ message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.register = async (req, res) => {
    try { 
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};