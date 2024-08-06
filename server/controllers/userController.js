const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Secret key for signing JWTs (store this in an environment variable in production)
const JWT_SECRET = 'mynameischeema123#$OUOT&DDCGHKjfjgjRT@#%!#^T$&E%XFHXFHRDFHCHERY#^%$RTHFHXDRHERYS%&*^S%$UFTURD'; // Change this to a secure, private key

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate JWT

      const userPayload = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(
        { user: userPayload },
        JWT_SECRET,
        { expiresIn: '1h' } // Token expiration time
      );

      res.status(200).json({
        success: true,
        token // Send token in response
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { loginUser };
