import mongoose from 'mongoose';
import shortid from 'shortid';

const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    default: shortid.generate,
  },
  description: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
});

// check if model exists or use existing one
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
// export default mongoose.model('Product', ProductSchema);
