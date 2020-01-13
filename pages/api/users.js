import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { getVerifiedUserId } from '../../utils/auth';


export default async (req, res) => {
  try {
    const userId = getVerifiedUserId(req.headers.authorization);

    // find users not equal to current user
    const users = await User.find({ _id: { $ne: userId } });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(403).send('Please login again');
  }
};
