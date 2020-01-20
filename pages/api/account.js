import User from '../../models/User';
import connectDb from '../../utils/connectDb';
import { getVerifiedUserId } from '../../utils/auth';

connectDb();

const handleGetRequest = async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('No authorization token');
  }

  try {
    // authorize and sign token
    const userId = getVerifiedUserId(req.headers.authorization);
    const user = await User.findOne({ _id: userId });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(403).send(`Invalid token ${error}`);
  }
};

const handlePutRequest = async (req, res) => {
  const { _id, role } = req.body;
  await User.findOneAndUpdate(
    { _id },
    { role },
  );
  res.status(203).send('User updated');
};

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'PUT':
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};
