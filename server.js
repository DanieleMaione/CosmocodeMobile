const express = require('express');
const app = express();
const {Stripe} = require('stripe');

const stripe = new Stripe(
  'sk_test_51MZGVVGVqBE14xrHR87JN5sHEDPcpgJ7h8GzVhZX3RGxuQ7MLNcpVVgXBnfoyxchV2BfjTb8GcZok6hrTWhsOBdo00BdGvLfb6',
  {
    apiVersion: '2020-08-27',
    typescript: true,
  },
);

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 3000,
    currency: 'usd',
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3000, () => console.log('Server up'));
