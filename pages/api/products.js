import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const { page, size, searchQuery } = req.query;
  // Convert query strings to numbers
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products;
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find().skip(skips).limit(pageSize);
  }

  // Search Page
  if (searchQuery) {
    products = await Product.find({
      name: { $regex: searchQuery, $options: 'i' },
    });
  }
  res.status(200).json({ products, totalPages });
};
