import mongoose from 'mongoose';
import Cart from '../../models/Cart';
import connectDb from '../../utils/connectDb';
import { getVerifiedUserId } from '../../utils/auth';

const { ObjectId } = mongoose.Types;

connectDb();

const handleGetRequest = async (req, res) => {
  if (!('authorization' in req.headers)) {
    res.status(401).send('No authorization token');
  }

  try {
    const userId = getVerifiedUserId(req.headers.authorization);
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product',
    });
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(`${error}`);
    res.status(403).send('GET failed, Please login again');
  }
};

const handlePutRequest = async (req, res) => {
  const { quantity, productId } = req.body;
  if (!('authorization' in req.headers)) {
    res.status(401).send('No authorization token');
  }
  try {
    const userId = getVerifiedUserId(req.headers.authorization);

    // Get user cart based on userId
    const cart = await Cart.findOne({ user: userId });

    // Check if product already exists in cart
    const productExists = cart.products.some((doc) => ObjectId(productId).equals(doc.product));

    // If so, incr quantity by amount given in request
    if (productExists) {
      await Cart.findOneAndUpdate({ _id: cart._id, 'products.product': productId },
        { $inc: { 'products.$.quantity': quantity } },
        { new: true });
    } else {
      // If not, add new product with given quantity
      const newProduct = { quantity, product: productId };
      await Cart.findOneAndUpdate({ _id: cart._id },
        { $addToSet: { products: newProduct } });
    }
    res.status(200).send('Cart updated');
  } catch (error) {
    console.error(`${error}`);
    res.status(403).send('PUT failed, Please login again');
  }
};

const handleDeleteRequest = async (req, res) => {
  const { productId } = req.query;
  if (!('authorization' in req.headers)) {
    res.status(401).send('No authorization token');
  }

  try {
    const userId = getVerifiedUserId(req.headers.authorization);
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId } } },
      { new: true },
    ).populate({
      path: 'products.product',
      model: 'Product',
    });
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(`${error}`);
    res.status(403).send('DELETE failed, Please login again');
  }
};

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'PUT':
      await handlePutRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }
};
