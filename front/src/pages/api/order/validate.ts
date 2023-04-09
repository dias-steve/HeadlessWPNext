import axios from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req : NextApiRequest, res: NextApiResponse) {
    console.log("create")
    const secretKeyWoo = process.env.WC_PRIVATE_KEY;
    try{
        const {publickey, order_id,  paymentintent_id, paid} = req.body
        const data = {
          set_paid: paid,
          transaction_id: paymentintent_id? paymentintent_id:'aucun',
          payment_method: "card",
          payment_method_title: "Card",
          status: paid ?"processing":"failed"
        }
        const options = {
          method:'PUT',
          headers: {
            "Access-Control-Allow-Origin": true
          },
          url: process.env.NEXT_PUBLIC_WC_API_ROUTE+"/orders/"+order_id+"?consumer_key="+publickey+"&consumer_secret="+secretKeyWoo,
          data,
    
        }
      axios.request(options).then((response)=>{

        res.json(response.data)
        return 1
      }).catch((error) => {
        console.error(error)
        res
        .status(500)
        .json({error: error})
        throw(error)
      })
    }catch(err : any){
      res
      .status(500)
      .send("[OrderCreation]"+err.message)
    }
  }