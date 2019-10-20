import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate
    if (!isLength(name, { min: 3, max: 15 })) {
      return res.status(422).send('Name must be 3-15 characters long');
    }
    if (!isLength(password, { min: 6 })) {
      return res.status(422).send('Password must be at least 6 characters');
    }
    if (!isEmail(email)) {
      return res.status(422).send('Please use a valid email.');
    }

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    // 2. If not, hash pwd
    const hash = await bcrypt.hash(password, 10);

    // 3. Create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();

    // 4. Create cart for new user
    await new Cart({ user: newUser._id }).save();

    // 5. Create token for new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 6. Send back token
    res.status(201).json(token);
  } catch (error) {
    res.status(500).send('Error signup user. Try again later.');
  }
};
