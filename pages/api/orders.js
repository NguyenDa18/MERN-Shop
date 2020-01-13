import jwt from 'jsonwebtoken';
import Order from '../../models/Order';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  try {
    const JSONres = JSON.parse(req.headers.authorization);
    const { userId } = jwt.verify(JSONres.data, process.env.JWT_SECRET);
    const orders = await Order.find({ user: userId }).sort({ createdAt: 'descending' }).populate({
      path: 'products.product',
      model: 'Product',
    });
    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
  }
};
