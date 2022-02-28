const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const calculateToken = (id, level, maxAge) => {
    return jwt.sign({ user_id: id, user_level: level }, process.env.PRIVATE_KEY, { expiresIn: maxAge });
}

module.exports = {
    calculateToken,
}