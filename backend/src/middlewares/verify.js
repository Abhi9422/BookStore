import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';

const verifyEmailMiddleware = async (req, res, next) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    if (user.emailVerified) {
      return res.status(409).json({ message: 'Email already verified' });
    }

    user.emailVerified = true;
    await user.save();

    const h = "<h1>Email verified, Please login</h1>";
    res.status(200).send(h);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { verifyEmailMiddleware };
