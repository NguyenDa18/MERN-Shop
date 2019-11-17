import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    res.status(401).send('No authorization token');
  }

  try {
    const JSONres = JSON.parse(req.headers.authorization);
    const { userId } = jwt.verify(JSONres.data, process.env.JWT_SECRET);
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    });
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(`${error}`);
  }
};
