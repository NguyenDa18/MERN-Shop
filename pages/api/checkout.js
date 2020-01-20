/* eslint-disable indent */
import Stripe from 'stripe';
import uuidv4 from 'uuid/v4';
import Cart from '../../models/Cart';
import Order from '../../models/Order';
import { getVerifiedUserId } from '../../utils/auth';
import calculateCartTotal from '../../utils/calculateCartTotal';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { paymentData } = req.body;

    try {
        const userId = getVerifiedUserId(req.headers.authorization);

        // Find cart based on user id, populate it
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'products.product',
            model: 'Product',
        });

        // Calculate cart totals again from cart products
        const { cartTotal, paymentTotal } = calculateCartTotal(cart.products);

        // Get email for payment data, see if emall linked with existing Stripe customer
        const prevCustomer = await stripe.customers.list({
            email: paymentData.email,
            limit: 1,
        });
        const isExistingCustomer = prevCustomer.data.length > 0;

        // If not existing customer, create one based on email
        let newCustomer;
        if (!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentData.email,
                source: paymentData.id,
            });
        }
        const customer = (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;

        // Create charge with total, send receipt email
        const charge = await stripe.charges.create({
            currency: 'USD',
            amount: paymentTotal,
            receipt_email: paymentData.email,
            customer,
            description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
        },
        {
            // prevent double charge case
            idempotency_key: uuidv4(),
        });

        // Add order data to db
        await new Order({
            user: userId,
            email: paymentData.email,
            total: cartTotal,
            products: cart.products,
        }).save();

        // Clear products in cart
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { products: [] } },
        );

        // Send back response
        res.status(200).send('Checkout successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing charge');
    }
};
