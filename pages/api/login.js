import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import connectDb from '../../utils/connectDb';
import User from '../../models/User';

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!isEmail(email)) return res.status(422).send('Please use a valid email.');
    if (!isLength(password, { min: 6 })) return res.status(422).send('Password must be at least 6 characters');

    // 1. Check to see user exists
    const user = await User.findOne({ email }).select('+password');

    // 2. If not return error
    if (!user) {
      return res.status(404).send('No user exists with that email');
    }

    // 3. Check if auth creds match
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // 4. If success generate token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      // 5. Send token to client
      res.status(200).json(token);
    } else {
      res.status(401).send('Passwords do not match');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in user');
  }
};
