import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse){
  
    const secretKeyWoo = process.env.WC_PRIVATE_KEY;
    try{
        const {publickey, order_id, note} = req.body
        const data = {
          note: note
        }
        const options = {
          method:'POST',
          headers: {
            "Access-Control-Allow-Origin": true
          },
          url: process.env.NEXT_PUBLIC_WC_API_ROUTE+"/orders/"+order_id+"/notes/?consumer_key="+publickey+"&consumer_secret="+secretKeyWoo,
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
    }catch(err: any){
      res
      .status(500)
      .send("[Note Order]"+err.message)
    }
  }