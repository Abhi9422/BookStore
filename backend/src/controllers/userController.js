import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';
import nodemailer from 'nodemailer';

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate email verification token
    const emailToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send verification email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      port: 465,
      auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from:"abhianarase9422@gmail.com",
      to: email,
      subject: 'Verify your email',
      html: `<p>Click <a href="${"http://localhost:4000/api/users"}/verify-email?token=${emailToken}">here</a> to verify your email.</p>`
    };

    transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.emailVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token as Bearer token in the response
    res.status(200).json({ token: `Bearer ${token}`, message: 'Logged in successfully' , user : { id: user._id, name: user.name, email: user.email , role: user.role} });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const protectedRoute = async(req, res) => {
  res.json({ message: 'This is protected data', user: req.user });
}


export { registerUser, loginUser  , protectedRoute };
