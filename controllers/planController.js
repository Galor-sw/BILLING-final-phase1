const {Plan} = require('../models/plan')
const plansRepo = require('../repositories/plansRepo');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey);

const serverLogger = require(`../logger`);
const logger = serverLogger.log;

module.exports = {
    getAllPlans: async (req, res) => {

        try {
            let plans = await plansRepo.getPlans();
            res.send(plans)
        } catch (err) {
            logger.error(`failed to fetch plans from DB error: ${err.message}`)
        }

    },
    purchasePlan: async (req, res) => {
        try {
            const session = await stripe.checkout.sessions.create({
                success_url: 'http://localhost:5000/message',
                cancel_url: 'http://localhost:5000/message',
                line_items: [
                    {price: req.body.id, quantity: req.body.quantity},
                ],
                mode: 'subscription',
                metadata: {
                    // we can insert here key value pairs with data we want to get whe nwebhooks arrives.
                    planId: "insert Id here"
                }
            })
            const urlCheckOut = session.url;
            res.send(urlCheckOut);
        } catch (err) {
            logger.error(`failed to make a purchase from Stripe error: ${err.message}`);
        }
    },
    getPlanByName: async (req, res) => {
        const id = await plansRepo.getPlanByName(req.params.name);
        if (id)
            res.send(id);
        else
            res.status(404).send(null);
    }
}
