import Product from '../../models/Product';

export default async (req, res) => {
  const { _id } = req.query;
  const product = await Product.findById({ _id });
  res.status(200).json(product);
};
