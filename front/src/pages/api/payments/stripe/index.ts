const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getQueryStock } from '@/features/woocommerce/cart/utils/cart.utils';
import { stripeConvertionAmount } from '@/features/woocommerce/checkout/service/payment/stripe/utils/stripe.utlis';
import { checkTotalFromBackWC, sendNotesOrderWoo, validateOrderWoo } from '@/features/woocommerce/services/order/order.utils';
import { sendNotesOrderFromBack, validateOrderFromBack } from '@/features/woocommerce/services/order/orderback.utils';
import { NextApiRequest, NextApiResponse } from 'next';

const secretKeyWoo : any = process.env.WC_PRIVATE_KEY;
const publickeyWoo: any = process.env.NEXT_PUBLIC_WC_PUBLIC_KEY;

export default async function handler(req: NextApiRequest , res : NextApiResponse  ) {
  const {  idorder  } = req.body;
  try{
    const {  amount, shipping, listitem, method_id,  idorder  } = req.body;
      const object ={
        shipping,
        amount: Number(amount),
        currency: "eur",
      }
      console.log(object)
      const query = getQueryStock(listitem)
      
      await checkTotalFromBackWC(query,method_id,amount, stripeConvertionAmount)
      const paymentIntent = await stripe.paymentIntents.create(object);
      res.status(200).json(paymentIntent.client_secret);
  
    } catch (err: any) {
      sendNotesOrderFromBack(publickeyWoo ,secretKeyWoo ,idorder, '[Unathorized] The order is not trustable.')
      sendNotesOrderFromBack(publickeyWoo ,secretKeyWoo ,idorder, '[Back stripe error detail]'+err.message)
      validateOrderFromBack(publickeyWoo ,secretKeyWoo ,idorder, null, false)
      console.log(err)
      res
        .status(500)
        .json({
          statusCode: 500,
          message: 'Error interne'
        });
    }
}