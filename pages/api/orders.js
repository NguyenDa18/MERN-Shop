import jwt from 'jsonwebtoken';
import Order from '../../models/Order';
import connectDb from '../../utils/connectDb';
import { getVerifiedUserId } from '../../utils/auth';

connectDb();

export default async (req, res) => {
  try {
    const userId = getVerifiedUserId(req.headers.authorization);
    const orders = await Order.find({ user: userId }).sort({ createdAt: 'desc' }).populate({
      path: 'products.product',
      model: 'Product',
    });
    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
  }
};
